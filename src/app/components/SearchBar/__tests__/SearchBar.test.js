// app/components/__tests__/SearchBar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
    let setSearchTerm;

    beforeEach(() => {
        // Mock setSearchTerm function
        setSearchTerm = jest.fn();
    });

    test('renders SearchBar with the correct label', () => {
        render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);

        // Check if the label "Search Notes" is in the document
        const label = screen.getByLabelText(/search notes/i);
        expect(label).toBeInTheDocument();
    });

    test('displays the correct searchTerm value', () => {
        const searchTerm = 'Test note';
        render(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />);

        // Check if the input field shows the correct initial value
        const input = screen.getByLabelText(/search notes/i);
        expect(input.value).toBe(searchTerm);
    });

    test('calls setSearchTerm on input change', () => {
        const searchTerm = 'Test note';
        render(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />);

        const input = screen.getByLabelText(/search notes/i);

        // Simulate typing in the input
        fireEvent.change(input, { target: { value: 'New search' } });

        // Ensure the setSearchTerm function was called with the correct value
        expect(setSearchTerm).toHaveBeenCalledWith('New search');
    });
});
