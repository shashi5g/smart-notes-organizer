import React, { useState } from "react";
import { Card, CardContent, Typography, Chip, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteModal from "../EditNoteModal/EditNoteModal"; // Import the new modal

import SummaryModal from "../SummaryModal/SummaryModal";
const NoteCard = ({ note, onDelete, onEdit }) => {

  const [open, setOpen] = useState(false);



  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "200px",
        height: "auto",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          overflow: "hidden",
          '&:last-child': { paddingBottom: '40px' }
        }}
      >
        {/* Sentiment Display */}
        <Typography variant="caption" color="textSecondary">
          Sentiment: <strong>{note.sentiment}</strong>
        </Typography>
        {/* Note Content */}
        <Box flexGrow={1}>
          <Typography variant="body1" paragraph>
            {note.content}
          </Typography>
        </Box>




        {/* Category Tag (Chip) positioned at the bottom-left */}
        <Chip
          label={note.category}
          color="primary"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
          }}
        />
        <Box sx={{
          position: "absolute",
          bottom: 8,
          left: 120,

        }}> <SummaryModal content={note.content} /></Box>
        {/* Delete Icon Button */}
        <IconButton
          role='button'
          onClick={() => onDelete(note.id)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            color: "error.main",
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>

        {/* Edit Icon Button */}
        <IconButton
          aria-label="edit"
          role='button'
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 40,
            color: "primary.main",
          }}
        >
          <EditIcon />
        </IconButton>
      </CardContent>
      {/* Summary Modal */}

      {/* Edit Modal */}
      <EditNoteModal open={open} onClose={() => setOpen(false)} onEdit={onEdit} note={note} />
    </Card>
  );
};

export default NoteCard;
