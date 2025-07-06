import { Layout } from 'antd';
import {UserOutlined,LogoutOutlined} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import icon from '../../assets/images/icon.png';

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User List',
      onClick: () => navigate('/users'),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const selectedKey = location.pathname;

  return (
    <Sider
      width={250}
      className="fixed left-0"
      style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)',
        color: 'white',
        height: 'calc(100vh - 40px)',
        top: '40px',
        overflow: 'hidden',
        borderTopRightRadius: '24px',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-white px-6 py-8">
        <img src={icon} alt="Logo" className="inline-block mr-3 " />
      </div>

      {/* Custom Menu Items */}
      <div className="px-4 py-6">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={item.onClick}
            className={`
              relative flex items-center gap-4 px-4 py-4 mb-3 cursor-pointer transition-all duration-300 ease-in-out
              ${selectedKey === item.key 
                ? '!bg-gradient-to-r from-white to-gray-50 text-blue-700 shadow-lg transform translate-x-2' 
                : 'text-white hover:bg-white hover:bg-opacity-15 hover:transform hover:translate-x-1'
              }
            `}
            style={{
              borderRadius: selectedKey === item.key ? '50px 0 0 50px' : '25px 0 0 25px',
              marginRight: selectedKey === item.key ? '-16px' : '0',
              paddingRight: selectedKey === item.key ? '24px' : '16px',
            //   border: selectedKey === item.key ? 'none' : 'none',
            }}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
              ${selectedKey === item.key 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-white bg-opacity-20 text-white'
              }
            `}>
              <span className="text-base">{item.icon}</span>
            </div>
            <span className={`
              font-medium text-base transition-all duration-300
              ${selectedKey === item.key ? 'text-blue-700 font-semibold' : 'text-white'}
            `}>
              {item.label}
            </span>
            
            {/* Active indicator */}
            {selectedKey === item.key && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full" />
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="absolute bottom-8 left-4 right-4">
        <div 
          className="flex items-center gap-4 px-4 py-3 text-white cursor-pointer hover:bg-white hover:bg-opacity-15 rounded-xl transition-all duration-300 hover:transform hover:translate-x-1"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20">
            <LogoutOutlined className="text-sm" />
          </div>
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </Sider>
  );
}