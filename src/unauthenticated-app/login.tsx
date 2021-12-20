import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
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
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
