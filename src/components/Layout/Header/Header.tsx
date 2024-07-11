import React from 'react';
import "./Header.css";
import Logo from "../Header/Logo/Logo"
import { Search } from "@mui/icons-material";
import SearchBar from "../Header/SearchBar/SearchBar";
import { Box, Grid } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';



const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Perform your search logic here
  }; 

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Logo/>
            <Grid container columns={{ xs: 4, md: 12 }}>
  <Grid item xs={2} />
</Grid>
        </div>
    );
}

export default Header;

