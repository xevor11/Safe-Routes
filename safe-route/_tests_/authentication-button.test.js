import React from 'react';
import { render } from '@testing-library/react';
import AuthenticationButton from '../components/authentication-button';

// Mock the useAuth0 hook
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
  }),
}));

describe('AuthenticationButton', () => {
  test('renders LoginButton when user is not authenticated', () => {
    const { getByText } = render(<AuthenticationButton />);
    const loginButton = getByText('Log in');
    expect(loginButton).toBeInTheDocument();
  });

  test('renders LogoutButton when user is authenticated', () => {
    jest.mock('@auth0/auth0-react', () => ({
      useAuth0: () => ({
        isAuthenticated: true,
      }),
    }));
    const { getByText } = render(<AuthenticationButton />);
    const logoutButton = getByText('Log out');
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls loginWithRedirect when LoginButton is clicked', () => {
    const { getByText } = render(<AuthenticationButton />);
    const loginButton = getByText('Log in');
    fireEvent.click(loginButton);
    expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
  });

  test('calls logout when LogoutButton is clicked', () => {
    const { getByText } = render(<AuthenticationButton />);
    const logoutButton = getByText('Log out');
    fireEvent.click(logoutButton);
    expect(useAuth0().logout).toHaveBeenCalled();
  });
});
