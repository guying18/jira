import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // 返回 tuple，在组件中使用时，便于重命名，但必须按顺序调用，建议返回3个值以下时使用。
  return [
    useMemo(
      // 从 URL 中直接得到的所有数据都是 string 类型，因此需要手动转换类型
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
    // setProjectCreate({ projectCreate: '' });
    // setEditingProjectId({ editingProjectId: '' })
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  // 返回对象，在组件中使用时，则需使用 {data: user} 的形式重命名，但调用顺序不重要，建议返回多个数据时使用。
  return {
    // 从 URL 获取的数据均为 string
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
