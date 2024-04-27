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
  return await axios.get('http://localhost:3000/api/role');
};

//create
export const AddProfile = async (Profile) => {
  console.log(Profile);
  return await axios.post('http://localhost:3000/api/profile', Profile);
};

//read
export const GetAllUser = async () => {
  return await axios.get('http://localhost:3000/api/profile');
};

//update
export const UpdateProfile = async (profile) => {
  return await axios.put('http://localhost:3000/api/profile', {
    name: profile.name,
    Role: profile.Role,
  });
};

//delete
export const DeleteProfile = async (role) => {
  const encodedrole = encodeURIComponent(role);
  return await axios.delete('http://localhost:3000/api/profile/' + encodedrole);
};
