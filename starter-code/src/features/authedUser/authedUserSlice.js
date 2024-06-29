import { createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
    name: 'authedUser',
    initialState: {
        id: null,
        name: null
    },
    reducers: {
        login: (state, action) => {
            const {id, name} = action.payload;
            state.id = id;
            state.name = name;
        },
        logout: (state, action) => {
            state.id = null;
        }
    }
})

export const { login, logout } = authedUserSlice.actions
export default authedUserSlice.reducer

