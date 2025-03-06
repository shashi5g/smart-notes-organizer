// app/__tests__/RootLayout.test.js
import { render, screen } from '@testing-library/react';
import RootLayout from '../layout'; // Ensure the correct path to layout.js

describe('RootLayout', () => {
    test('renders children correctly', () => {
        render(
            <RootLayout>
                <div data-testid="child-element">Hello World</div>
            </RootLayout>
        );

        // Ensure the child component is rendered inside RootLayout
        expect(screen.getByTestId('child-element')).toBeInTheDocument();
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });


    test('wraps children with AppRouterCacheProvider and ThemeProvider', () => {
        render(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>
        );

        // Check if the child content is rendered inside the providers
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

});
