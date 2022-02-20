import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Blog from "./Blog"

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <div id="blogList">
            {blogs.map((blog) => (
                <Link to={`/blogs/${blog.id}`} key={blog.id} style={{ textDecoration: 'none'}}><Blog blog={blog} /></Link>
            ))}
        </div>
    )
}

export default BlogList