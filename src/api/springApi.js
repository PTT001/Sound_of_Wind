import api from './axiosConfig';

export const Register = async (Profile) => {
  return await api.post('/register', Profile);
};

export const Login = async (Profile) => {
  try {
    const res = await api.post('/login', Profile);
    localStorage.setItem('rayToken', res.data.token);
    return res;
  } catch (error) {}
};

export const GetProfile = async () => {
  try {
    const res = await api.get('/getProfile');
    return res.data;
  } catch (error) {}
};

export const GetCharacterInfo = async () => {
  try {
    const res = await api.get('/character');
    return res.data;
  } catch (error) {}
};

export const GetGamers = async () => {
  try {
    const res = await api.get('/gamers');
    return res.data;
  } catch (error) {}
};

export const SignInGamers = async (Profile) => {
  return await api.post('/gamers', Profile);
};
