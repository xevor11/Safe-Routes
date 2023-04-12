import React from "react";
import { render } from "@testing-library/react";
import TopBar from "../components/topbar";

describe("TopBar component", () => {
  test("renders SafeRoute text", () => {
    const { getByText } = render(<TopBar />);
    const titleElement = getByText(/SafeRoute/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders SearchBar component", () => {
    const { getByPlaceholderText } = render(<TopBar />);
    const searchBarElement = getByPlaceholderText(/search address/i);
    expect(searchBarElement).toBeInTheDocument();
  });

  test("renders AuthenticationButton component", () => {
    const { getByText } = render(<TopBar />);
    const authButtonElement = getByText(/log in/i);
    expect(authButtonElement).toBeInTheDocument();
  });
});
