import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogForm = () => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        
        dispatch(newBlog({
            title: title,
            author: author,
            url: url,
        }))

        dispatch(
            setNotification(
                `a new blog "${title}" by ${author} has been added!`,
                4
            )
        )

        blogFormRef.current.toggleVisibility()

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="blogForm">
                        <h2>Create new blog</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>title:</td>
                                    <td>
                                        <input
                                            id="title"
                                            value={title}
                                            onChange={({ target }) =>
                                                setTitle(target.value)
                                            }
                                        ></input>
                                        <br></br>
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ textAlign: 'right' }}>author:</td>
                                    <td>
                                        <input
                                            id="author"
                                            value={author}
                                            onChange={({ target }) =>
                                                setAuthor(target.value)
                                            }
                                        ></input>
                                        <br></br>
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ textAlign: 'right' }}>url:</td>
                                    <td>
                                        <input
                                            id="url"
                                            value={url}
                                            onChange={({ target }) =>
                                                setUrl(target.value)
                                            }
                                        ></input>{' '}
                                        <br></br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            type="submit"
                            id="createBlog-button"
                            style={{ marginTop: 5 }}
                        >
                        Create
                        </button>
                    </div>
                </form>
            </div>
        </Togglable>
    )
}

export default BlogForm
