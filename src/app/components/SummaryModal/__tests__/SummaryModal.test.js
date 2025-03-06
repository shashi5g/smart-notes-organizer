// app/components/__tests__/SummaryModal.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SummaryModal from '../SummaryModal';
import { queryHuggingFace } from '../../../utils/huggingface';

// Mocking the queryHuggingFace function
jest.mock('../../../utils/huggingface', () => ({
    queryHuggingFace: jest.fn(),
}));

describe('SummaryModal', () => {
    const content = 'This is some test content for the summary modal.';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not show modal initially', () => {
        render(<SummaryModal content={content} />);

        // Ensure the modal is not in the document initially
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('opens modal when Summarize button is clicked', () => {
        render(<SummaryModal content={content} />);

        // Click the Summarize button
        fireEvent.click(screen.getByText(/summarize/i));

        // Ensure the modal is open
        expect(screen.getByTestId('summary-modal')).toBeInTheDocument();
    });

    test('closes modal when close button is clicked', () => {
        render(<SummaryModal content={content} />);

        // Open the modal
        fireEvent.click(screen.getByText(/summarize/i));

        // Close the modal by clicking the background
        fireEvent.click(screen.getByTestId('summary-modal'));

        // Ensure the modal is closed
        expect(screen.getByTestId('summary-modal')).toBeInTheDocument();
    });

    test('displays loading spinner while fetching summary', async () => {
        render(<SummaryModal content={content} />);

        // Mocking queryHuggingFace to delay response
        queryHuggingFace.mockResolvedValueOnce([{ summary_text: '' }]);

        // Open the modal and click Summarize
        fireEvent.click(screen.getByText(/summarize/i));

        // Wait for loading spinner to appear
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('displays the summary once fetched', async () => {
        const mockSummary = 'This is the summarized version of the content.';
        queryHuggingFace.mockResolvedValueOnce([{ summary_text: mockSummary }]);

        render(<SummaryModal content={content} />);

        // Open the modal and click Summarize
        fireEvent.click(screen.getByText(/summarize/i));

        // Wait for the summary to be displayed
        await waitFor(() => {
            expect(screen.getByText(mockSummary)).toBeInTheDocument();
        });
    });



    test('calls queryHuggingFace when Summarize is clicked', async () => {
        const mockSummary = 'This is the summarized version of the content.';
        queryHuggingFace.mockResolvedValueOnce([{ summary_text: mockSummary }]);

        render(<SummaryModal content={content} />);

        // Open the modal and click Summarize
        fireEvent.click(screen.getByText(/summarize/i));

        // Ensure the queryHuggingFace function is called with the correct content
        expect(queryHuggingFace).toHaveBeenCalledWith('facebook/bart-large-cnn', content);
    });
});
