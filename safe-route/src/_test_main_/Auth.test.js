import { render } from "@testing-library/react";
import Auth0ProviderWithHistory from "./Auth";
import { BrowserRouter as Router } from "react-router-dom";

describe("Auth0ProviderWithHistory", () => {
  it("renders children without crashing", () => {
    const { getByText } = render(
      <Router>
        <Auth0ProviderWithHistory>
          <div>Child component</div>
        </Auth0ProviderWithHistory>
      </Router>
    );
    expect(getByText("Child component")).toBeInTheDocument();
  });
});
