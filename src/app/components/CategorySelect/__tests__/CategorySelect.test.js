import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelect from '../CategorySelect'; // Adjust the import path as needed



test('should call setCategory when a new value is selected', () => {
    const setCategory = jest.fn();
    render(<CategorySelect category="Work" setCategory={setCategory} />);

    // Find the select element and simulate a change event
    const select = screen.getByRole('combobox'); // Select the element using its role
    fireEvent.mouseDown(select); // Open the select dropdown

    // Find the 'Personal' option from the dropdown
    const personalOption = screen.getByText('Personal');
    fireEvent.click(personalOption); // Simulate clicking the Personal option

    // Check if the setCategory function was called with the correct value
    expect(setCategory).toHaveBeenCalledWith('Personal');
});
