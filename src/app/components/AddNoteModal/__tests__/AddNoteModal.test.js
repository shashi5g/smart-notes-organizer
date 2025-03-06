import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNoteModal from "../AddNoteModal";
import "@testing-library/jest-dom";
import { queryHuggingFace } from "@/app/utils/huggingface"; // Mocking Hugging Face query
import userEvent from "@testing-library/user-event";

// Mock the API call to Hugging Face
jest.mock("@/app/utils/huggingface", () => ({
    queryHuggingFace: jest.fn(),
}));

describe("AddNoteModal", () => {
    let mockOnAddNote, mockOnClose;

    beforeEach(() => {
        mockOnAddNote = jest.fn();
        mockOnClose = jest.fn();
    });





    it("should call onClose when Cancel button is clicked", () => {
        render(
            <AddNoteModal open={true} onClose={mockOnClose} onAddNote={mockOnAddNote} />
        );

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });



});
