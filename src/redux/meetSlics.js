import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    meets: [],


}

export const meetSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        addMeeting: (state, action) => {
            const newMeeting = action.payload
            state.meets.push(newMeeting)
        },
        setExistingMeeting: (state, action) => {
            const existingMeetings = action.payload
            state.meets = existingMeetings
        }

    }
})


export const { addMeeting, setExistingMeeting } = meetSlice.actions
export default meetSlice.reducer