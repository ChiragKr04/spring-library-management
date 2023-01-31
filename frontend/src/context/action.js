import axios, { Axios } from "axios";
import {ApiConstants} from "../util/ApiConstants"
// API function
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };
  try {
    // dispatch({ type: 'REQUEST LOGIN' });
    let response = await axios.post(ApiConstants.login, loginPayload);

    if (response?.data) {
      // dispatch({ type: 'LOGIN SUCCESS', payload: response?.data });
      localStorage.setItem('currentUser', JSON.stringify(response?.data));
      return response?.data
    }
 
    // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    console.log(error);
    // dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
