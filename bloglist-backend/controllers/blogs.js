const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
    response.json(await Blog.find({}).populate('user', { blogs: 0 }))
})

blogsRouter.post('', async (request, response, next) => {
    const user = request.user
    console.log(user);

    if (!request.token || !user._id) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })

    if(request.body.hasOwnProperty('title') && request.body.hasOwnProperty('url')) {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)

        await User.findByIdAndUpdate(user._id, user)
//        await user.save() aiheuttaa validaatiovirheen. findByIdAndUpdate() toimii vaikkei ehkä ole paras ratkaisu

        response.status(201).json(savedBlog.toJSON())
    } else {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const newBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    response.json(await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }))
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token || !request.user.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === request.user.id.toString() ) {
        await Blog.findByIdAndRemove(request.params.id)

        /**  TODO poistetun blogin id:n poisto käyttäjä-olion blogs-listalta
        
        const newBlogs = request.user.blogs.filter(b => b.toString !== request.params.id)
        
        request.user.blogs = newBlogs
        request.user.save()
         */

    } else {
        response.status(401).end()
    }

    response.status(204).end()
})

module.exports = blogsRouter