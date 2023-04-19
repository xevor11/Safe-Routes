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

  test('disables search input when loading prop is true', () => {
    const { getByPlaceholderText } = render(<SearchBar loading={true} />);
    const searchBar = getByPlaceholderText('search address');
    expect(searchBar).toBeDisabled();
  });

  test('clears search input when clear button is clicked', () => {
    const { getByPlaceholderText, getByLabelText } = render(<SearchBar />);
    const searchBar = getByPlaceholderText('search address');
    const clearButton = getByLabelText('clear search');
    const address = '123 Main St';
    fireEvent.change(searchBar, { target: { value: address } });
    expect(searchBar.value).toBe(address);
    fireEvent.click(clearButton);
    expect(searchBar.value).toBe('');
  });

  test('calls onSearchChange when search input changes', () => {
    const onSearchChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearchChange={onSearchChange} />);
    const searchBar = getByPlaceholderText('search address');
    const address = '123 Main St';
    fireEvent.change(searchBar, { target: { value: address } });
    expect(onSearchChange).toHaveBeenCalledWith(address);
  });
});
