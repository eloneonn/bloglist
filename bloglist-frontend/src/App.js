import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => (state.blogs))

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        //check if user is already logged in
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)

            dispatch(initializeBlogs())
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)

            console.log('User logged in:', user)
            setUsername('')
            setPassword('')
            dispatch(initializeBlogs())
            dispatch(setNotification('login succesful!', 4))
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 4))
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        dispatch(setNotification('logged out!', 4))
    }

    // rendering components

    const loginForm = () => (
        <form onSubmit={handleLogin} autoComplete="off">
            <div>
                <h2>Log in to application</h2>
                Username: <br></br>
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                ></input>
                <br></br>
                Password: <br></br>
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                ></input>
                <br></br>
            </div>
            <br></br>
            <button type="submit">login</button>
        </form>
    )

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
                    loginForm()
                ) : (
                    <div>
                        <h2>Blogs</h2>
                        <p>
                            {user.name} logged in{' '}
                            <button onClick={handleLogout}>logout</button>
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
