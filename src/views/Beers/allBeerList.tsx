import React, { useEffect, useState } from 'react';

// mui imports
import { Button, Card, CardContent, CircularProgress, Fade, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';

// project imports
import { Beer } from '../../types/beer';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 120,
        backgroundColor: 'black'
    }
});

// Styled component for the Card
const CustomCard = styled(Card)`
    height: 200;
    box-shadow: 4px 8px 4px rgb(0, 0, 0, 0.05);
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        box-shadow: 0px 0px 0px rgb(0, 0, 0, 0);
        background-color: rgb(227, 241, 255);
    }
`;

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
            <Grid container spacing={4}>
                {beers.length > 0
                    ? beers.map((beer: Beer, index: number) => (
                          <Grid key={index} item md={12} lg={6}>
                              <CustomCard>
                                  <CardContent sx={{ paddingLeft: '0px' }}>
                                      <Grid container>
                                          <Grid item xs={2} alignItems="center">
                                              <CustomWidthTooltip
                                                  title="Ingredient: grain, hops, yeast, water"
                                                  arrow
                                                  TransitionComponent={Fade}
                                                  TransitionProps={{ timeout: 600 }}
                                                  placement="top"
                                              >
                                                  <Grid sx={{ paddingTop: '16px', textAlign: 'center' }}>
                                                      <img height="140px" width="34px" src={beer.image_url} alt={`beer-${index}`} />
                                                  </Grid>
                                              </CustomWidthTooltip>
                                          </Grid>
                                          <Grid
                                              item
                                              xs={10}
                                              sx={{
                                                  paddingTop: '14px',
                                                  paddingBottom: '8px'
                                              }}
                                          >
                                              <Typography variant="h4" component="div">
                                                  {beer.name}
                                              </Typography>
                                              <Typography sx={{ color: 'rgb(211, 169, 86)', marginTop: '6px' }}>{beer.tagline}</Typography>
                                              <Typography
                                                  sx={{
                                                      marginTop: '6px',
                                                      display: '-webkit-box',
                                                      WebkitBoxOrient: 'vertical',
                                                      WebkitLineClamp: 2,
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis'
                                                  }}
                                              >
                                                  {beer.description}
                                              </Typography>
                                          </Grid>
                                      </Grid>
                                  </CardContent>
                              </CustomCard>
                          </Grid>
                      ))
                    : null}
            </Grid>
            <Grid display="flex" alignContent="center" justifyContent="center" marginTop="12px">
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
