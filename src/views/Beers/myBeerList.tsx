import React, { useEffect, useState } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { Beer } from '../../types/beer';
import styled from 'styled-components';
import AddBeer from './addBeer';
import { CustomButton } from '../../components/CustomButton';

const CustomLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;

const CustomFixedButton = styled(CustomButton)`
    position: fixed;
    right: 30px;
    top: 50px;
`;

const MyBeerListPage = () => {
    const [myBeers, setMyBeers] = useState<Beer[]>([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value?: string) => {
        setOpen(false);
    };

    return (
        <Grid sx={{ position: 'relative' }}>
            <CustomFixedButton onClick={handleClickOpen}>Add a new beer</CustomFixedButton>
            {myBeers.length ? (
                <Grid container>
                    {myBeers?.map((beer) => (
                        <Grid item>
                            <Typography> This is my beers list page</Typography>
                        </Grid>
                    ))}
                    ;
                </Grid>
            ) : (
                <Grid container direction="column" marginTop="150px" alignItems="center">
                    <Typography>Nothing to see yet.</Typography>
                    <Typography>
                        <CustomLink onClick={handleClickOpen}>Click here</CustomLink> to add your first beer!
                    </Typography>
                </Grid>
            )}
            <AddBeer open={open} onClose={handleClose} />
        </Grid>
    );
};

export default MyBeerListPage;
