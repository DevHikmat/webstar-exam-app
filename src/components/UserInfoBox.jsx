import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Switch, Button, Popconfirm, Image } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UserService } from "../services/UserService";
import "./UserInfoBox.scss";

const UserInfoBox = () => {
  const [viewUser, setViewUser] = useState(null);
  const { id } = useParams();

  const getViewUser = async () => {
    try {
      const data = await UserService.getOneUser(id);
      setViewUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getViewUser();
  }, [id]);
  return (
    <div className="user-info-box">
      <div className="row">
        <div className="col-4">
          <div className="d-flex flex-wrap gap-3">
            {viewUser?.profilePicture ? (
              <Image
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                src={viewUser.profilePicture}
              />
            ) : (
              <Avatar shape="square" size={100} icon={<UserOutlined />} />
            )}
            <div className="d-flex flex-column h-100 pt-3">
              <h4 className="mb-0">
                {viewUser?.firstname} {viewUser?.lastname}
              </h4>
              <p style={{ color: "#909090" }}>{viewUser?.email}</p>
            </div>
          </div>
        </div>
        <div className="col border-start">
          <div className="d-flex justify-content-around">
            <div className="d-flex pt-3 align-items-start flex-column h-100">
              <h5>Imtihonga ruxsat</h5>
              <Switch
                checkedChildren="Ha"
                unCheckedChildren="Yo'q"
                defaultChecked={viewUser?.accessExam}
              />
            </div>
            <Popconfirm
              title="Rostdanham bu o'quvchi o'chirilsinmi?"
              okText="ha"
              cancelText="yo'q"
              okType="danger"
            >
              <Button className="mt-3" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;
