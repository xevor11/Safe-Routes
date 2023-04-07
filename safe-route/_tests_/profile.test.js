import React from 'react';
import { render } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../Profile';

jest.mock('@auth0/auth0-react');

describe('Profile', () => {
  const user = {
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://example.com/avatar.png',
  };
  
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render', () => {
    const { getByTestId } = render(<Profile />);
    expect(getByTestId('profile')).toBeInTheDocument();
  });
  
  it('should display the user name and email', () => {
    const { getByText } = render(<Profile />);
    expect(getByText(user.name)).toBeInTheDocument();
    expect(getByText(user.email)).toBeInTheDocument();
  });
  
  it('should display the user picture', () => {
    const { getByAltText } = render(<Profile />);
    expect(getByAltText(`${user.name} profile picture`)).toBeInTheDocument();
  });
  
  it('should not render if the user is not authenticated', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    const { queryByTestId } = render(<Profile />);
    expect(queryByTestId('profile')).toBeNull();
  });
});
