import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from '../features/questions/questionSlice'
import usersReducer from '../features/users/userSlice'
import authedUserReducer from '../features/authedUser/authedUserSlice'

export default configureStore({
  reducer: {
    questions: questionsReducer,
    users: usersReducer,
    authedUser: authedUserReducer
  }
})