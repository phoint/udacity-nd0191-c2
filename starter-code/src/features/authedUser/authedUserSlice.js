import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
    name: 'authedUser',
    initialState: {
        id: null,
        name: null,
        error: null,
        isAuthenticated: false
    },
    reducers: {
        logout: (state, action) => {
            Object.assign(state, {
                id: null,
                name: null,
                error: null,
                isAuthenticated: false
            });
        }
    },
    extraReducers(builder) {
        builder.addCase(authenticate.fulfilled, (state, action) => {
            Object.assign(state,
                {
                    ...action.payload,
                    error: null,
                    isAuthenticated: true,
                })
        }).addCase(authenticate.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export const { logout } = authedUserSlice.actions
export default authedUserSlice.reducer

export const authenticate = createAsyncThunk('authedUser/authenticate', async ({email, password}, thunkAPI) => {
    const { users } = thunkAPI.getState();
    console.log(JSON.stringify(users))
    const authedUser = Object.entries(users.items).find(([key, value]) => (value.id === email && value.password === password), null)
    if (!email && !password) {
        return thunkAPI.rejectWithValue('Please fill the required field.')
    }
    if (!authedUser) {
        return thunkAPI.rejectWithValue('Email or Password is incorrect.')
    } else {
        return thunkAPI.fulfillWithValue({
            id: authedUser[0],
            name: authedUser[1].name
        })
    }
})

