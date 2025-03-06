import { useState } from "react";
import { Modal, Box, Typography, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import NoteInput from "../NoteInput/NoteInput";

export default function AddNoteModal({ open, onClose, onAddNote }) {
    const [newNote, setNewNote] = useState("");

    const [error, setError] = useState(""); // State for validation error

    const handleSubmit = () => {
        if (!newNote.trim()) {
            setError("Note content is required.");
            return;
        }

        setError(""); // Clear error if valid
        onAddNote(newNote);
        setNewNote(""); // Reset input fields
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} data-testid="add-note-modal">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                    position: "relative", // Required for absolute positioning of close button
                }}
            >
                {/* Close Button */}
                <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={onClose}
                    aria-label='close'
                    role="button"
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" gutterBottom>
                    Add Note
                </Typography>


                {/* Note Input with Validation */}
                <NoteInput newNote={newNote} setNewNote={(value) => {
                    setNewNote(value);
                    if (value.trim()) setError(""); // Clear error when user types
                }} />

                {/* Show Error Message */}
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Typography color="note" variant="body2" sx={{ mt: 1 }}>
                    {'Note : We will assign a category based on the content of the note using AI'}
                </Typography>
                {/* Add and Close Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!newNote.trim()} // Disable button if input is empty
                    >
                        Add Note
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
