// app/components/CategorySelect.js
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CategorySelect = ({ category, setCategory }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Category</InputLabel>
      <Select
        label="Category"
        value={category} // Ensures the current selected value is passed as prop
        onChange={(e) => setCategory(e.target.value)} // Handles the category change
      >
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Personal">Personal</MenuItem>
        <MenuItem value="Ideas">Ideas</MenuItem>
        <MenuItem value="Technology">Technology</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
