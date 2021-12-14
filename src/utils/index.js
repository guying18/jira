import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj) => {
  // 相当于 Object.assign({}, obj)
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isFalsy(value)) {
      delete res[key];
    }
  });
  return res;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖
export const useDebounce = (value, delay) => {
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
