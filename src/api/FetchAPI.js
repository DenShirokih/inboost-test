import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxMDA0NDkwIiwiUm9sZUlkIjoiNCIsIlBvcnRhbElkIjoiMTAyNDI0Iiwicm9sZSI6IlBvcnRhbEFkbWluIiwibmJmIjoxNjYyMDExNzcwLCJleHAiOjE2Nzc2NTAxNzAsImlhdCI6MTY2MjAxMTc3MH0.xRegVe8mVkCf8JzD5xp6g7DDHDqtwX5tK550CZTFuhk';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export const fetchAPI = async values => {
 await axios.post(
    `https://botpashatesting.inboost.ai/api/MyClients/AddNewClient `,
    values
  );
};
