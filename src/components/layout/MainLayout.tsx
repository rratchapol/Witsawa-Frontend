import { Layout } from 'antd';
import Sidebar from './Sidebar';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full overflow-auto fixed inset-0 min-h-screen w-screen bg-gradient-to-r from-white to-[#DEE3FF]">
      <Layout className="relative z-[1] min-h-screen bg-transparent">
        <Layout className="bg-transparent mt-[40px]">
          <Sidebar />
          <Layout className="ml-[250px] bg-transparent">
            <Content className="p-6 bg-transparent min-h-[calc(100vh-40px)] overflow-auto">
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
