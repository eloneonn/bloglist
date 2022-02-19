import React from "react";


const UserView = () => {

    //! VAIN TESTAUKSEEN
    const user = {
        username: "saarsa",
        name: "Sami Saari",
        blogs: [
            {
                "title": "One, Two, You-Know-What-To-Do",
                "author": "Sami Saari",
                "url": "www.samisaari.fi",
                "likes": 42,
                "id": "61c09f60dee8eb5231f47599"
            },
            {
                "title": "Jazzpoikien iltasatu",
                "author": "Sami Saari",
                "url": "www.samisaari.fi",
                "likes": 117,
                "id": "61c09f75dee8eb5231f4759d"
            }
        ],
        id: "61c09f3adee8eb5231f47594"
    }

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