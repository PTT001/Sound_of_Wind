import axios from 'axios';

// export const RoleData = async () => {
//   return await axios.get('https://sound-of-wind-server.onrender.com/api/role');
// };

// export const GetAllUser = async () => {
//   return await axios.get(
//     'https://sound-of-wind-server.onrender.com/api/profile'
//   );
// };

// //create
// export const AddProfile = async (Profile) => {
//   console.log(Profile);
//   return await axios.post(
//     'https://sound-of-wind-server.onrender.com/api/profile',
//     Profile
//   );
// };

// //update
// export const UpdateProfile = async (profile) => {
//   console.log(profile);
//   return await axios.put(
//     'https://sound-of-wind-server.onrender.com/api/profile',
//     profile
//   );
// };

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
