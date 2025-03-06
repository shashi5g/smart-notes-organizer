// app/components/SearchBar.js
import { TextField, Box } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box mb={3}>
      <TextField
        label="Search Notes"
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
