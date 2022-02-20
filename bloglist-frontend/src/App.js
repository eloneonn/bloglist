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
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogView from './components/BlogView'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {        //check if user is already logged in
        dispatch(initializeUser())
    }, [dispatch])

    const userMatch = useMatch('/users/:id')
    const blogMatch = useMatch('/blogs/:id')

    const userToShow = userMatch
        ? users.find(u => u.id === userMatch.params.id)
        : null

    const blogToShow = blogMatch
        ? blogs.find(u => u.id === blogMatch.params.id)
        : null


    // TODO Kirjautuminen routerilla ja siistiminen

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

                    <div> 
                        <Link to='/'>blogs</Link>
                        <Link to='users'>users</Link>
                    </div>

                    <Routes>
                        <Route path='/' element={<div><BlogList /> <BlogForm /></div>} />
                        <Route path='users' element={<UserList />}/>
                        <Route path='users/:id' element={<UserView user={userToShow}/>} /> 
                        <Route path='blogs/:id' element={<BlogView blog={blogToShow}/>} />                       
                    </Routes>
                </div>

            )}
        </div>
    )
}

export default App
