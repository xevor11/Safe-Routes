import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';

// mock the useAuth0 hook
jest.mock('@auth0/auth0-react');

describe('LoginButton', () => {
  test('renders login button', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    });

    const { getByText } = render(<LoginButton />);
    const loginButton = getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  test('calls loginWithRedirect on button click', () => {
    const loginWithRedirectMock = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: loginWithRedirectMock,
    });

    const { getByText } = render(<LoginButton />);
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    expect(loginWithRedirectMock).toHaveBeenCalled();
  });

  test('does not render login button when authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    });

    const { queryByText } = render(<LoginButton />);
    const loginButton = queryByText('Login');
    expect(loginButton).not.toBeInTheDocument();
  });

  test('displays error message when authentication fails', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
      error: {
        message: 'Oops! Something went wrong.',
      },
    });

    const { getByText } = render(<LoginButton />);
    const errorMessage = getByText('Oops! Something went wrong.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls loginWithRedirect on button click', () => {
    const loginWithRedirectMock = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: loginWithRedirectMock,
    });

    const { getByText } = render(<LoginButton />);
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    expect(loginWithRedirectMock).toHaveBeenCalled();
  });
});
