// src/components/DrinkFinder.tsx

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import "./DrinkFinder.css";
interface DrinkFinderProps {
  onSearch: (query: string) => void;
}

const DrinkFinder: React.FC<DrinkFinderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop:0}}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        fullWidth
        
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default DrinkFinder;
