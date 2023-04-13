import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  describe("onPlaceSelect", () => {
    it("calls setDestCoords with the correct coordinates when a valid value is provided", () => {
      const setDestCoords = jest.fn();
      const value = {
        properties: {
          lat: 37.7749,
          lon: -122.4194,
        },
      };

      SearchBar.prototype.onPlaceSelect.call({ setDestCoords }, value);

      expect(setDestCoords).toHaveBeenCalledWith({
        lat: value.properties.lat,
        lng: value.properties.lon,
      });
    });

    it("calls setDestCoords with null coordinates when no value is provided", () => {
      const setDestCoords = jest.fn();

      SearchBar.prototype.onPlaceSelect.call({ setDestCoords }, null);

      expect(setDestCoords).toHaveBeenCalledWith({ lat: null, lng: null });
    });
  });

  describe("onSuggestionChange", () => {
    it("logs the value", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      const value = "test suggestion value";

      SearchBar.prototype.onSuggestionChange.call({}, value);

      expect(consoleSpy).toHaveBeenCalledWith(value);

      consoleSpy.mockRestore();
    });
  });

  describe("render", () => {
    it("renders the GeoapifyGeocoderAutocomplete component with the correct props", () => {
      render(<SearchBar />);

      expect(screen.getByPlaceholderText("search address")).toBeInTheDocument();
      expect(screen.getByText("Powered by Geoapify")).toBeInTheDocument();
      expect(screen.getByTestId("geoapify-geocoder-autocomplete")).toHaveAttribute(
        "apiKey",
        "YOUR_API_KEY"
      );
      expect(screen.getByTestId("geoapify-geocoder-autocomplete")).toHaveAttribute(
        "lang",
        "en"
      );
      expect(screen.getByTestId("geoapify-geocoder-autocomplete")).toHaveAttribute(
        "limit",
        "10"
      );
      expect(screen.getByTestId("geoapify-geocoder-autocomplete")).toHaveAttribute(
        "countryCodes",
        "us"
      );
    });
  });
});
