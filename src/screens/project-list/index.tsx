import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "./project";
import { useUsers } from "./user";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // const [list, setList] = useState([]);

  const debounceParam = useDebounce(param, 200);

  const { isLoading, error, data: list } = useProjects(debounceParam);

  const { data: users } = useUsers();

  // const [isLoading, setIsLoading] = useState(false);

  // const [error, setError] = useState<null | Error>(null);

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
