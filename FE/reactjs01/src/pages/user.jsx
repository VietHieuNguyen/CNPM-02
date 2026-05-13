import { Alert, notification, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { TeamOutlined } from "@ant-design/icons";
import { getUserApi } from "../until/api";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (!res?.message) {
        setDataSource(Array.isArray(res) ? res : []);
        return;
      }

      notification.error({
        message: "Unauthorized",
        description: res.message,
      });
    };
    fetchUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => <Tag color={role ? "blue" : "default"}>{role || "user"}</Tag>,
    },
  ];

  return (
    <section className="page-shell users-page">
      <div className="page-title">
        <div>
          <span className="eyebrow">Quan tri</span>
          <h1>Danh sách user</h1>
          <p>Theo dõi.</p>
        </div>
        <div className="title-icon">
          <TeamOutlined />
        </div>
      </div>

      <Alert
        className="users-alert"
        type="info"
        showIcon
        message="Dữ liệu được lấy từ API /v1/api/user"
      />

      <Table
        className="users-table"
        bordered={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        scroll={{ x: 760 }}
        pagination={{ pageSize: 6 }}
      />
    </section>
  );
};

export default UserPage;
