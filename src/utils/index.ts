import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: { [key: string]: unknown }) => {
  // 相当于 Object.assign({}, obj)
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isVoid(value)) {
      delete res[key];
    }
  });
  return res;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上 callback 会造成无限循环，这个和useCallback 以及 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 防抖
// delay?: number 其中 "?" 表示此参数要么不传，要么传入 number
export const useDebounce = <T>(value: T, delay?: number): T => {
  // 定义内部变量
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化以后，新设置一个定时器，delay(ms) 之后执行 setDebounceValue()
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 每次在上一个 useEffect 处理完以后再运行，清理上一次的定时器任务
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
  };
};
