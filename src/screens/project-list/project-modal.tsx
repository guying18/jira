import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  // Drawer 抽屉:
  // visible: Drawer 是否可见, boolean; onClose: 点击遮罩层或左上角叉或取消按钮的回调
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
