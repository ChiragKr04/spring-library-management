import React from 'react'
import { Grid, TextField, Stack, Button } from "@mui/material";
import { RestApiService } from '../utils/RestApiService';
import { ApiConstants } from '../utils/ApiConstants';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/UserAuthReducer';

export default function AdminLogin() {

  const [userId, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { userData, loading } = useSelector(
    (state) => state.user
  );

  const login = async () => {
    dispatch(loginUser({ userId, password }));
  }

  React.useEffect(() => {
    console.log(userData);
    if (userData != null) {
      console.log(userData.payload);
    }
  }, [userData, loading]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Stack>
        <TextField
          required
          label={"Email"}
          defaultValue={"hNbX391"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          label={"Password"}
          defaultValue={"123456"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          onClick={login}
        >
          Login
        </Button>
      </Stack>
    </div>
  )
}
