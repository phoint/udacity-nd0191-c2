import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../app/util";
import { _getQuestions } from "../../_DATA";

const initialState = {
    items: {},
    status: LoadingStatus.IDLE,
    error: null,
}

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchQuestions.pending, (state, action) => {
            state.status = LoadingStatus.PENDING
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
            state.status = LoadingStatus.SUCCESS
            state.items = action.payload
        }).addCase(fetchQuestions.rejected, (state, action) => {
            state.status = LoadingStatus.FAILURE
            state.error = action.error.message
        })
    }
})

export const { getQuestions } = questionsSlice.actions
export default questionsSlice.reducer

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', () => _getQuestions())

export const selectAllQuestions = createSelector([state => state.questions, (state, authedUser) => authedUser], 
    (questions, authedUser) => (
        Object.values(questions.items).map(question => ({
            id: question.id,
            author: question.author,
            timestamp: question.timestamp,
            done: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser),
        }))
    ))

export const getQuestionById = createSelector([state => state.questions, (state, id) => id], (questions, id) => questions.items[id]);

