import { configureStore } from '@reduxjs/toolkit'
import MeetReducer from './meetSlics'

export const store = configureStore({
    reducer: {
        meet: MeetReducer
    }



})