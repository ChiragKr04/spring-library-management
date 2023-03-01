import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { RestApiService } from '../util/RestApiService';
import { ApiConstants } from '../util/ApiConstants';

export default function AddNewBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(1);

  const addBook = async () => {
    if (
      title.length == 0 ||
      author.length == 0 ||
      imageUrl.length == 0 ||
      rating == 0 ||
      price == 0 ||
      genre.length == 0 ||
      description.length == 0 ||
      copies == 0
    ) {
      console.log("invalid inputs");
      return;
    }
    var bookObj = {
      "title": title,
      "author": author,
      "image": imageUrl,
      "rating": rating,
      "price": price,
      "genre": genre,
      "description": description,
    }
    console.log(bookObj);
    await RestApiService.post(
      ApiConstants.addBook,
      {
        "copies": copies,
      },
      bookObj,
    ).then(result => {
      console.log(result);
    });
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <h2 style={{
        display: 'flex',
        justifyContent: "center"
      }}>Add New Book</h2>
      <TextField
        label="Book Title"
        variant="outlined"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        label="Author"
        variant="outlined"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <TextField
        label="Image URL"
        variant="outlined"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        value={price}
        type={"number"}
        inputProps={{
          step: "0.1",
          min: 0,
        }}
        onChange={(event) => setPrice(event.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <TextField
          fullWidth
          label="Genre"
          variant="outlined"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
        <TextField
          fullWidth
          label="Rating"
          variant="outlined"
          value={rating}
          type={"number"}
          inputProps={{
            step: "0.1",
            min: 0,
            max: 5,
          }}
          onChange={(event) => setRating(event.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">/ 5.0</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="Copies"
          variant="outlined"
          type={"number"}
          inputProps={{
            min: 0,
            max: 10,
          }}
          value={copies}
          onChange={(event) => setCopies(event.target.value)}
        />
      </div>
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        multiline
        rows={4}
      />
      <Button onClick={addBook} type="submit" variant="contained" color="primary">
        Add Book
      </Button>
    </div>
  )
}

