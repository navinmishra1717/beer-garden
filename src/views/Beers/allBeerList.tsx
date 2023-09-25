import React, { useEffect, useState } from 'react';

// mui imports
import { Button, Card, CardContent, CircularProgress, Fade, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';

// project imports
import { Beer } from '../../types/beer';
import './beers.css';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 120,
        backgroundColor: 'black'
    }
});

const AllBeerListPage = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [loading, setLoading] = useState(false);
    const [beers, setBeers] = useState<Beer[]>([]);

    useEffect(() => {
        setLoading(true);
        fetchAllBeers();
    }, [page, perPage]);

    const handleLoadMore = (e: any) => {
        setPage(page + 1);
    };

    const fetchAllBeers = async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}
            `);
            const data = await response.json();
            setBeers([...beers, ...data]);
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching beer list:', error);
        }
    };
    return loading ? (
        <Box sx={{ display: 'flex' }} className="loading">
            <CircularProgress />
        </Box>
    ) : (
        <>
            {beers?.map((beer: Beer, index: number) => (
                <Card className="main-card">
                    <CardContent>
                        <Grid container className="beer-detail">
                            <Grid item className="image-container">
                                <CustomWidthTooltip
                                    title="Ingredient: grain, hops, yeast, water"
                                    arrow
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    placement="top"
                                >
                                    <img className="beer-image" src={beer.image_url} alt={`beer-${index}`} />
                                </CustomWidthTooltip>
                            </Grid>
                            <Grid item className="beer-content">
                                <Typography className="beer-name">{beer.name}</Typography>
                                <Typography className="beer-tagline">{beer.tagline || ''}</Typography>
                                <Typography className="beer-description">{beer.description || ''}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <Grid display="flex" alignContent="center" justifyContent="center">
                <Button
                    sx={{
                        color: '#3687D0'
                    }}
                    onClick={handleLoadMore}
                >
                    <Typography>Load More</Typography>
                    <KeyboardArrowDownIcon />
                </Button>
            </Grid>
        </>
    );
};

export default AllBeerListPage;
