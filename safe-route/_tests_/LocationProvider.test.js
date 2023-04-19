import { renderHook, act } from '@testing-library/react-hooks';
import { LocationContextProvider, useLocation, useUserLocationUpdate, useDestLocationUpdate } from '../src/components/LocationProvider';

describe('LocationProvider', () => {
  test('LocationContextProvider provides initial location state', () => {
    const wrapper = ({ children }) => <LocationContextProvider>{children}</LocationContextProvider>;
    const { result } = renderHook(() => useLocation(), { wrapper });
    expect(result.current.location).toEqual({
      userCoords: { lat: 43.075647, lng: -87.886633 },
      destCoords: { lat: null, lng: null }
    });
  });

  test('useUserLocationUpdate updates userCoords in location state', () => {
    const wrapper = ({ children }) => <LocationContextProvider>{children}</LocationContextProvider>;
    const { result } = renderHook(() => useUserLocationUpdate(), { wrapper });

    act(() => {
      result.current({ lat: 51.509865, lng: -0.118092 });
    });

    const { result: locationResult } = renderHook(() => useLocation(), { wrapper });
    expect(locationResult.current.location.userCoords).toEqual({
      lat: 51.509865,
      lng: -0.118092
    });
  });

  test('useDestLocationUpdate updates destCoords in location state', () => {
    const wrapper = ({ children }) => <LocationContextProvider>{children}</LocationContextProvider>;
    const { result } = renderHook(() => useDestLocationUpdate(), { wrapper });

    act(() => {
      result.current({ lat: 40.785091, lng: -73.968285 });
    });

    const { result: locationResult } = renderHook(() => useLocation(), { wrapper });
    expect(locationResult.current.location.destCoords).toEqual({
      lat: 40.785091,
      lng: -73.968285
    });
  });

  test('useUserLocationUpdate updates userCoords in location state', () => {
    const wrapper = ({ children }) => <LocationContextProvider>{children}</LocationContextProvider>;
    const { result } = renderHook(() => useUserLocationUpdate(), { wrapper });

    act(() => {
      result.current({ lat: 51.509865, lng: -0.118092 });
    });

    const { result: locationResult } = renderHook(() => useLocation(), { wrapper });
    expect(locationResult.current.location.userCoords).toEqual({
      lat: 51.509865,
      lng: -0.118092
    });
  });

  test('useDestLocationUpdate updates destCoords in location state', () => {
    const wrapper = ({ children }) => <LocationContextProvider>{children}</LocationContextProvider>;
    const { result } = renderHook(() => useDestLocationUpdate(), { wrapper });

    act(() => {
      result.current({ lat: 40.785091, lng: -73.968285 });
    });

    const { result: locationResult } = renderHook(() => useLocation(), { wrapper });
    expect(locationResult.current.location.destCoords).toEqual({
      lat: 40.785091,
      lng: -73.968285
    });
  });
});
