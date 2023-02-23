import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiConstants } from "../utils/ApiConstants";
import { RestApiService } from "../utils/RestApiService";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ userId, password }) => {
        return await RestApiService.post(
            ApiConstants.login,
            {},
            {
                "userId": userId,
                "password": password,
            }
        ).then((result) => {
            console.log(result);
            return result.data;
        });
    });

// creating initial state
const userDataSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = action;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export default userDataSlice.reducer;

