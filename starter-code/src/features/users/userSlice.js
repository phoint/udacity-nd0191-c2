import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";
import { LoadingStatus } from "../../app/util";
import { saveQuestionAnswer } from "../questions/questionSlice";

const initialState = {
    status: LoadingStatus.IDLE,
    items: {},
    error: null
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = LoadingStatus.PENDING;
        }).addCase(fetchUser.fulfilled, (state, action) => {
            state.status = LoadingStatus.SUCCESS;
            state.items = action.payload;
        }).addCase(fetchUser.rejected, (state, action) => {
            state.status = LoadingStatus.FAILURE;
            state.error = action.error.message;
        }).addCase(saveQuestionAnswer.fulfilled, (state, action) => {
            state.status = LoadingStatus.SUCCESS;
            const users = state.items
            const { authedUser, qid, answer } = action.payload
            state.items = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        })
    }
})

export const { getUsers } = usersSlice.actions
export default usersSlice.reducer

export const fetchUser = createAsyncThunk('users/fetchUsers', () => _getUsers())

export const getAllUsers = (state) => Object.values(state.users).map(user => ({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
}))

export const selectUserByLeaderdoard = createSelector([state => state.users], 
    (users) => Object.values(users.items).map(i => {
        const {id, name, avatarURL, answers, questions} = i;
        return {
            id,
            name,
            avatarURL,
            question: questions.length,
            answer: Object.entries(answers).length
        }
    }))

export const getUserById = createSelector([state => state.users, (state, userId) => userId], (users, userId) => (users.items[userId]))
