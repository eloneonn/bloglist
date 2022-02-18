import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        },
    },
})

var timeoutID = ''

export const setNotification = (notification, time) => {
    return async (dispatch) => {
        dispatch(showNotification(notification))
        clearTimeout(timeoutID)

        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
