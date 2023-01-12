import axios from 'axios'
import { API_URL } from '../constants/urls'

export const createUser = async ({ username, email, password, firstName, lastName }) => {
  const payload = { username, email, password, first_name: firstName, last_name: lastName }
  try {
    const response = await axios.post(`${API_URL}/users`, payload)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}

export const getToken = async (email, password) => {
  const payload = { email, password }
  try {
    const response = await axios.post(`${API_URL}/token`, payload)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}

export const verifyToken = async token => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const response = await axios.get(`${API_URL}/status`, config)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}
