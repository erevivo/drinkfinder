// src/App.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { Container, Box, TextField, TextFieldProps, List, ListItem, ListItemText, Grid, Paper, Typography, Button, Menu, MenuItem } from '@mui/material';
import DrinkFinder from './components/DrinkFinder/DrinkFinder';
import { getDrinks } from './api';
import { Drink } from './models/apiModels';
import Logo from './components/Layout/Header/Logo/Logo';
import SearchHistory from './components/SearchHistory/SearchHistory';
import { SettingsApplications } from '@mui/icons-material';

interface Item {
    title: string;
    description: string;
}



const App: React.FC = () => {
    const [keyword, setKeyword] = useState("")
    const [drinks, setDrinks] = useState([] as Drink[])
    const [searchHistory, setSearchHistory] = useState([] as string[])
    const [ingredient, setIngredient] = useState("");
    const [selectedItem, setSelectedItem] = useState<Drink | null>(null);
    // const [sortedItems, setSortedItems] = useState<Drink[]>([]);
    const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSortOption, setSelectedSortOption] = useState<string>('name');

    const filteredDrinks = useMemo(() => 
        {
            if(drinks.length === 0){
                return [] as Drink[]
            }
            
            return drinks.filter(drink => {
        if (ingredient === "") return true;
        let key: keyof typeof drink;
        for (key in drink) {
            if (key.startsWith("strIngredient")) {
                const value = drink[key] as string | null;
                if (value?.includes(ingredient)) {
                    return true;
                }
            }
        }
        return false;
    })}, [drinks, ingredient])

    // useEffect(() => {
    // }, [keyword])
    const handleSearch = (query: string) => {
        setKeyword(query);
        const idx = searchHistory.findIndex((drink) => drink === query)
        let temp = searchHistory;
        if (idx >= 0) {
            const first = searchHistory.slice(0, idx);
            const last = searchHistory.slice(idx + 1);
            temp = [...first, ...last]
        }
        setSearchHistory([query, ...temp])
        console.log('Search query:', query);

        getDrinks(query).then((res) => {
            setDrinks(res.data.drinks);
        })
    };

    const sortItemsByName = () => {
        const sorted = [...filteredDrinks].sort((a, b) => a.strDrink.localeCompare(b.strDrink));
        // setSortedItems(sorted);
        setDrinks(sorted);
    };

    const sortItemsByDate = () => {
        const sorted = [...filteredDrinks].sort((a, b) => {
            // Assuming there's a date attribute in your Drink model
            const dateString1 = "2024-07-12"; // Example date string in yyyy-mm-dd format
            const dateString2 = "2024-09-12"; // Example date string in yyyy-mm-dd format
            return new Date(dateString1).getTime() - new Date(dateString2).getTime();
        });
        // setSortedItems(sorted);
        setDrinks(sorted);
    };
    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const handleSortOptionSelect = (option: string) => {
        setSelectedSortOption(option);
        handleSortClose();

        if (option === 'name') {
            sortItemsByName();
        } else if (option === 'date') {
            sortItemsByDate();
        }
    };

    const filterByIngredient: TextFieldProps['onChange'] = (e) => {
        setIngredient(e.target.value);
    }
    return (

        <Container style={{}}>
            <Logo />
            <DrinkFinder onSearch={handleSearch} />
            <SearchHistory history={searchHistory} onClick={handleSearch} />
            <TextField placeholder='Filter by ingredient' value={ingredient} onChange={filterByIngredient} />
            <Button onClick={handleSortClick} variant="contained" style={{ margin: 8 }}>
                Sort Options
            </Button>

            <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
            >
                <MenuItem onClick={() => handleSortOptionSelect('name')}>Sort by Name (Ascending)</MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect('date')}>Sort by Date</MenuItem>
            </Menu>
            <Grid container spacing={2} style={{ paddingTop: 10 }}>
                <Grid item xs={3}>
                    <Paper>
                        <List>
                            {
                                filteredDrinks.map((drink, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={() => setSelectedItem(drink)}
                                    >
                                        <ListItemText primary={drink.strDrink} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: 16, height: '100%' }}>
                        {selectedItem ? (
                            <>
                                <Typography variant="h6">{selectedItem.strDrink}</Typography>
                                <Typography variant="body1">{selectedItem.strInstructions}</Typography>

                            </>
                        ) : (
                            <Typography variant="body1">Select an item to see the description</Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ padding: 16, height: '100%' }}>
                        {selectedItem ? (
                            <>
                                <Typography variant="body1"> <img src={selectedItem.strDrinkThumb} style={{ width: '100%' }} /></Typography>
                            </>
                        ) : (
                            <Typography variant="body1">Select an item to see the description</Typography>
                        )}

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
