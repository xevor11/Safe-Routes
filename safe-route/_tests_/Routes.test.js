import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Routes from "../components/Routes";
import { useLocation } from "../components/LocationProvider";

jest.mock("../components/LocationProvider");

describe("Routes", () => {
  let container = null;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders with null instance when there is no destination location", () => {
    // mock useLocation to return an object with no destCoords
    useLocation.mockReturnValue({ location: { userCoords: {}, destCoords: null } });

    act(() => {
      render(<Routes />, container);
    });

    // should return null since no destination location is provided
    expect(container.textContent).toBe("");
  });

  it("renders with non-null instance when there is a destination location", () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({ location: { userCoords: {}, destCoords: { lat: 0, lng: 0 } } });

    act(() => {
      render(<Routes />, container);
    });

    // should not return null since a destination location is provided
    expect(container.textContent).not.toBe("");
  });

  it("renders a map element with a class of 'map' when a destination location is provided", () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({ location: { userCoords: {}, destCoords: { lat: 0, lng: 0 } } });

    act(() => {
      render(<Routes />, container);
    });

    const mapElement = container.querySelector(".map");
    expect(mapElement).toBeInTheDocument();
  });

  it("renders a 'No results found' message when the search returns no results", () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({ location: { userCoords: {}, destCoords: { lat: 0, lng: 0 } } });

    // mock fetch to return no results
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ routes: [] })
      })
    );

    act(() => {
      render(<Routes />, container);
    });

    const noResultsMessage = container.querySelector(".no-results-message");
    expect(noResultsMessage).toBeInTheDocument();

    // clean up the mock fetch
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("renders a list of routes when the search returns results", async () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({ location: { userCoords: {}, destCoords: { lat: 0, lng: 0 } } });

    // mock fetch to return results
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            routes: [
              { id: 1, name: "Route 1" },
              { id: 2, name: "Route 2" }
            ]
          })
      })
    );

    await act(async () => {
      render(<Routes />, container);
    });

    const routeList = container.querySelector(".route-list");
    expect(routeList).toBeInTheDocument();

    const routeItems = routeList.querySelectorAll
  });

  it("renders a map with directions when destination location is provided", () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({
      location: { userCoords: { lat: 37.7749, lng: -122.4194 }, destCoords: { lat: 37.7739, lng: -122.4312 } }
    });

    act(() => {
      render(<Routes />, container);
    });

    const mapElement = container.querySelector(".leaflet-container");
    const directionsElement = container.querySelector(".leaflet-routing-container");

    // should render a map and directions when destination location is provided
    expect(mapElement).toBeInTheDocument();
    expect(directionsElement).toBeInTheDocument();
  });

  it("renders a map without directions when destination location is not provided", () => {
    // mock useLocation to return an object with no destCoords
    useLocation.mockReturnValue({
      location: { userCoords: { lat: 37.7749, lng: -122.4194 }, destCoords: null }
    });

    act(() => {
      render(<Routes />, container);
    });

    const mapElement = container.querySelector(".leaflet-container");
    const directionsElement = container.querySelector(".leaflet-routing-container");

    // should render only a map without directions when destination location is not provided
    expect(mapElement).toBeInTheDocument();
    expect(directionsElement).not.toBeInTheDocument();
  });

  it("renders an error message when directions cannot be found", () => {
    // mock useLocation to return an object with destCoords
    useLocation.mockReturnValue({
      location: { userCoords: { lat: 37.7749, lng: -122.4194 }, destCoords: { lat: 0, lng: 0 } }
    });

    act(() => {
      render(<Routes />, container);
    });

    const errorElement = container.querySelector(".routing-error");

    // should render an error message when directions cannot be found
    expect(errorElement).toBeInTheDocument();
  });
});
