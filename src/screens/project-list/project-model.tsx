import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModel = () => {
  const dispatch = useDispatch();
  const projectModelOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModelOpen}
      width="100%"
    >
      <h1>Project Model</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
};
