import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    // Form API:
    // onFinish:	提交表单且数据验证成功后回调事件
    <Form onFinish={handleSubmit}>
      {/* Form.Item API: */}
      {/* name: 字段名，支持数组(与 handleSubmit 中的参数关联！) */}
      {/* rules:	校验规则，设置字段的校验逻辑。 */}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        {/* Button API: */}
        {/* htmlType:	设置 button 原生的 type 值，可选值请参考 HTML 标准 */}
        {/* type:	设置按钮类型	primary | ghost | dashed | link | text | default */}
        <Button htmlType={"submit"} type={"primary"}>
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};
