import { User } from "./search-panel";
import { Button, Dropdown, Table, TableProps, Menu } from "antd";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "./project";
// import dayjs from "dayjs";

export interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checkd={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checkd={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <Button
                        type={"link"}
                        onClick={() => props.setProjectModalOpen(true)}
                      >
                        编辑
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button style={{ padding: 0 }} type={"link"}>
                  ...
                </Button>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
