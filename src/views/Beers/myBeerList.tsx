import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MyBeerListPage = () => {
    const [beers, setBeers] = useState([]);
    useEffect(() => {
        fetchAllBeers();
    }, []);

    const fetchAllBeers = async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/
            `);

            console.log({ response });
            const data = await response.json();
            setBeers(data.data.items);
        } catch (error: any) {
            console.error('Error fetching tasks:', error);
        }
    };
    return (
        <>
            {beers?.map((beer) => (
                <Grid>
                    <Typography> This is my beers list page</Typography>
                </Grid>
            ))}
            ;
        </>
    );
};

export default MyBeerListPage;
