// service/authservice.ts
import axiosInstance from '../interceptor/axiosInterceptor';

export interface User {
    id: number;
    role: string[];
    title_name?: string;
    name: string;
    surname: string;
    date_of_birth?: string;
    phone_number?: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export const loginservice = async (values: { email: string; password: string }) => {
  try {
    console.log('Sending login request:', values);
    
    const res = await axiosInstance.post("/login", values);
    console.log('Login API response:', res.data);
    
    // Return ข้อมูลตรงๆ จาก API
    return res.data; 
  } catch (error: any) {
    console.error('Login API error:', error);
    
    // ถ้า server ส่ง error response กลับมา
    if (error.response?.data) {
      throw new Error(error.response.data.message || "เข้าสู่ระบบล้มเหลว");
    }
    
    // ถ้าเป็น network error หรือ error อื่นๆ
    throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
  }
};




