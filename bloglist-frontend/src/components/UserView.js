import React from "react";


const UserView = ({ user }) => {

    if (!user) {
        return null
    }

    console.log('Viewing user:', user);

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(b => (
                    <li key={b.id}>{b.title}</li>
                ))}  
            </ul>
        </div>
    )
}

export default UserView