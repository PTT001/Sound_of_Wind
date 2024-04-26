import axios from 'axios';

export const RoleData = async () => {
  return await axios.get('http://localhost:3000/api/role');
};

//
export const GetAllUser = async () => {
  return await axios.get('http://localhost:3000/api/profile');
};

export const AddProfile = async Profile => {
  console.log(Profile);
  return await axios.post('http://localhost:3000/api/profile', Profile);
};
