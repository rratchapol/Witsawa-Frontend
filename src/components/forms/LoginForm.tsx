import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface LoginFormProps {
    onLogin: (values: { email: string; password: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [form] = Form.useForm();

    const handleSubmit = (values: { email: string; password: string }) => {
        onLogin(values);
    };

    return (
        <div className="w-full">
            <Title level={2} className="!mb-8 !text-4xl !font-bold text-[#22336c]">Login</Title>
            <Form
                form={form}
                name="login"
                onFinish={handleSubmit}
                autoComplete="off"
                layout="vertical"
                className="space-y-2"
            >
                <Form.Item
                    label={<span className="font-semibold text-[#22336c]">Email</span>}
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Email"
                        size="large"
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="font-semibold text-[#22336c]">Password</span>}
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                        className="rounded-md"
                    />
                </Form.Item>

                <Form.Item className="!mt-7 flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="w-full rounded-full bg-[#22336c] hover:bg-[#1a2852] border-none item-center"
                        style={{ height: 35 , width: 200}}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}