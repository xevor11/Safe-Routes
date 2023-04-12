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
  
  it('should display a loading indicator when user information is not yet available', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: null,
      isLoading: true,
    });
    const { getByTestId } = render(<Profile />);
    expect(getByTestId('loading-indicator')).toBeInTheDocument();
  });
  
  it('should display an error message when user information is not available and there is an error', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: null,
      error: 'Error message',
    });
    const { getByText } = render(<Profile />);
    expect(getByText('Error loading profile information.')).toBeInTheDocument();
    expect(getByText('Error message')).toBeInTheDocument();
  });
  
  it('should not display an error message if there is no error', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: null,
      error: null,
    });
    const { queryByText } = render(<Profile />);
    expect(queryByText('Error loading profile information.')).toBeNull();
  });
  
  it('should not display the user email if it is not available', () => {
    const userWithoutEmail = {
      name: 'Test User',
      email: null,
      picture: 'https://example.com/avatar.png',
    };
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: userWithoutEmail,
    });
    const { queryByText } = render(<Profile />);
    expect(queryByText(userWithoutEmail.email)).toBeNull();
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
  
  it('should display a loading message while the user data is being fetched', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: null,
      isLoading: true,
    });
    render(<Profile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('should display an error message if there is an error fetching the user data', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: null,
      error: 'Error fetching user data',
    });
    render(<Profile />);
    expect(screen.getByText('Error fetching user data')).toBeInTheDocument();
  });
});
