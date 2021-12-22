import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 从 URL 中直接得到的所有数据都是 string 类型，因此需要手动转换类型
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
