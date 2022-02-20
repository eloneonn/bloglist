import React from 'react';
import { useDispatch } from 'react-redux';
import { like } from '../reducers/blogReducer';

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()
    
    if (!blog) {
        return null
    }

    console.log('Viewing blog:', blog);

    return (
        <div id='BlogView'>
            <h2>{blog.title} <em>by</em> {blog.author}</h2>
            <a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a> <br></br>
            {blog.likes} 
            <button onClick={() => dispatch(like(blog))} id="like-button">
                like
            </button> <br></br>
            added by {blog.user.name}
        </div>
    )
}

export default BlogView;