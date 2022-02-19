import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { initializeUser, logout } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    useEffect(() => {        //check if user is already logged in
        dispatch(initializeUser())
    }, [dispatch])

    const blogList = () => (
        <div id="blogList">
            {blogs.map((blog) => (
                <Blog blog={blog} key={blog.id}/>
            ))}
        </div>
    )

    return (
        <div>
            <div>
                <h1>Bloglist</h1>
                <Notification />
            </div>
            <div>
                {user === null ? (
                    <LoginForm />
                ) : (
                    <div>
                        <h2>Blogs</h2>
                        <p>
                            {user.name} logged in{' '}
                            <button onClick={() => dispatch(logout())}>logout</button>
                        </p>
                        {blogList()}
                        <BlogForm />
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
