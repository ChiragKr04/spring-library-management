import { configureStore } from '@reduxjs/toolkit'
import UserDataReducer from "./redux/UserAuthReducer";

export default configureStore({
    reducer: {
        user: UserDataReducer
    },
})