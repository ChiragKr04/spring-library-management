import { Close, Filter1, FilterAlt, Search } from '@mui/icons-material';
import { Button, Card, Grid, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

export default function FilterPage() {
  const [categoryText, setCategoryText] = React.useState();
  const [ratingText, setRatingText] = React.useState();


  const ratingValue = [
    {
      value: '4',
      label: '> 4 Star',
    },
    {
      value: '3',
      label: '> 3 Star',
    },
    {
      value: '2',
      label: '> 2 Star',
    },
    {
      value: '1',
      label: '> 1 Star',
    },
    {
      value: 'none',
      label: 'None',
    },
  ];

  const callFilterApi = async () => {
    console.log(`category text you typed ${categoryText}`);
    console.log(`rating you selected ${ratingText}`);
  }

  const clearFilters = async () => {
    setCategoryText("");
    setRatingText("");
  }

  return (
    <div style={{
      width: "100%",
      alignContent: "center"
    }}>
      <Card
        elevation={5}
        style={{
          padding: "12px"
        }}
      >
        <Grid
          container
          justifyContent={"space-evenly"}
        >
          <Grid item >
            <Button
              pr={2}
              variant='contained'
              startIcon={<FilterAlt />}
              disabled
              style={{
                backgroundColor: "rgb(25,118,210)",
                color: "white"
              }}
            >
              Filter
            </Button>
          </Grid>
          <Grid item >
            <TextField
              variant="outlined"
              size='small'
              label="Genre"
              onChange={(event) => {
                setCategoryText(event.target.value);
              }}
              style={{
                paddingLeft: "5px",
                paddingRight: "5px"
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              select
              label="Rating"
              size='small'
              defaultValue="none"
              onChange={(event) => {
                setRatingText(event.target.value);
              }}
            >
              {ratingValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={() => {
                callFilterApi();
              }}
              startIcon={<Search />}
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              startIcon={<Close />}
            >
              Clear Filter
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
