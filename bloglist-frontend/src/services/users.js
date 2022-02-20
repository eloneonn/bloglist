import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    const config = {
        headers: { Authorization: user.token },
    }

    return axios.get(baseUrl, config).then((response) => response.data)
}


const exportedObject = {
    getAll
}

export default exportedObject
