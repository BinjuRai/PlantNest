// Replace with your backend
// import axios from "../api/api";
// const login = async (credentials) => {
//   // credentials = { email, password }
//   const response = await axios.post(`${API_URL}/auth/login`, credentials);
//   // Example response: { user: {...}, token: "..." }
//   return response.data;
// };

// const register = async (user) => {
//   const response = await axios.post(`${API_URL}/auth/register`, user);
//   return response.data;
// };

// export default { login, register };



//below is for trial


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
