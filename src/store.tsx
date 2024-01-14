import { configureStore } from '@reduxjs/toolkit'
import VideoReducer from './slices/videoSlice'
import GameReducer from './slices/gameSlice'
import ModalReducer from './slices/modalSlice'
import TimerReducer from './slices/timerSlice'
import PlayerSlice from './slices/playerSlice'

export const store = configureStore({
  reducer: { 
    video: VideoReducer,
    game: GameReducer,
    modal: ModalReducer,
    timer: TimerReducer,
    player: PlayerSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch