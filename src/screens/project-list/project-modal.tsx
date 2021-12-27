import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  // Drawer 抽屉:
  // visible: Drawer 是否可见, boolean; onClose: 点击遮罩层或左上角叉或取消按钮的回调
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
