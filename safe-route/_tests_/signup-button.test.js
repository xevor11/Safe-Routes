import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from "../components/signup-button";

// Mock useAuth0 hook
jest.mock("@auth0/auth0-react");

describe("SignupButton", () => {
  test("renders without crashing", () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
      isAuthenticated: false,
    });
    const { getByText } = render(<SignupButton />);
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  test("calls loginWithRedirect on click", () => {
    const loginWithRedirectMock = jest.fn();
    useAuth0.mockReturnValue({
      loginWithRedirect: loginWithRedirectMock,
      isAuthenticated: false,
    });
    const { getByText } = render(<SignupButton />);
    fireEvent.click(getByText("Sign Up"));
    expect(loginWithRedirectMock).toHaveBeenCalledWith({
      screen_hint: "signup",
    });
  });

  test("doesn't render when user is authenticated", () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
      isAuthenticated: true,
    });
    const { queryByText } = render(<SignupButton />);
    expect(queryByText("Sign Up")).toBeNull();
  });
});
