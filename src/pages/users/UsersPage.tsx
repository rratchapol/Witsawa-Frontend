"use client";
import { UserOutlined } from "@ant-design/icons";
import UserTable from "../../components/table/UserTable";
import { useAuth } from "../../context/AuthContext";

export default function UsersPage() {
    const { user } = useAuth();
    
    // สร้างชื่อเต็มจาก user data
    const displayName = user 
        ? ` ${user.name} ${user.surname}`.trim()
        : "Guest User";

    return (
        <div className='w-full'>
            <div className="flex justify-between p-6 text-xl">
                <div className="text-2xl font-bold text-gray-800 mb-4">User List</div>
                <div className="flex items-center gap-4">
                    <UserOutlined />
                    <span className="text-gray-600">{displayName}</span>
                </div>
            </div>
      
            <UserTable />
        </div>
    );
}