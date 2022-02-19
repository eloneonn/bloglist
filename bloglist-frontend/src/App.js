import React, { useEffect } from 'react'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { initializeUser, logout } from './reducers/userReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserView from './components/UserView'
//import { Route, Link, Routes } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {        //check if user is already logged in
        dispatch(initializeUser())
    }, [dispatch])

    return (
        <div>
            <h1>Bloglist</h1>
            <Notification />
            {user === null ? (
                <LoginForm />
            ) : (
                <div>
                    <h2>Blogs</h2>
                    <p>
                        {user.name} logged in{' '}
                        <button onClick={() => dispatch(logout())}>logout</button>
                    </p>
                    <UserList />
                    <UserView />
                    <BlogList />
                    <BlogForm />
                </div>
            )}
        </div>
    )
}

export default App
