import axios from 'axios'

const baseUrl = '/api/users'

const loggedUserJSON = window.localStorage.getItem('loggedUser')
const user = JSON.parse(loggedUserJSON)

const getAll = () => {
    const config = {
        headers: { Authorization: user.token },
    }

    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
}


const exportedObject = {
    getAll
}

export default exportedObject
