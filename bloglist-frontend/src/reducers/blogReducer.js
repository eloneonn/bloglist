import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addLike(state, action) {
            const mappedState = state.map(object => object.id !== action.payload.id ? object : action.payload)

            return mappedState.sort(function(a, b){return b.likes - a.likes})
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload.sort(function(a, b){return b.likes - a.likes})
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch(setBlogs(blogs))
    }
}

export const like = (blog) => {
    return async dispatch => {
        const likedObj = {...blog}
        likedObj.likes++

        dispatch(addLike(likedObj))

        await blogService.update(likedObj.id, likedObj)
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        await blogService.comment(id, comment)

        dispatch(initializeBlogs())
    }
}

export const newBlog = (blog) => {
    return async dispatch => {
        const newObj = await blogService.create(blog)

        dispatch(appendBlog(newObj))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)

        dispatch(setNotification(`Blog "${blog.title}" by ${blog.author} has been removed`, 4))
        dispatch(initializeBlogs())
    }
}


export const { addLike, appendBlog, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer