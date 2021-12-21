import { useEffect, useState } from "react";
// import { useMount } from "utils";

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num值: ${num}`;
    // 闭包：返回一个函数
    return function unmount() {
      // message 为自由变量，其值由定义时的值决定！
      console.log(message);
    };
  };
  return effect;
};
const add = test(); // add => 调用 test 返回的 effect
const unmount = add(); // unmount => 调用 effect 返回的 unmount 函数【定义此 unmount 时， num = 1】
add();
add();
add();
unmount(); // 调用 unmount 始终返回 num = 1

export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  // useMount(() => {
  //   setInterval(() => {
  //     console.log('num in setInterval', num)
  //   }, 1000)
  // })

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
