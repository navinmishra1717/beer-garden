import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Beer } from '../../types/beer';

const AllBeerListPage = () => {
    const [beers, setBeers] = useState<Beer[]>([]);
    useEffect(() => {
        fetchAllBeers();
    }, []);

    const fetchAllBeers = async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers
            `);
            const data = await response.json();
            setBeers(data);
        } catch (error: any) {
            console.error('Error fetching beer list:', error);
        }
    };
    return (
        <>
            {beers?.map((beer: Beer) => (
                <Grid>
                    <Typography>{beer?.name}</Typography>
                    <Typography>{beer?.tagline}</Typography>
                </Grid>
            ))}
        </>
    );
};

export default AllBeerListPage;
