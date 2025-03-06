import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '../NoteCard'; // Adjust import path if needed

// Mock functions for onDelete and onEdit
const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();

// Sample note data for testing
const sampleNote = {
    id: 1,
    content: 'This is a sample note',
    sentiment: 'Positive',
    category: 'Work',
};

test('clicking Edit IconButton opens the Edit Note modal', () => {
    render(
        <NoteCard note={sampleNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    // Click the Edit IconButton
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Check if the Edit Note modal is open by checking for the modal's content
    expect(screen.getByText('Edit Note')).toBeInTheDocument();
});

test('clicking Delete IconButton calls the onDelete function', () => {
    render(
        <NoteCard note={sampleNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    // Click the Delete IconButton
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Verify that the onDelete function is called with the correct note ID
    expect(mockOnDelete).toHaveBeenCalledWith(1);
});

test('clicking Cancel in the EditNoteModal closes the modal without editing', () => {
    render(
        <NoteCard note={sampleNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    // Click the Edit IconButton to open the Edit Note modal
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Find and click the "Cancel" button in the EditNoteModal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Ensure that the EditNoteModal is closed and the onEdit function is not called
    expect(mockOnEdit).not.toHaveBeenCalled();
});

test('clicking Save in the EditNoteModal saves the edited note', () => {
    render(
        <NoteCard note={sampleNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );

    // Click the Edit IconButton to open the Edit Note modal
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Simulate editing the note content
    const textField = screen.getByLabelText('Note Content');
    fireEvent.change(textField, { target: { value: 'Updated note content' } });

    // Click the Save button to trigger the onEdit function
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify that the onEdit function was called with the updated note content
    expect(mockOnEdit).toHaveBeenCalledWith(1, 'Work', 'Updated note content');
});
