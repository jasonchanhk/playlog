import { configureStore } from '@reduxjs/toolkit'
import YoutubePlayerReducer from './slice/youTubePlayer'
import ActionHistoryReducer from './slice/actionHistory'
import PlayerActionReducer from './slice/playerAction'

export const store = configureStore({
  reducer: {
    actionHistory: ActionHistoryReducer, 
    youtubePlayer: YoutubePlayerReducer,
    playerAction: PlayerActionReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch