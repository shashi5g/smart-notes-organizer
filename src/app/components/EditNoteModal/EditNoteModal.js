import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function EditNoteModal({ open, onClose, onEdit, note }) {
    const [editedContent, setEditedContent] = useState(note?.content || "");
    const [error, setError] = useState(""); // State for validation error

    // Reset edited content when the modal opens
    useEffect(() => {
        if (note) {
            setEditedContent(note.content || "");
            setError(""); // Clear errors when modal opens
        }
    }, [note, open]);

    const handleEditContent = () => {
        if (!editedContent.trim()) {
            setError("Note content is required.");
            return;
        }

        setError(""); // Clear error if valid
        onEdit(note.id, editedContent);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
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
                    position: "relative",
                }}
            >
                {/* Close Button */}
                <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" gutterBottom>
                    Edit Note
                </Typography>

                {/* Input Field with Validation */}
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Note Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={editedContent}
                    onChange={(e) => {
                        setEditedContent(e.target.value);
                        if (e.target.value.trim()) setError(""); // Clear error when user types
                    }}
                    error={!!error}
                    helperText={error}
                />

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditContent}
                        disabled={!editedContent.trim()} // Disable button if input is empty
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
