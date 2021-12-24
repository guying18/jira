import { useEffect, useRef, useState } from "react";

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
  }, [callback]);
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
  // 返回的 ref 对象在组件的整个生命周期内持续存在。
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // return 一个回调函数，这个回调函数会在页面被卸载时调用
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 重置路由并刷新页面
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回 false；反之返回 true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  // useEffect 初次调用是在 页面被加载完成后
  useEffect(() => {
    mountedRef.current = true;
    // return 被卸载时
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
