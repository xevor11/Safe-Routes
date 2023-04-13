import { renderHook, act } from '@testing-library/react-hooks';
import { LocationContextProvider, useUserLocationUpdate, useLocation, useDestLocationUpdate } from './location';

describe('LocationContextProvider', () => {
  test('renders children without crashing', () => {
    const { getByTestId } = renderWithProvider(<div data-testid="test-child" />);
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  describe('useLocation', () => {
    test('returns location context', () => {
      const { result } = renderHook(() => useLocation(), {
        wrapper: LocationContextProvider
      });
      expect(result.current).toEqual(expect.objectContaining({
        location: expect.any(Object),
      }));
    });
  });

  describe('useUserLocationUpdate', () => {
    test('updates user coordinates correctly', async () => {
      const { result } = renderHook(() => useUserLocationUpdate(), {
        wrapper: LocationContextProvider
      });

      const newCoords = { lat: 41.8781, lng: -87.6298 };
      act(() => {
        result.current(newCoords);
      });

      expect(result.current).toEqual(expect.any(Function));
      expect(result.current).toBeInstanceOf(Function);
      expect(result.current.name).toBe('updateUserCoords');
      expect(result.current.length).toBe(1);

      const { result: locationResult } = renderHook(() => useLocation(), {
        wrapper: LocationContextProvider
      });
      expect(locationResult.current.location.userCoords).toEqual(newCoords);

      const invalidCoords = { lat: 'abc', lng: 'def' };
      const prevLocation = locationResult.current;
      act(() => {
        result.current(invalidCoords);
      });
      expect(locationResult.current).toEqual(prevLocation);
    });
  });

  describe('useDestLocationUpdate', () => {
    test('updates destination coordinates correctly', async () => {
      const { result } = renderHook(() => useDestLocationUpdate(), {
        wrapper: LocationContextProvider
      });

      const newCoords = { lat: 37.7749, lng: -122.4194 };
      act(() => {
        result.current(newCoords);
      });

      expect(result.current).toEqual(expect.any(Function));
      expect(result.current).toBeInstanceOf(Function);
      expect(result.current.name).toBe('updateDestCoords');
      expect(result.current.length).toBe(1);

      const { result: locationResult } = renderHook(() => useLocation(), {
        wrapper: LocationContextProvider
      });
      expect(locationResult.current.location.destCoords).toEqual(newCoords);
    });
  });

  
describe('useUserLocationUpdate', () => {
    test('updates user coordinates correctly', () => {
      const { result } = renderHook(() => useUserLocationUpdate())
  
      const newCoords = { lat: 41.8781, lng: -87.6298 }
      act(() => {
        result.current(newCoords)
      })
  
      expect(result.current).toEqual(expect.any(Function))
      expect(result.current).toBeInstanceOf(Function)
      expect(result.current.name).toBe('updateUserCoords')
      expect(result.current.length).toBe(1)
  
      expect(result.current).toThrow(TypeError)
  
      act(() => {
        result.current({ lat: null, lng: null })
      })
  
      expect(result.current).toEqual(expect.any(Function))
      expect(result.current).toBeInstanceOf(Function)
      expect(result.current.name).toBe('updateUserCoords')
      expect(result.current.length).toBe(1)
    })
  
    test('does not update location state when new coordinates are invalid', () => {
      const { result } = renderWithProvider(null, useUserLocationUpdate)
  
      const invalidCoords = { lat: 'abc', lng: 'def' }
      const prevLocation = result.current({})
  
      act(() => {
        result.current(invalidCoords)
      })
  
      expect(result.current({})).toEqual(prevLocation)
    })
  })
  
  describe('useDestLocationUpdate', () => {
    test('updates destination coordinates correctly', () => {
      const { result } = renderHook(() => useDestLocationUpdate())
  
      const newCoords = { lat: 37.7749, lng: -122.4194 }
      act(() => {
        result.current(newCoords)
      })
  
      expect(result.current).toEqual(expect.any(Function))
      expect(result.current).toBeInstanceOf(Function)
      expect(result.current.name).toBe('updateDestCoords')
      expect(result.current.length).toBe(1)
  
      act(() => {
        result.current({ lat: null, lng: null })
      })
  
      expect(result.current).toEqual(expect.any(Function))
      expect(result.current).toBeInstanceOf(Function)
      expect(result.current.name).toBe('updateDestCoords')
      expect(result.current.length).toBe(1)
    })
  })

  function renderWithProvider(children, hook) {
    const wrapper = ({ children }) => (
      <LocationContextProvider>{children}</LocationContextProvider>
    )
  
    if (hook) {
      return renderHook(hook, { wrapper })
    } else {
      return render(<div data-testid="test-parent">{children}</div>, { wrapper })
    }
  }
  
});
