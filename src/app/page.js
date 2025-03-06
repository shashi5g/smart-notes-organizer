"use client";

import { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import NoteCard from "@/app/components/NoteCard/NoteCard";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import AddNoteModal from "@/app/components/AddNoteModal/AddNoteModal";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // Modal state

  // Fetch Notes
  useEffect(() => {
    fetchNotes();

  }, []);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  // Add Note
  const handleAddNote = async (content, category) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setNotes([data[0], ...notes]);
  };

  // Delete Note
  const handleDeleteNote = async (id) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit Note
  const handleEdit = async (id, category, newContent) => {
    // Send PUT request to update the note
    const response = await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content: newContent, category }),
    });
    // Check if the request was successful
    if (!response.ok) {
      // Handle the error (you can display a message to the user if needed)
      console.error("Failed to update note");
      return;
    }

    // Get all updated notes from the response
    const updatedNotes = await response.json();

    // Update the state with the new list of notes
    setNotes(updatedNotes);
  };


  // Filter Notes
  const filteredNotes = notes.filter(
    (note) => note?.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Smart Notes Organizer
        </Typography>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Add Note Button */}
        <Box textAlign="right" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Note
          </Button>
        </Box>

        {/* Notes Grid */}
        <Grid container spacing={3}>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <NoteCard note={note} onDelete={handleDeleteNote} onEdit={handleEdit} />
              </Grid>
            ))
          ) : (
            <Typography textAlign="center" sx={{ width: "100%", mt: 4 }}>
              No notes found.
            </Typography>
          )}
        </Grid>

        {/* Add Note Modal */}
        <AddNoteModal open={open} onClose={() => setOpen(false)} onAddNote={handleAddNote} />
      </Box>
    </Container>
  );
}
