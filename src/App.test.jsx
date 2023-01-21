import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// mock resizeObserver used by charting library
class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}
window.ResizeObserver = ResizeObserver;

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const { getByText } = render(<App />, { wrapper: BrowserRouter });
    const textFound = getByText(/Mackenzie Baksh/i);
    expect(textFound).toBeInTheDocument();
  });
});
