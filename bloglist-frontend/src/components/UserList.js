import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch]);

    // TODO listan päivittyimen realtime

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList