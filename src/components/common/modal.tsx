import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title = "Delete User?",
  description = "Are you sure you want to delete this user? This action cannot be undone, and the user will be unable to login.",
  confirmText = "Delete User",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      closable={false}
      className="delete-modal"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6">
          <ExclamationCircleOutlined className="text-white text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <Button
            size="large"
            onClick={onCancel}
            className="flex-1 h-12 rounded-full border-gray-300 text-gray-700 hover:border-gray-400"
          >
            {cancelText}
          </Button>
          
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            loading={loading}
            className="flex-1 h-12 rounded-full bg-orange-500 hover:!bg-orange-600 border-orange-500 hover:border-orange-600"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;


export const SaveModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title = "Save Changes?",
  description = "Do you want to save your user updates?",
  confirmText = "Save",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      closable={false}
      className="delete-modal"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6">
          <ExclamationCircleOutlined className="text-white text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <Button
            size="large"
            onClick={onCancel}
            className="flex-1 h-12 rounded-full border-gray-300 text-gray-700 hover:border-gray-400"
          >
            {cancelText}
          </Button>
          
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            loading={loading}
            className="flex-1 h-12 rounded-full bg-orange-500 hover:!bg-orange-600 border-orange-500 hover:border-orange-600"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const SuccessSaveModal: React.FC<{
  open: boolean;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
}> = ({
  open,
  onConfirm,
  title = "User Updated",
  description = "Your changes have been saved successfully.",
  confirmText = "OK",
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={500}
      closable={false}
      className="success-modal"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckOutlined className="text-white text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
          {description}
        </p>

        {/* OK Button */}
        <div className="w-full max-w-xs">
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            className="w-full h-12 rounded-full bg-green-500 hover:!bg-green-600 border-green-500 hover:!border-green-600 text-white font-medium"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};


export const SuccessDeleteModal: React.FC<{
  open: boolean;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
}> = ({
  open,
  onConfirm,
  title = "User Deleted",
  description = "User has been successfully deleted.",
  confirmText = "OK",
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={500}
      closable={false}
      className="success-modal"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckOutlined className="text-white text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
          {description}
        </p>

        {/* OK Button */}
        <div className="w-full max-w-xs">
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            className="w-full h-12 rounded-full bg-green-500 hover:!bg-green-600 border-green-500 hover:!border-green-600 text-white font-medium"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};



export const LoginFailModal: React.FC<{
  open: boolean;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
}> = ({
  open,
  onConfirm,
  title = "Login Failed",
  description = "Email or password is incorrect.",
  confirmText = "OK",
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered
      width={500}
      closable={false}
      className="error-modal"
    >
      <div className="flex flex-col items-center text-center p-6">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
          <ExclamationCircleOutlined className="text-white text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
          {description}
        </p>

        {/* OK Button */}
        <div className="w-full max-w-xs">
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            className="w-full h-12 rounded-full bg-red-500 hover:!bg-red-600 border-red-500 hover:!border-red-600 text-white font-medium"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};