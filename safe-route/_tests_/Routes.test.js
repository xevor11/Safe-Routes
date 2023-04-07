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
});
