import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
// import { useState } from "react";
import { ProjectModel } from "screens/project-list/project-model";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={"/projects"}></Navigate>
          </Routes>
        </Router>
      </Main>
      <ProjectModel />
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header>
      <HeaderLeft gap={true}>
        <Button
          style={{ minWidth: "20rem" }}
          type={"link"}
          onClick={resetRoute}
        >
          Logo
        </Button>
        <ProjectPopover />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    "header header header"
    "main main main";
  height: 100vh;
  padding: 2rem;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
