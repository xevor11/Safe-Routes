import React from "react";
import { render } from "@testing-library/react";
import { useMap } from "react-leaflet";
import Recenter from "./recenter";

jest.mock("react-leaflet", () => ({
  useMap: jest.fn(),
}));

describe("Recenter", () => {
  test("should call useMap hook with expected parameters", () => {
    const lat = 37.7749;
    const lng = -122.4194;
    render(<Recenter lat={lat} lng={lng} />);
    expect(useMap).toHaveBeenCalledTimes(1);
    expect(useMap).toHaveBeenCalledWith();
  });
});
