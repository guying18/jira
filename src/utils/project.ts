import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useProjectSearchParams } from "screens/project-list/util";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // 获取：useQuery({ queryKey, queryFn, config})
  // queryKey: 查询键，The query will automatically update when queryKey changes.
  // 可以通过给 useQuery 指定泛型来修改默认结果的数据类型。
  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectSearchParams();
  const queryKey = ["projects", searchParams];

  // 修改：useMutation(mutationFn, { onSuccess })
  // mutationFn：执行异步任务并返回 promise 的函数。
  // invalidateQueries 方法可用于根据查询键使缓存中的单个或多个查询无效，并重新获取。
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // 使用 react-query 实现乐观更新(Optimistic Updates)
      // Mutation 一发生，onMutate 就被调用.
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return { previousItems };
      },
      // Mutation 请求出错时，调用 onError 回滚
      onError(error, newItem, context) {
        queryClient.setQueryData(
          "todos",
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 获取单个项目详情
export const useProject = (id?: number) => {
  const client = useHttp();

  // 获取：useQuery({ queryKey, queryFn, config})
  // enabled config: 值为 false 时，不发送请求
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
