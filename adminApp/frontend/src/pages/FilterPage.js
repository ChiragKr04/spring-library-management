import { Cancel, Close, CloseOutlined, Delete, Filter1, FilterAlt, Search } from '@mui/icons-material';
import { Button, Card, Chip, Fab, Grid, IconButton, MenuItem, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

export default function FilterPage({
  mainBookData,
  bookDataCopy,
  changeBookDataOnFilter,
  setDataOnClearFilter,
}) {
  const [categoryText, setCategoryText] = React.useState("");
  const [ratingText, setRatingText] = React.useState("none");
  const [isFilterEnable, setFilterEnable] = React.useState(false);
  const [allGenre, setAllGenre] = React.useState([]);


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
      label: 'All',
    },
  ];

  const divMidItemStyle = {
    width: "100%",
    margin: "4px",
    flex: 2
  };

  const divFLItemStyle = {
    width: "100%",
    margin: "4px",
    flex: 1
  };

  const doFiltering = async () => {
    console.log(`category text you typed ${categoryText}`);
    console.log(`rating you selected ${ratingText}`);

    const isInAllGenre = (currGenre) => {
      if (allGenre.length == 0) {
        return true;
      }
      const lowerCaseList = allGenre.map((item) => item.toLowerCase());
      return lowerCaseList.includes(currGenre.toLowerCase());
    };

    bookDataCopy = mainBookData.filter((item) => {
      const selectedGenre =
        categoryText.toLowerCase() === "all" || categoryText === ""
          ? "none"
          : categoryText;
      const selectedRating =
        ratingText === "none" || ratingText === ""
          ? "none"
          : parseInt(ratingText);
      if (
        (isInAllGenre(item.genre)) &&
        (selectedRating === "none" || item.rating >= selectedRating)
      ) {
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
    setAllGenre([]);
    setDataOnClearFilter();
  }

  const removeGenre = (index) => {
    var newGenres = [...allGenre];
    newGenres.splice(index, 1);
    setAllGenre(newGenres);
    // doFiltering();
  };

  const doOnEnter = (event) => {
    if (event.key === "Enter") {
      if (categoryText != "") {
        let newGenres = [...allGenre];
        const lowerCaseList = newGenres.map((item) => item.toLowerCase());
        if (!lowerCaseList.includes(categoryText.toLowerCase())) {
          newGenres.push(categoryText);
          setAllGenre(newGenres);
          // doFiltering();
        }
      }
    }
  }

  React.useEffect(() => {
    doFiltering();
  }, [ratingText]);

  React.useEffect(() => {
    console.log(`selectedGenre ${categoryText}`);
    doFiltering();
    setCategoryText("");
  }, [allGenre]);

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
        <Box style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
          {/* Item 1 */}
          <div style={{
            margin: "4px",
            flex: 1
          }}>
            <Button
              pr={2}
              variant='contained'
              startIcon={<FilterAlt />}
              disabled
              style={{
                backgroundColor: "rgb(25,118,210)",
                width: "100%",
                color: "white"
              }}
            >
              Filter
            </Button>
          </div>
          {/* Item 2 */}
          <div style={{
            width: "100%",
            margin: "4px",
            flex: 2
          }}>
            <Grid item>
              <Stack>
                <TextField
                  variant="outlined"
                  size='small'
                  value={categoryText}
                  label="Genre"
                  onChange={(event) => {
                    setCategoryText(event.target.value);
                  }}
                  onKeyDown={doOnEnter}
                  style={{
                    paddingLeft: "5px",
                    paddingRight: "5px"
                  }}
                />
                <div style={{ paddingTop: "5px" }}></div>
                <Grid container spacing={1}>
                  {allGenre.map((genre, index) => (
                    <Grid item xs={4} key={index}>
                      <Chip
                        label={genre}
                        onDelete={() => { removeGenre(index) }}
                        deleteIcon={<Cancel style={{ color: "white" }} />}
                        style={{
                          backgroundColor: "#D61355",
                          color: "white",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          </div>
          {/* Item 3 */}
          <div style={{
            margin: "4px",
            flex: 2
          }}>
            <Grid item>
              <TextField
                select
                label="Rating"
                size='small'
                defaultValue="none"
                style={{
                  width: "100%"
                }}
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
          </div>
          {/* Item 4 */}
          <div style={{
            margin: "4px",
            flex: 1
          }}>
            <Grid item>
              <Button
                variant='outlined'
                style={{
                  width: "100%",
                }}
                startIcon={<Close />}
                onClick={clearFilters}
              >
                Clear Filter
              </Button>
            </Grid>
          </div>
        </Box>
      </Card>
    </div>
  )
}
