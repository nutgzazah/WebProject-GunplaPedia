import axios from 'axios'


export const removeTech = async (id) =>
    await axios.delete(process.env.REACT_APP_API + '/technique/' + id)

export const createTech = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/technique', data)
    
export const getDataTech = async () => {
    return await axios.get(process.env.REACT_APP_API + '/technique')
}
export const readTech = async (id) => {
    return await axios.get(process.env.REACT_APP_API + '/technique/' + id)
}
export const updateTech = async (id, data) => {
    return await axios.put(process.env.REACT_APP_API + '/technique/' + id, data)
}
