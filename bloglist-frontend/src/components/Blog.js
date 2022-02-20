import React from 'react'

const Blog = (props) => {
    const blog = props.blog

    return (
        <div className="blog">
            {blog.title} - {blog.author}{' '}
        </div>
    )
}

export default Blog
