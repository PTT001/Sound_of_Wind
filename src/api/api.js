import axios from 'axios'

//create message
export const Createmessage = async message => {
  await axios.post(import.meta.env.VITE_MESSAGE_API_URL, message)
}

//get message
export const getAllmessage = async () => {
  return await axios.get(import.meta.env.VITE_MESSAGE_API_URL)
}
