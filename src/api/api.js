import axios from 'axios';

//email
export const sendEmail = async (message) => {
  return await axios.post('http://localhost:3000/api/email', { message });
};

//create Record
export const CreateRecord = async (Record) => {
  await axios.post(import.meta.env.VITE_Record_API_URL, Record);
};

//get record
export const GetRecord = async () => {
  return await axios.get(import.meta.env.VITE_Record_API_URL);
};

//create message
export const Createmessage = async (message) => {
  await axios.post(import.meta.env.VITE_MESSAGE_API_URL, message);
};

//get message
export const getAllmessage = async () => {
  return await axios.get(import.meta.env.VITE_MESSAGE_API_URL);
};

export const getCharacterInfo = async () => {
  const res = await axios.get('/CharacterInfo.json');
  return res.data;
};
