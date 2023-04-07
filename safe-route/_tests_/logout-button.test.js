import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../LogoutButton';

jest.mock('@auth0/auth0-react');

describe('LogoutButton', () => {
  it('should render the Log out button when authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: true, logout: jest.fn() });
    const { getByText } = render(<LogoutButton />);
    const buttonElement = getByText('Log Out');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call logout when the button is clicked', () => {
    const mockLogout = jest.fn();
    useAuth0.mockReturnValue({ isAuthenticated: true, logout: mockLogout });
    const { getByText } = render(<LogoutButton />);
    const buttonElement = getByText('Log Out');
    fireEvent.click(buttonElement);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should not render the Log out button when not authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: false, logout: jest.fn() });
    const { queryByText } = render(<LogoutButton />);
    const buttonElement = queryByText('Log Out');
    expect(buttonElement).not.toBeInTheDocument();
  });
});
