// src/components/DrinkList.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface DrinkListProps {
  drinks: any[];
  onSelectDrink: (drink: any) => void; 
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, onSelectDrink }) => {
  return (
    <List>
      {drinks.map((drink) => (
        <ListItem button key={drink.idDrink} onClick={() => onSelectDrink(drink)}>
          <ListItemText primary={drink.strDrink} />
        </ListItem>
      ))}
    </List>
  );
};

export default DrinkList;
