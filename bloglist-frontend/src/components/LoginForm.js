import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        dispatch(login({ username: username, password: password }))

        setUsername('')
        setPassword('')
    }

    return (
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
}

export default LoginForm