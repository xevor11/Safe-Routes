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

  test("should call useMap hook with expected parameters", () => {
    const lat = 37.7749;
    const lng = -122.4194;
    render(<Recenter lat={lat} lng={lng} />);
    expect(useMap).toHaveBeenCalledTimes(1);
    expect(useMap).toHaveBeenCalledWith();
  });

  test("should recenter the map when the button is clicked", () => {
    const setViewMock = jest.fn();
    useMap.mockReturnValue({
      setView: setViewMock,
    });
    const lat = 37.7749;
    const lng = -122.4194;
    const { getByRole } = render(<Recenter lat={lat} lng={lng} />);
    const button = getByRole("button");
    button.click();
    expect(setViewMock).toHaveBeenCalledTimes(1);
    expect(setViewMock).toHaveBeenCalledWith([lat, lng]);
  });

  test("should render a button with the expected text", () => {
    const lat = 37.7749;
    const lng = -122.4194;
    const { getByRole } = render(<Recenter lat={lat} lng={lng} />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Recenter Map");
  });

  test("should not render a button when lat or lng are not defined", () => {
    const { queryByRole } = render(<Recenter />);
    const button = queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
