import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // react 对比 state 变量时，并不是使用 ===，而是只有在显式的调用对应的 set函数(此处为 setSearchParam) 时才认为state发生变化！
  // 因此 searchParams 可以作为 useMemo 的依赖项。
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // Object.fromEntries() 方法把键值对列表 searchParams 转换为一个对象,然后解构 params 覆盖修改其属性。
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
    // const 断言，
  ] as const;
};
