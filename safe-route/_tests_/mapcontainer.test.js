import React from 'react';
import { render, screen } from '@testing-library/react';
import MapCont from '../MapCont';
import { LocationProvider } from '../LocationProvider';

jest.mock('../Routes', () => () => <div data-testid="routing-machine"></div>);

describe('MapCont', () => {
  test('renders with current location marker and routing machine when destination coordinates are present', () => {
    const location = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      destCoords: { lat: 37.7739, lng: -122.4312 }
    };
    render(
      <LocationProvider location={location}>
        <MapCont />
      </LocationProvider>
    );
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('current-location-marker')).toBeInTheDocument();
    expect(screen.getByTestId('routing-machine')).toBeInTheDocument();
  });

  test('renders with current location marker and without routing machine when destination coordinates are not present', () => {
    const location = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      destCoords: {}
    };
    render(
      <LocationProvider location={location}>
        <MapCont />
      </LocationProvider>
    );
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('current-location-marker')).toBeInTheDocument();
    expect(screen.queryByTestId('routing-machine')).toBeNull();
  });


describe('MapCont', () => {
  test('renders with current location marker and routing machine when destination coordinates are present', () => {
    const location = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      destCoords: { lat: 37.7739, lng: -122.4312 }
    };
    render(
      <LocationProvider location={location}>
        <MapCont />
      </LocationProvider>
    );
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('current-location-marker')).toBeInTheDocument();
    expect(screen.getByTestId('routing-machine')).toBeInTheDocument();
  });

  test('renders with current location marker and without routing machine when destination coordinates are not present', () => {
    const location = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      destCoords: {}
    };
    render(
      <LocationProvider location={location}>
        <MapCont />
      </LocationProvider>
    );
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('current-location-marker')).toBeInTheDocument();
    expect(screen.queryByTestId('routing-machine')).toBeNull();
  });

  test('displays an error message if there is an error loading the map', () => {
    // mock the google maps api script to throw an error
    const googleMapsScript = document.createElement('script');
    googleMapsScript.type = 'text/javascript';
    googleMapsScript.onerror = () => {
      window.google = undefined;
    };
    document.head.appendChild(googleMapsScript);

    const { getByText } = render(<MapCont />);
    expect(getByText('Error loading map')).toBeInTheDocument();
  });

  test('renders with custom styles when provided', () => {
    const customStyles = {
      mapContainer: { backgroundColor: 'red' },
      currentLocationMarker: { color: 'blue' }
    };
    const location = {
      userCoords: { lat: 37.7749, lng: -122.4194 },
      destCoords: { lat: 37.7739, lng: -122.4312 }
    };
    render(
      <LocationProvider location={location}>
        <MapCont styles={customStyles} />
      </LocationProvider>
    );

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toHaveStyle('background-color: red;');

    const currentLocationMarker = screen.getByTestId('current-location-marker');
    expect(currentLocationMarker).toHaveStyle('color: blue;');
  });
});
});
