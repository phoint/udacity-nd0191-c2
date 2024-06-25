import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        }
    }
})

export const { getUsers } = usersSlice.actions
export default usersSlice.reducer

