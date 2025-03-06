import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../page";

global.fetch = jest.fn();

describe("Home Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("fetches and displays notes on initial render", async () => {
        const mockNotes = [{ id: 1, content: "Test Note", category: "Work" }];

        fetch.mockResolvedValueOnce({
            ok: true, // Ensures the response is considered "successful"
            json: async () => mockNotes, // Ensures json() returns a promise
        });

        render(<Home />);

        // Wait for the notes to appear
        await waitFor(() => expect(screen.getByText("Test Note")).toBeInTheDocument());
    });

    test("filters notes based on search input", async () => {
        const mockNotes = [
            { id: 1, content: "Shopping List", category: "Personal" },
            { id: 2, content: "Meeting Notes", category: "Work" },
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockNotes,
        });

        render(<Home />);

        await waitFor(() => expect(screen.getByText("Shopping List")).toBeInTheDocument());

        const searchInput = screen.getByLabelText("Search Notes");
        fireEvent.change(searchInput, { target: { value: "meeting" } });

        await waitFor(() => expect(screen.getByText("Meeting Notes")).toBeInTheDocument());
        expect(screen.queryByText("Shopping List")).not.toBeInTheDocument();
    });

    test("shows 'No notes found' when there are no matching notes", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [], // Ensure json() resolves to an empty array
        });

        render(<Home />);

        await waitFor(() => expect(screen.getByText("No notes found.")).toBeInTheDocument());
    });
});
