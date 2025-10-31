import api from "./api";

const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  // const { data } = await api.post("auth/organization/login", { email, password });
  return {
    token: data.access_token,
    user: data.user,
  };
};
export default login;

export const register = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
  });
  return { data };
};
