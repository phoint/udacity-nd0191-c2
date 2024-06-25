import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
    name: 'question',
    initialState: {},
    reducers: {
        getQuestion: (state, action) => {
            state.questions = action.payload;
        }
    }
})

export const { getQuestion } = questionsSlice.actions
export default questionsSlice.reducer

