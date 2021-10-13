import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();

  const handleSubmit = ({
    cpassword,
    ...value
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== value.password) {
      onError(new Error("请确认两次密码相同"));
      return;
    }

    register(value).catch(onError);
  };

  return (
    <Form action="" onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "please input name" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "please confirm password" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
