import { createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
    name: 'authedUser',
    initialState: null,
    reducers: {
        setAuthedUser: (state, action) => {
            state.authedUser = action.payload;
        },
        login: (state, action) => {
            state.authedUser = action.payload;
        },
        logout: (state, action) => {
            state.authedUser = null;
        }
    }
})

export const { setAuthedUser, login, logout } = authedUserSlice.actions
export default authedUserSlice.reducer

