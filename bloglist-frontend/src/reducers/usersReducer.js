import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const initializeUsers = () => {
    return async (dispatch) => {

        const users = await userService.getAll()

        dispatch(setUsers(users))
        console.log(users);
    }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer