import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const Navigation = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    return (
        <ul id='navigation' className="navigation">
            <li className="navigation-item"><Link to='/'>blogs</Link></li>
            <li className="navigation-item"><Link to='users'>users</Link></li>
            <li className="navigation-item" style={{ color: 'grey'}}>{user.name} logged in{' '}</li>
            <li className="navigation-item"><button onClick={() => dispatch(logout())}>logout</button></li>
        </ul>
    )
}

export default Navigation