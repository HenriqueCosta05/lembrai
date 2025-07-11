import { LoginBody, RegisterBody } from './interfaces';
import { api, removeToken } from './API';


export const login = async (params: LoginBody) => {
  const response = await api.post('/users/login', params);
  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  await removeToken();
  delete api.defaults.headers.common['Authorization'];
  return true;
};

export const resetPassword = async (userId: string, passwordDTO: any) => {
  console.log('Resetting password for user:', userId, 'with data:', passwordDTO);
  const response = await api.put(`/users/${userId}/redefinir-senha`, passwordDTO);
  return response.data;
};