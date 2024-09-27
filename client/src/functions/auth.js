import axios from 'axios'


export const register = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/register', data)

export const login = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/login', data)

export const currentUser = async (authtoken) =>
    await axios.post(process.env.REACT_APP_API + '/current-user', {},{
        headers:{
            authtoken
        }
    })
    
export const currentAdmin = async (authtoken) =>
    await axios.post(process.env.REACT_APP_API + '/current-admin', {},{
        headers:{
            authtoken
        }
    })
    