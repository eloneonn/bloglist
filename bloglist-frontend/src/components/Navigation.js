import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const Navigation = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    return (
        <ul id='navigation' className="navigation">
            <Link to='/'><li><b>BLOGS</b></li></Link>
            <Link to='users'><li><b>USERS</b></li></Link>
            <li style={{ color: 'grey'}} className='noHover'>{user.name} logged in{' '}</li>
            <li onClick={() => dispatch(logout())} style={{ cursor: 'pointer'  }}><b>LOG OUT</b></li>
        </ul>
    )
}

export default Navigation