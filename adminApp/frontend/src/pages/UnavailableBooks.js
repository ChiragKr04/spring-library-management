import { Check, Delete } from '@mui/icons-material';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React from 'react'
import { ApiConstants } from '../util/ApiConstants';
import { RestApiService } from '../util/RestApiService';

export default function UnavailableBooks({ bookList }) {

  if (bookList.length == 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {
        bookList.map((value, index) => {
          return <List
            key={index}>
            <ListItem
              secondaryAction={
                <Grid container>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Copies"
                      variant="outlined"
                      type={"number"}
                      inputProps={{
                        min: 0,
                        max: 10,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton edge="end" >
                      <Check />
                    </IconButton>
                  </Grid>
                </Grid>
              } >
              <ListItemAvatar>
                <img style={{ marginRight: "20px" }} height={"80px"} src={value.image} />
              </ListItemAvatar>
              <ListItemText
                primary={value.title}
                secondary={value.author}
              />
            </ListItem>
          </List>
        })
      }
    </div>
  )
}
