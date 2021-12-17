import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organizition: string;
}
interface ListProps {
  list: Project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  // Table API:
  // pagination:	分页器，设为 false 时不展示和进行分页
  // columns:	表格列的配置描述，ColumnsType[]
  // dataSource:	数据数组
  return (
    <Table
      pagination={false}
      columns={[
        {
          // title:	列头显示文字
          title: "名称",
          // dataIndex:	列数据在数据项中对应的路径，支持通过数组查询嵌套路径
          dataIndex: "name",
          // sorter: 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          // render: 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引.
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};
