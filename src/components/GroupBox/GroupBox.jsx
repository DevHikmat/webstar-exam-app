import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Table,
  Popconfirm,
  Select,
} from "antd";
import { GroupService } from "../../services/GroupService";
import {
  addGroupStart,
  addGroupSuccess,
  deleteGroup,
  updateGroupStart,
  updateGroupSuccess,
} from "../../redux/groupSlice";
import "./GroupBox.scss";

const { Option } = Select;

const GroupsBox = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.groups);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [editingRow, setEditingRow] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let group = form.getFieldsValue();
    if (!group.name || !group.company) return;
    setIsModalOpen(false);
    dispatch(addGroupStart());
    try {
      const data = await GroupService.addGroup(group);
      dispatch(addGroupSuccess());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    form.setFieldsValue({
      name: "",
      company: "",
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteGroup = async (id) => {
    try {
      const data = await GroupService.deleteGroupById(id);
      dispatch(deleteGroup());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDataSource(
      groups?.map((item, index) => ({
        ...item,
        key: index + 1,
      }))
    );
  }, [groups]);

  const openInputs = (group) => {
    setEditingRow(group._id);
    form.setFieldsValue({
      editName: group.name,
      editCompany: group.company,
    });
  };

  const saveChanges = async () => {
    dispatch(updateGroupStart());
    let { editName, editCompany } = form.getFieldsValue();
    let group = { name: editName, company: editCompany };
    try {
      const data = await GroupService.updateGroup(editingRow, group);
      console.log(data);
      dispatch(updateGroupSuccess());
      toast.success(data.message);
      setEditingRow(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const groupColumns = [
    { key: "1", title: "#", render: (group) => <>{group.key}</> },
    {
      key: "2",
      title: "Guruh nomi",
      render: (group) => {
        if (group._id === editingRow) {
          return (
            <Form.Item name="editName" className="mb-0">
              <Input />
            </Form.Item>
          );
        } else return <p className="m-0">{group.name}</p>;
      },
    },
    {
      key: "3",
      title: "Kompaniya nomi",
      render: (group) => {
        if (group._id === editingRow) {
          return (
            <Form.Item name="editCompany" className="mb-0">
              <Select>
                <Option value="Webstar">Webstar</Option>
                <Option value="Mars">Mars</Option>
                <Option value="Merit">Merit</Option>
              </Select>
            </Form.Item>
          );
        } else return <p className="m-0">{group.company}</p>;
      },
    },
    {
      key: "4",
      title: "Actions",
      render: (group) => {
        return (
          <>
            {group._id === editingRow ? (
              <Button icon={<CheckOutlined />} onClick={saveChanges}></Button>
            ) : (
              <Button
                icon={<EditOutlined />}
                onClick={() => openInputs(group)}
              ></Button>
            )}
            <Popconfirm
              title="Guruh o'chirilsinmi?"
              okText="Ha"
              cancelText="Yo'q"
              okType="danger"
              onConfirm={() => handleDeleteGroup(group._id)}
            >
              <Button
                danger
                className="ms-2"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className="group-box">
      <div className="row">
        <div className="col-12">
          <Button
            onClick={showModal}
            className="d-flex align-items-center gap-2 mb-4"
            icon={<PlusOutlined />}
          >
            Guruh qo'shish
          </Button>
          <Modal
            footer={false}
            title="Guruh malumotlarini kiriting"
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <Form
              className="mt-4"
              form={form}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                label="Guruh nomi:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Iltimos guruh nomini kiriting",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="company"
                label="Kompaniya:"
                rules={[
                  {
                    required: true,
                    message: "Iltimos kompaniyani tanlang",
                  },
                ]}
              >
                <Select defaultValue={"Tanlash uchun bosing"}>
                  <Option value="Webstar">Webstar</Option>
                  <Option value="Mars">Mars</Option>
                  <Option value="Merit">Merit</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={9}></Col>
                  <Button
                    onClick={handleOk}
                    htmlType="submit"
                    type="primary"
                    className="mt-1"
                  >
                    Yaratish
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="col-12">
          <Form form={form}>
            <Table
              size="small"
              pagination={{ defaultPageSize: 5 }}
              columns={groupColumns}
              dataSource={dataSource}
            ></Table>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GroupsBox;
