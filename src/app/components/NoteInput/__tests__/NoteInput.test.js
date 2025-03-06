import { render, screen, fireEvent } from '@testing-library/react';
import NoteInput from '../NoteInput'; // Adjust path as needed

// Mocking the functions
const mockSetNewNote = jest.fn();
const mockHandleAddNote = jest.fn();

describe('NoteInput Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with initial state', () => {
        render(
            <NoteInput
                newNote=""
                setNewNote={mockSetNewNote}
                handleAddNote={mockHandleAddNote}
            />
        );

        // Check if the TextField is rendered with the correct label
        expect(screen.getByLabelText(/new note/i)).toBeInTheDocument();

        // Check if the TextField is empty by default
        expect(screen.getByLabelText(/new note/i).value).toBe('');
    });

    test('updates the newNote when text is entered', () => {
        render(
            <NoteInput
                newNote=""
                setNewNote={mockSetNewNote}
                handleAddNote={mockHandleAddNote}
            />
        );

        const textField = screen.getByLabelText(/new note/i);

        // Simulate typing in the TextField
        fireEvent.change(textField, { target: { value: 'This is a new note' } });

        // Ensure the mock function is called with the correct value
        expect(mockSetNewNote).toHaveBeenCalledWith('This is a new note');
    });





    test('displays correct value of newNote when passed as prop', () => {
        render(
            <NoteInput
                newNote="This is a predefined note"
                setNewNote={mockSetNewNote}
                handleAddNote={mockHandleAddNote}
            />
        );

        // Ensure the TextField has the correct value passed in the prop
        expect(screen.getByLabelText(/new note/i).value).toBe('This is a predefined note');
    });
});
