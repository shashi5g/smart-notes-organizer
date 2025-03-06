import { render, screen, fireEvent } from '@testing-library/react';
import EditNoteModal from '../EditNoteModal'; // Adjust the import path if needed

test('should open modal and allow editing note content', () => {
    const note = { id: 1, content: 'Initial note content' };
    const onClose = jest.fn();
    const onEdit = jest.fn();

    render(
        <EditNoteModal
            open={true}
            onClose={onClose}
            onEdit={onEdit}
            note={note}
        />
    );

    // Check if the modal is visible
    expect(screen.getByText('Edit Note')).toBeInTheDocument();

    // Check the default value of the note content in the text field
    const textField = screen.getByLabelText('Note Content');
    expect(textField).toHaveValue('Initial note content');

    // Simulate typing new content into the text field
    fireEvent.change(textField, { target: { value: 'Updated note content' } });
    expect(textField).toHaveValue('Updated note content');

    // Simulate clicking the "Save" button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify that the onEdit function was called with the correct arguments
    expect(onEdit).toHaveBeenCalledWith(1, 'Updated note content');

    // Verify that the modal closed after clicking save
    expect(onClose).toHaveBeenCalled();
});

test('should close modal without saving on "Cancel" button click', () => {
    const note = { id: 1, content: 'Initial note content' };
    const onClose = jest.fn();
    const onEdit = jest.fn();

    render(
        <EditNoteModal
            open={true}
            onClose={onClose}
            onEdit={onEdit}
            note={note}
        />
    );

    // Simulate clicking the "Cancel" button
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Verify that the modal closes without calling onEdit
    expect(onClose).toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
});

test('should not call onEdit if the content is empty or only spaces', () => {
    const note = { id: 1, content: 'Initial note content' };
    const onClose = jest.fn();
    const onEdit = jest.fn();

    render(
        <EditNoteModal
            open={true}
            onClose={onClose}
            onEdit={onEdit}
            note={note}
        />
    );

    // Simulate clearing the text field
    const textField = screen.getByLabelText('Note Content');
    fireEvent.change(textField, { target: { value: ' ' } }); // Enter only spaces

    // Simulate clicking the "Save" button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify that the onEdit function was not called with empty content
    expect(onEdit).not.toHaveBeenCalled();
});
