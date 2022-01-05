import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";
import { Profiler } from "components/profiler";

// 使用 JS，大部分错误都是在 runtime(运行时) 的时候发现的
// 我们希望在静态代码中，就能找到其中的一些错误 -> 强类型
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  // 初始化 users
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Profiler id={"项目列表"}>
      <ScreenContainer>
        <Row marginBottom={2} between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding type={"link"} onClick={open}>
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        {error ? <ErrorBox error={error} /> : null}
        <List loading={isLoading} dataSource={list || []} users={users || []} />
      </ScreenContainer>
    </Profiler>
  );
};

ProjectListScreen.whyDidYouRender = false;
