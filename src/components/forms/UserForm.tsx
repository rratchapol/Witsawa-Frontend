"use client";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import React, { useState } from "react";
import { createUser, updateUser } from "../../services/userservice";
import { SaveModal } from "../common/modal";

const { Option } = Select;

interface UserFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

export default function UserForm({ onSuccess, initialData }: UserFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);

  const onFinish = async (values: any) => {
    // เก็บ form values และแสดง SaveModal
    const formattedValues = {
      ...values,
      role: Array.isArray(values.role) ? values.role : [values.role], // แปลง role เป็น array
      date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : null,
    };

    // ถ้าเป็น edit mode และไม่มี password ให้ลบ password fields ออก
    if (initialData && initialData.id) {
      if (!formattedValues.password) {
        delete formattedValues.password;
        delete formattedValues.password_confirmation;
      }
    }

    setFormValues(formattedValues);
    setIsSaveModalOpen(true);
  };

  const handleConfirmSave = async () => {
    if (!formValues) return;

    try {
      setLoading(true);
      setIsSaveModalOpen(false);
      
      let successTitle = "";
      let successDescription = "";

      if (initialData && initialData.id) {
        await updateUser(initialData.id, formValues);
        successTitle = "User Updated";
        successDescription = "Your changes have been saved successfully.";
      } else {
        await createUser(formValues);
        successTitle = "User Created";
        successDescription = "New user has been created successfully.";
      }

      form.resetFields();
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        message.success(successDescription);
      }, 300);
      
    } catch (error: any) {
      console.error("Form submission error:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          (initialData ? "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" : "เกิดข้อผิดพลาดในการสร้างผู้ใช้");
      message.error(errorMessage);
    } finally {
      setLoading(false);
      setFormValues(null);
    }
  };

  const handleCancelSave = () => {
    setIsSaveModalOpen(false);
    setFormValues(null);
  };

  React.useEffect(() => {
    if (initialData) {
      console.log('Setting initial data:', initialData);
      form.setFieldsValue({
        ...initialData,
        role: Array.isArray(initialData.role) ? initialData.role : [initialData.role], // แปลงเป็น array
        date_of_birth: initialData.date_of_birth ? dayjs(initialData.date_of_birth) : null,
      });
    }
  }, [initialData, form]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select at least one role!" }]}
        >
          <Select 
            mode="multiple"
            placeholder="Select Role(s)"
            maxTagCount="responsive"
          >
            <Option value="Investor">Investor</Option>
            <Option value="Entrepreneur">Entrepreneur</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title_name"
          label="Title Name"
          rules={[{ required: true, message: "Please select a title!" }]}
        >
          <Select placeholder="Select Title">
            <Option value="Mr.">Mr.</Option>
            <Option value="Mrs.">Mrs.</Option>
            <Option value="Miss">Miss</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter first name!" }]}
        >
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Surname"
          rules={[{ required: true, message: "Please enter surname!" }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>

        <Form.Item
          name="date_of_birth"
          label="Date of Birth"
          rules={[{ required: true, message: "Please select date of birth!" }]}
        >
          <DatePicker 
            className="w-full" 
            format="YYYY-MM-DD"
            placeholder="Select date of birth"
          />
        </Form.Item>

        <Form.Item name="phone_number" label="Phone Number">
          <Input placeholder="Phone number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        {/* แสดง password fields เฉพาะใน create mode */}
        {!initialData && (
          <>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="password_confirmation"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6 ">
          <Button 
            type="primary" 
            onClick={() => form.resetFields()}
            loading={loading}
            className="w-full bg-[#ffff] hover:bg-[#ffff] border-2 border-[#22336c]  rounded-full text-[#22336c]" 
            disabled={loading}
          >
            {initialData ? "Cancel" : "Cncel"}
          </Button>
        <Form.Item >
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full bg-[#22336c] hover:bg-[#1a2852] border-none rounded-full"
            disabled={loading}
          >
            {initialData ? "Update User" : "Create User"}
          </Button>
        </Form.Item>
        </div>
      </Form>

      {/* Save Confirmation Modal */}
      <SaveModal
        open={isSaveModalOpen}
        onCancel={handleCancelSave}
        onConfirm={handleConfirmSave}
        title={initialData ? "Update User?" : "Create User?"}
        description={
          initialData 
            ? "Are you sure you want to update this user information?" 
            : "Are you sure you want to create this new user?"
        }
        confirmText={initialData ? "Update" : "Create"}
        cancelText="Cancel"
        loading={loading}
      />
    </>
  );
}