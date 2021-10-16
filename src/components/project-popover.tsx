import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "screens/project-list/project";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: project, isLoading } = useProjects();
  const pinnedProjects = project?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button
        onClick={() => dispatch(projectListActions.openProjectModal())}
        style={{ padding: 0 }}
        type={"link"}
      >
        创建项目
      </Button>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
