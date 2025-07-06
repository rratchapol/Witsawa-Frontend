// ใช้จาก antd
import { Spin } from 'antd';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
}
