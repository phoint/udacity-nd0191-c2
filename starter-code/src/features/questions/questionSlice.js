import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../app/util";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

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
        }).addCase(fetchQuestions.fulfilled, (state, action) => {
            state.status = LoadingStatus.SUCCESS
            state.items = action.payload
        }).addCase(fetchQuestions.rejected, (state, action) => {
            state.status = LoadingStatus.FAILURE
            state.error = action.error.message
        }).addCase(addNewQuestion.pending, (state, action) => {
            state.status = LoadingStatus.PENDING
        }).addCase(addNewQuestion.fulfilled, (state, action) => {
            state.items = Object.assign({ [action.payload.id]: action.payload }, state.items)
            state.status = LoadingStatus.SUCCESS
        }).addCase(addNewQuestion.rejected, (state, action) => {
            state.status = LoadingStatus.FAILURE
            state.error = action.error.message
        }).addCase(saveQuestionAnswer.pending, (state, action) => {
            state.status = LoadingStatus.PENDING
        }).addCase(saveQuestionAnswer.fulfilled, (state, action) => {
            state.status = LoadingStatus.SUCCESS
            const { authedUser, qid, answer } = action.payload
            const questions = state.items
            const notAnswer = answer === 'optionOne' ? 'optionTwo' : 'optionOne'
            state.items = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authedUser])
                    },
                    [notAnswer] : {
                        ...questions[qid][notAnswer],
                        votes: questions[qid][notAnswer].votes.filter(user => user !== authedUser)
                    }
                }
            }
        })
    }
})

export const { getQuestions } = questionsSlice.actions
export default questionsSlice.reducer

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', () => _getQuestions())
export const addNewQuestion = createAsyncThunk('questions/addNewQuestion', (initialQuestion) => _saveQuestion(initialQuestion))
export const saveQuestionAnswer = createAsyncThunk('question/saveAnswer', async (answer) => {
    const isSaved = await _saveQuestionAnswer(answer)
    return {
        ...answer,
        isSaved: isSaved
    }
})

export const selectAllQuestions = createSelector([state => state.questions, (state, authedUser) => authedUser], 
    (questions, authedUser) => (
        Object.values(questions.items).map(question => ({
            id: question.id,
            author: question.author,
            timestamp: question.timestamp,
            done: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser),
        })).sort((a,b) => b.timestamp - a.timestamp)
    ))

export const getQuestionById = createSelector([state => state.questions, (state, id) => id], (questions, id) => questions.items[id]);

