import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

// defaultState: 模拟 useAsync 的返回值
const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  // renderHook: 用于渲染 Hook
  // 语法：function renderHook(callback: (props?: any) => any, options?: RenderHookOptions): RenderHookResult
  // renderHook 返回值 result: { all: Array<any>, current: any, error: Error }
  const { result } = renderHook(() => useAsync());
  // current 反映传入 renderHook 中的任何 Hook return 的最新值。
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);

  const resolvedValue = { mockValue: "resolved" };
  // 在编写 UI 测试时，可以将渲染、用户事件或数据获取等任务视为与用户界面交互的“单元”。
  // react-dom/test-utils 提供了一个名为 act() 的 helper，它确保在进行任何断言之前，与这些“单元”相关的所有更新都已处理并应用于 DOM.
  // act(() => {
  //   // 渲染组件
  // });
  // // 进行断言
  await act(async () => {
    resolve(resolvedValue); // promise 变成 resolve 状态
    await p;
  });
  expect(result.current).toEqual({ ...successState, data: resolvedValue });
});
