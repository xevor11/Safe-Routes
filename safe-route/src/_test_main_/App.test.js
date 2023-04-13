import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

test('renders the SafeRoute title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/SafeRoute/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the SearchBar component', () => {
  const { getByPlaceholderText } = render(<App />);
  const searchBarElement = getByPlaceholderText(/search address/i);
  expect(searchBarElement).toBeInTheDocument();
});

test('renders the TopBar component', () => {
  const { getByText } = render(<App />);
  const topBarElement = getByText(/sign in/i);
  expect(topBarElement).toBeInTheDocument();
});

test('renders the MapCont component', () => {
  const { getByTestId } = render(<App />);
  const mapContElement = getByTestId('map-container');
  expect(mapContElement).toBeInTheDocument();
});
