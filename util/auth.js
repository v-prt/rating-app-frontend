import axios from 'axios'
import { API_URL } from '../constants/urls'

export const createUser = async ({ username, email, password, firstName, lastName }) => {
  const payload = { username, email, password, first_name: firstName, last_name: lastName }
  const response = await axios.post(`${API_URL}/create`, payload)
  return response
}

export const getToken = async (email, password) => {
  const payload = { email, password }
  try {
    const response = await axios.post(`${API_URL}/token`, payload)
    console.log(response)
    return response.data.access_token
  } catch (err) {
    console.log(err)
  }
}
