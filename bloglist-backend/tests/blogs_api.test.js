const { application } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const login = async() => {
    const loginResponse = await api
        .post('/api/login')
        .send({
                "username": "testik",
                "password": "asdasdasd"
            })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

        return "bearer " + loginResponse.body.token
}

describe('Blog formatting and functionality', () => {
    test('blogs are returned as json', async () => {
        const token = await login()
        await api
          .get('/api/blogs')
          .set('Authorization', token)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })

    test('there are correct number of blogs', async () => {
        const token = await login()

        const response = await api.get('/api/blogs').set('Authorization', token)

    
        expect(response.body).toHaveLength(2)
    })
        test('the first blog is by Onni', async () => {
        const token = await login()

        const response = await api.get('/api/blogs').set('Authorization', token)
    
        expect(response.body[0].author).toBe('Onni Elonen')
    })

    test('id field is correctly formatted', async () => {
        const token = await login()

        const response = await api.get('/api/blogs').set('Authorization', token)
    
        expect(response.body[0].id).toBeDefined()
    })
    
    test('can add new blog', async () => {
        const token = await login()

        await api.post('/api/blogs')
            .send({
                "title": "Testin testing 123",
                "author": "Supertest",
                "url": "www.supertest.com",
                "likes": 100
            })
            .set('Authorization', token)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201)
        })
    
    test('default value for field likes is 0', async () => {
        const token = await login()

        await api.post('/api/blogs')
        .send({
            "title": "Likes testing",
            "author": "Testman",
            "url": "www.likesisbydefaultzero.com"
        })
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    
        const response = await api.get('/api/blogs').set('Authorization', token)
    
        expect(response.body[response.body.length - 1].likes).toBe(0)
    
    })
    
    test('HTTP POST returns status code 400 if title or url fields empty', async () => {
        const token = await login()

        await api.post('/api/blogs')
        .send({
            "author": "This shouldn't work",
            "likes": 1
        })
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
    })

    test('Returns 401 if not logged in', async () => {
        await api.post('/api/blogs')
        .send({
            "title": "Testin testing 123",
            "author": "Supertest",
            "url": "www.supertest.com",
            "likes": 100
        })
        .set('Authorization', "lol")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(401)

    })


})

describe('User validation', () => {
    test('Cannot create user without defining username', async () => {
        await api.post('/api/users')
        .send({
            "username" : "",
            "name": "Tester Testington",
            "password": "testerspassword"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
    })
    
    test('Cannot create user with a username that is too short', async () => {
        await api.post('/api/users')
        .send({
            "username" : "te",
            "name": "Tester Testington",
            "password": "testerspassword"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
    })
    
    test('Cannot create user without defining a password', async () => {
        await api.post('/api/users')
        .send({
            "username" : "testte",
            "name": "Tester Testington",
            "password": ""
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
    })

    test('Cannot create user with a password that is too short', async () => {
        await api.post('/api/users')
        .send({
            "username" : "testte",
            "name": "Tester Testington",
            "password": "e"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
    })
}) 


afterAll(() => {
  mongoose.connection.close()
})
