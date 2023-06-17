import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, Switch } from "antd";
import { UserService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, deleteUserSuccess } from "../redux/userSlice";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UsersBox = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState(null);
  const { userList } = useSelector((state) => state.users);

  const handleDeleteUser = async (id) => {
    dispatch(deleteUserStart());
    try {
      const data = await UserService.deleteUser(id);
      dispatch(deleteUserSuccess());
      toast.success(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setDataSource(
      userList
        ?.filter((user) => user.role === "student")
        .map((user, index) => {
          return { ...user, key: index + 1 };
        })
    );
  }, [userList]);

  const columns = [
    { key: "1", title: "ID", dataIndex: "key" },
    { key: "2", title: "Ism", dataIndex: "firstname" },
    { key: "3", title: "Familya", dataIndex: "lastname" },
    { key: "4", title: "E-mail", dataIndex: "email" },
    {
      key: "5",
      title: "Ruxsat",
      render: (user) => {
        return (
          <Switch
            checkedChildren="Ha"
            unCheckedChildren="Yo'q"
            defaultChecked={user.accessExam}
          />
        );
      },
    },
    {
      key: "6",
      title: "Actions",
      render: (user) => {
        return (
          <>
            <Link to={`${user._id}`}>
              <Button type="primary" icon={<EyeOutlined />}></Button>
            </Link>
            <Button className="mx-2" icon={<EditOutlined />}></Button>
            <Popconfirm
              okText="Ha"
              cancelText="Yo'q"
              title="Rostdan bu o'quvchini o'chirmoqchimisiz?"
              okType="danger"
              onConfirm={() => handleDeleteUser(user._id)}
            >
              <Button danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className="users-box">
      <Table columns={columns} dataSource={dataSource} size="small" />
    </div>
  );
};

export default UsersBox;
