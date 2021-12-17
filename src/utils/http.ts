import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

// 因为下面 useHttp 中封装此函数时对两个参数进行了解构，因此参数不允许可选；但可以给参数设置默认值，则参数自动变成可选的
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      // HTTP协议中的 Authorization 请求消息头含有服务器用于验证用户代理身份的凭证，
      // 通常会在服务器返回401 Unauthorized 状态码以及WWW-Authenticate 消息头之后在后续请求中发送此消息头。
      // Bearer authentication (also called token authentication) is an HTTP authentication scheme。
      Authorization: token ? `Bearer ${token} ` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // customConfig 的值会覆盖上述值，因此此处并未写死 method
    ...customConfig,
  };

  // fetch 采用 GET 请求时，查询字符串是拼接到 URL 后面的，POST 请求时，数据是作为第二个参数传入的
  if (config.method.toUpperCase() === "GET") {
    endpoint += `${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未获取到 token 时
      if (response.status === 401) {
        // 登出页面
        await auth.logout();
        // 刷新页面
        window.location.reload();
        // 抛出错误
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json();
      // 请求成功时，返回 data，否则抛出错误
      // (注意：fetch()发出请求以后，只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。)
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// 定义 useHttp Hook, 返回一个函数，自动传入 token
export const useHttp = () => {
  const { user } = useAuth();
  // 采用 Parameters<typeof http> 定义参数 [endpoint, config] 这个 tuple 的类型，
  // 其中 typeof http 获取 http 函数的参数类型
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
