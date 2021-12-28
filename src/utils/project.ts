import { useQuery } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // const result = useQuery({ queryKey, queryFn, config})
  // The query will automatically update when queryKey changes.
  // 可以通过给 useQuery 指定泛型来修改默认结果的数据类型。
  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync<Project[]>();
  // Hook 使用规则1：只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
  // 处理pin值改变的函数 需要在return的标签中提交fetch请求来修改数据库，因此需要返回一个普通函数来处理
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync<Project[]>();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
