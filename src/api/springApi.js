import api from './axiosConfig'

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
    const res = await api.get('/getProfile')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetCharacterInfo = async () => {
  try {
    const res = await api.get('/character')
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
