import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/search-bar';

describe('SearchBar', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const searchBar = getByPlaceholderText('search address');
    expect(searchBar).toBeInTheDocument();
  });

  test('calls onPlaceSelect when a place is selected', () => {
    const onPlaceSelect = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onPlaceSelect={onPlaceSelect} />);
    const searchBar = getByPlaceholderText('search address');
    const address = '123 Main St';
    fireEvent.change(searchBar, { target: { value: address } });
    fireEvent.keyDown(searchBar, { key: 'Enter' });
    expect(onPlaceSelect).toHaveBeenCalledWith(expect.objectContaining({ properties: { formatted: address } }));
  });
});
