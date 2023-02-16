import { Close, Filter1, FilterAlt, Search } from '@mui/icons-material';
import { Button, Card, Fab, Grid, IconButton, MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

export default function FilterPage({
  mainBookData,
  bookDataCopy,
  changeBookDataOnFilter,
  setDataOnClearFilter,
}) {
  const [categoryText, setCategoryText] = React.useState("all");
  const [ratingText, setRatingText] = React.useState("none");
  const [isFilterEnable, setFilterEnable] = React.useState(false);


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

  const doFiltering = async () => {
    console.log(`category text you typed ${categoryText}`);
    console.log(`rating you selected ${ratingText}`);

    bookDataCopy = mainBookData.filter((item) => {
      const selectedGenre =
        categoryText.toLowerCase === "all" || categoryText === ""
          ? "none"
          : categoryText;
      const selectedRating =
        ratingText === "none" || ratingText === ""
          ? "none"
          : parseInt(ratingText)
      if ((selectedGenre === "none" || item.genre.toLowerCase() === selectedGenre)
        && (selectedRating === "none" || item.rating >= selectedRating)) {
        return true;
      }
      return false;
    });
    changeBookDataOnFilter(bookDataCopy);
  }

  const clearFilters = async () => {
    setCategoryText("");
    setRatingText("none");
    setFilterEnable(false);
    setDataOnClearFilter();
  }

  return !isFilterEnable ? (
    <div style={{
      display: "flex",
      justifyContent: "end",
      width: "100%",
      paddingTop: "10px",
      paddingRight: '10px',
    }}>
      <Fab
        color="primary"
        onClick={(e) => {
          setFilterEnable(true);
        }}>
        <FilterAlt />
      </Fab>
    </div>
  ) : (
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
                doFiltering();
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
              onClick={clearFilters}
            >
              Clear Filter
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
