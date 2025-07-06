// service/userservice.ts
import axiosInstance from '../interceptor/axiosInterceptor';

export interface User {
  id: number;
  role: string[]; 
  title_name: string; 
  name: string;
  surname: string;
  date_of_birth?: string;
  phone_number?: string; 
  email: string;
  created_at?: string;
  updated_at?: string;
}




export const createUser = async (user: User): Promise<User> => {
  try{
    const res = await axiosInstance.post('/users', user);
    return res.data;
  }catch(error){
    throw error;
  }
};


export const getUserss = async (role?: string, search?: string): Promise<User[]> => {
  try {
    const params = {
      role: role ?? '',    // ถ้า undefined ให้เป็นค่าว่าง
      search: search ?? '', // ถ้า undefined ให้เป็นค่าว่าง
    };
    const res = await axiosInstance.get('users', { params });
    return res.data;
  } catch (error) {
    throw error; 
  }
};


export const getUsersbyId = async (id: string | number): Promise<User> => {
  try{
    const res = await axiosInstance.get('users/' + id);
    return res.data;
  }catch(error){
    throw error;
  }
};

export const updateUser = async (id: string | number, user: User): Promise<User> => {
  try{
    const res = await axiosInstance.put('users/' + id, user);
    return res.data;
  }catch(error){
    throw error;
  }
};

export const deleteUser = async (id: string | number): Promise<void> => {
  try{
    await axiosInstance.delete('users/' + id);
  }catch(error){
    throw error;
  }
}
