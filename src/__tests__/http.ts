import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// beforeAll: establish API mocking before all tests, 代表执行所有测试之前，先来执行一下回调函数。
beforeAll(() => server.listen());
// afterEach: reset any request handlers that are declared as a part of our tests
// 每一个测试跑完以后，都重置 mock 路由。
afterEach(() => server.resetHandlers());
// afterAll: clean up once the tests are done, 所有测试跑完之后，关闭 mock 路由。
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

// 执行顺序：
// 1. 先执行 server.use，其回调函数暂不执行，
// 2. 继续执行 http 请求，
// 3. 请求被 rest.get 捕获，继而执行 rest.get 的回调函数(回调函数相当于是服务端的代码)
test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );
  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
