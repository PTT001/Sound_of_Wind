import axios from 'axios';

export const RoleData = async () => {
  return await axios.get(import.meta.env.VITE_ROLE_URL);
};

//create
export const AddProfile = async (Profile) => {
  console.log(Profile);
  return await axios.post(import.meta.env.VITE_PROFILE_API_URL, Profile);
};

//read
export const GetAllUser = async () => {
  return await axios.get(import.meta.env.VITE_PROFILE_API_URL);
};

//update
export const UpdateProfile = async (profile) => {
  return await axios.put(import.meta.env.VITE_PROFILE_API_URL, {
    name: profile.name,
    Role: profile.Role,
  });
};

//delete
export const DeleteProfile = async (role) => {
  const encodedrole = encodeURIComponent(role);
  return await axios.delete(
    import.meta.env.VITE_PROFILE_API_URL + '/' + encodedrole
  );
};

//email
export const sendEmail = async (message) => {
  return await axios.post('http://localhost:3000/api/email', { message });
};

//delete all users
export const DeleteAllProfile = async () => {
  await axios.delete(import.meta.env.VITE_PROFILE_API_URL + '/deleteall');
  window.location.reload();
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
