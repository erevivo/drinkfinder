// src/components/SearchHistory.tsx

import React from 'react';
import { Chip, List, ListItem, ListItemText } from '@mui/material';
import "./SearchHistory.css";
interface SearchHistoryProps {
  history: string[];
  onClick: (term: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onClick }) => {
  return (
    <List>
      {history.map((term, index) => (
        <Chip label={term} onClick={() => onClick(term)} key={term+index}/>
      ))}
    </List>
  );
};

export default SearchHistory;
