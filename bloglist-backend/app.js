const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const User = require('./models/user')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, SECRET } = require('./utils/config')
const jwt = require('jsonwebtoken')

// TODO: Middlewaret omaan moduuliin/moduuleihin

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
    console.log('running in test mode');
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {

    try {
        const decodedToken = jwt.verify(request.token, SECRET)
        request.user = await User.findById(decodedToken.id)
    
    } catch (error) {
        next(error)
    }

    next()
}


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).send( {error: 'token missing or invalid'} )
    } 
}


mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app  
