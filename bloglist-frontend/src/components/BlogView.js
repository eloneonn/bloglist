import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { like, addComment } from '../reducers/blogReducer';

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    
    if (!blog) {
        return null
    }

    const handleComment = (event) => {
        event.preventDefault()
        dispatch(addComment(blog.id, comment))
        setComment('')
    }

    return (
        <div id='BlogView'>
            <h2>{blog.title} <em>by</em> {blog.author}</h2>
            <a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a> <br></br>
            {blog.likes} 
            <button onClick={() => dispatch(like(blog))} id="like-button">
                like
            </button> <br></br>
            added by {blog.user.name}
            <h3>comments</h3>

            <input
                id='comment'
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            ></input>

            <button onClick={handleComment}>add comment</button> <br></br>


            <ul>
                {blog.comments.map(comment => (
                    <li key={comment}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogView;