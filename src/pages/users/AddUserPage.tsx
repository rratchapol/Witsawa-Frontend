"use client";
import { useState } from "react";
import { Button, Modal } from "antd";
import UserForm from "../../components/forms/UserForm";

export default function AddUserPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="rounded-full bg-[#22336c] hover:bg-[#1a2852] border-none"
      >
        Add User
      </Button>

      <Modal
        title="Add New User"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <UserForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
