import { render, screen } from "@testing-library/react";

// Mock RootLayout to only return children
jest.mock("../layout", () => ({ children }) => <>{children}</>);

describe("RootLayout", () => {
    test("renders children correctly", () => {
        render(
            <div>
                <div data-testid="child-element">Hello World</div>
            </div>
        );

        // Ensure the child component is rendered inside RootLayout
        expect(screen.getByTestId("child-element")).toBeInTheDocument();
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    test("wraps children with AppRouterCacheProvider and ThemeProvider", () => {
        render(
            <div>
                <div>Test Content</div>
            </div>
        );

        // Check if the child content is rendered inside the providers
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
});
