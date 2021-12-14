import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";

// 使用 JS，大部分错误都是在 runtime(运行时) 的时候发现的
// 我们希望在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  // 初始化 users
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
