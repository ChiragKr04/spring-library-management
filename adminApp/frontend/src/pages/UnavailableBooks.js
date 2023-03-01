import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
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
            <ListItem>
              <ListItemAvatar>
                <img style={{ marginRight: "20px" }} height={"80px"} src={value.image} />
              </ListItemAvatar>
              <ListItemText primary={value.title} secondary={value.author} />
            </ListItem>
          </List>
        })
      }
    </div>
  )
}
