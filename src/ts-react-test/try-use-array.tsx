import { useMount, useArray } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    // // 期待报错：Property 'notExist' does not exist on type '{ name: string; age: number; }[]'.
    // console.log(value.notExist);
    // // 期待报错：Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.
    // add({ name: "david" });
    // // 期待报错：Argument of type 'string' is not assignable to parameter of type 'number'.
    // removeIndex("123");
  });
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => (
        <li key={index}>
          {index}: {person.name},{person.age}
        </li>
      ))}
    </div>
  );
};
