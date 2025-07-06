import LoginForm from '../../components/forms/LoginForm';
import bg1 from '../../assets/images/bg1.png';
import bg2 from '../../assets/images/bg2.png';
import icon from '../../assets/images/icon.png';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();


    // const handleLogin = async (values: { username: string; password: string }) => {
    //     localStorage.setItem('token', '1234567890');
    //     console.log('Login successful:', values);
        
    // };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
        {/* bg1 เต็มจอ */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* bg2 ครึ่งซ้าย */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-10 rounded-r-3xl"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Content */}
        <div className="relative z-20 flex w-full h-full">
          {/* ซ้าย: ฟอร์ม */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-sm px-6">
              <LoginForm onLogin={login} />
            </div>
          </div>
          {/* ขวา: โลโก้/ข้อความ */}
          <div className="hidden md:flex w-1/2 items-center justify-center">
            {/* โลโก้/ข้อความ */}
            <img src={icon} alt="icon" className="w-1/2" />
          </div>
        </div>
      </div>
    );
}