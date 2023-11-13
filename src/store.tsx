import { configureStore } from '@reduxjs/toolkit'
import VideoReducer from './slices/videoSlice'
import ActionHistoryReducer from './slices/actionHistory'
import PlayerActionReducer from './slices/playerAction'

export const store = configureStore({
  reducer: {
    actionHistory: ActionHistoryReducer, 
    video: VideoReducer,
    playerAction: PlayerActionReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch