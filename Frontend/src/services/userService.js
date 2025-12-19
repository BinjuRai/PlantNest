

import axios from "../api/api";

// export const loginUserApi = async (credentials) => {
//   const response = await axios.post("/auth/login", credentials);
//   return response.data;
// };
export const loginUserApi = (data) => {
  return axios.post(
    "http://localhost:5050/api/auth/login",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const registerUserApi = async (user) => {
  const response = await axios.post("/auth/register", user);
  return response.data;
};

export const loginAdminApi = (data) => {
  return axios.post(
    "http://localhost:5050/api/admin/login", // admin login endpoint
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
