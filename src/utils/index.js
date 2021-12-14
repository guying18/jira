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
