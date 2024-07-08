import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import questionsReducer from '../features/questions/questionSlice'
import usersReducer from '../features/users/userSlice'
import authedUserReducer from '../features/authedUser/authedUserSlice'

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      questions: questionsReducer,
      users: usersReducer,
      authedUser: authedUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState
  })
}