import axios from 'axios'
import api from './axiosConfig'

export const getCharacterInfo = async () => {
  const res = await axios.get('/CharacterInfo.json')
  return res.data
}

export const Register = async Profile => {
  return await api.post('/register', Profile)
}

export const Login = async Profile => {
  try {
    const res = await api.post('/login', Profile)
    localStorage.setItem('rayToken', res.data.token)
    return res
  } catch (error) {
    throw error
  }
}

export const GetProfile = async () => {
  try {
    const res = await api.get('/Profile')
    return res.data
  } catch (error) {
    throw error
  }
}

export const changePassword = async newpassword => {
  try {
    const res = await api.post('/Profile', newpassword)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllUser = async () => {
  try {
    const res = await api.get('/getAllUser')
    return res.data
  } catch (error) {
    throw error
  }
}

export const uploadAvatar = async avatar => {
  try {
    return await api.post('/upload-avatar', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    throw error
  }
}

export const GetGamers = async () => {
  try {
    const res = await api.get('/gamers')
    return res.data
  } catch (error) {
    throw error
  }
}

export const SignInGamers = async Profile => {
  try {
    return await api.post('/gamers', Profile)
  } catch (error) {
    throw error
  }
}

export const DeleteGamers = async username => {
  try {
    return await api.delete(`/gamers/${username}`)
  } catch (error) {
    throw error
  }
}

export const createGameRecord = async GameRecord => {
  try {
    return await api.post('/game-records', GameRecord)
  } catch (error) {
    throw error
  }
}

export const getGameRecord = async () => {
  try {
    return await api.get('/game-records')
  } catch (error) {
    throw error
  }
}

export const createMessage = async Message => {
  try {
    return await api.post('/message', Message)
  } catch (error) {
    throw error
  }
}

export const getAllMessage = async () => {
  try {
    return await api.get('/message')
  } catch (error) {
    throw error
  }
}
