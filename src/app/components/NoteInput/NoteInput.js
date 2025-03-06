// app/components/NoteInput.js
import { TextField, Button, Box } from '@mui/material';

const NoteInput = ({ newNote, setNewNote }) => {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        variant="outlined"
        label="New Note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value || '')}
        multiline
        rows={4}
      />
    </Box>
  );
};

export default NoteInput;
