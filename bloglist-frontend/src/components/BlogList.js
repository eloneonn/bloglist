import React from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <div id="blogList">
            {blogs.map((blog) => (
                <Blog blog={blog} key={blog.id}/>
            ))}
        </div>
    )
}

export default BlogList