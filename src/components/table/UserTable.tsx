"use client";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Dropdown,
  message,
  type MenuProps,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DashOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import UserForm from "../forms/UserForm";
import DeleteModal, { SuccessSaveModal, SuccessDeleteModal } from "../common/modal";
import { getUserss, getUsersbyId, deleteUser, type User } from "../../services/userservice";

const { Option } = Select;

const UserTable = () => {
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  
  // เพิ่ม state สำหรับ delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // เพิ่ม state สำหรับ success modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    description: ""
  });

  // เพิ่ม function สำหรับ refresh data
  const fetchUsers = async () => {
    try {
      const users = await getUserss(role, searchText);
      setData(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchText, role]);

  const handleEdit = async (user: User) => {
    try {
      setLoadingUserData(true);
      setIsModalOpen(true);
      
      // เรียกใช้ getUsersbyId เพื่อดึงข้อมูลล่าสุด
      const fullUserData = await getUsersbyId(user.id);
      console.log('Full user data:', fullUserData);
      
      setEditingUser(fullUserData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      
      // ถ้า API fail ให้ใช้ข้อมูลจาก table
      setEditingUser(user);
    } finally {
      setLoadingUserData(false);
    }
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await deleteUser(userToDelete.id);
      
      fetchUsers();
      
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      
      setTimeout(() => {
        setIsSuccessDeleteModalOpen(true);
      }, 300);
      
    } catch (error) {
      console.error('Delete user error:', error);
      message.error("ไม่สามารถลบผู้ใช้ได้");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const getActionMenu = (user: User): MenuProps => ({
    items: [
      {
        key: 'edit',
        label: (
          <div className="w-full px-4 py-2 hover:bg-purple-200 flex items-center gap-2 transition-colors">
            <EditOutlined className="text-purple-600" />
            <span className="text-gray-800 font-medium">Edit</span>
          </div>
        ),
        onClick: () => handleEdit(user),
      },
      {
        type: 'divider',
      },
      {
        key: 'delete',
        label: (
          <div className="flex items-center gap-3 px-2 py-2">
            <DeleteOutlined className="text-red-500" />
            <span className="text-red-600 font-medium">Delete</span>
          </div>
        ),
        onClick: () => handleDelete(user),
      },
    ],
  });

  const columns: ColumnsType<User> = [
    {
      title: "No.",
      key: "index",
      render: (_text, _record, index) => index + 1,
      width: 60,
      align: 'center',
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => `${record.name} ${record.surname}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (roles: string[]) => {
        if (Array.isArray(roles)) {
          return roles.join(', ');
        }
        return roles;
      },
    },
    {
      title: "Phone no.",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={getActionMenu(record)}
          trigger={['click']}
          placement="bottomRight"
          overlayStyle={{ minWidth: 200 }} 
        >
          <Button 
            type="text" 
            icon={<DashOutlined />}
            className="hover:bg-gray-100 rounded-full"
            size="small"
          />
        </Dropdown>
      ),
      width: 100,
      align: 'center',
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setLoadingUserData(false);
    // Refresh data หลังปิด modal
    fetchUsers();
  };

  const handleFormSuccess = (action: 'create' | 'update') => {
    // ปิด form modal ก่อน
    setIsModalOpen(false);
    setEditingUser(null);
    setLoadingUserData(false);
    
    // Refresh data
    fetchUsers();
    
    setTimeout(() => {
      setSuccessMessage({
        title: action === 'update' ? "User Updated" : "User Created",
        description: action === 'update' 
          ? "Your changes have been saved successfully." 
          : "New user has been created successfully."
      });
      setIsSuccessModalOpen(true);
    }, 300);
  };

  const handleSuccessOk = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSuccessDeleteOk = () => {
    setIsSuccessDeleteModalOpen(false);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 rounded-xl">
      {/* Filter & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex gap-2 w-full lg:w-auto">
          <Select
            placeholder="Investor / Entrepreneur"
            onChange={setRole}
            value={role}
            allowClear
            style={{ width: 200 }}
            className="rounded-full"
          >
            <Option value="">All Roles</Option>
            <Option value="Investor">Investor</Option>
            <Option value="Entrepreneur">Entrepreneur</Option>
          </Select>

          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            className="rounded-full"
          />
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            type="primary"
            className="rounded-full px-6 bg-[#22336c] hover:bg-[#1a2852] border-none"
          >
            Search
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="rounded-full px-6 bg-[#22336c] hover:bg-[#1a2852] border-none"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
          }}
          bordered={false}
          scroll={{ x: 800 }}
          className="custom-table"
        />
      </div>

      {/* Edit/Add User Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        {loadingUserData ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg">Loading user data...</div>
          </div>
        ) : (
          <UserForm 
            initialData={editingUser} 
            onSuccess={() => handleFormSuccess(editingUser ? 'update' : 'create')} 
          />
        )}
      </Modal>

      {/* Delete User Modal */}
      <DeleteModal
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />

      {/* Success Save Modal */}
      <SuccessSaveModal
        open={isSuccessModalOpen}
        onConfirm={handleSuccessOk}
        title={successMessage.title}
        description={successMessage.description}
        confirmText="OK"
      />

      {/* Success Delete Modal */}
      <SuccessDeleteModal
        open={isSuccessDeleteModalOpen}
        onConfirm={handleSuccessDeleteOk}
        title="User Deleted"
        description="User has been successfully deleted."
        confirmText="OK"
      />
    </div>
  );
};

export default UserTable;