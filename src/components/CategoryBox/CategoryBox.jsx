import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import "./Category.scss";
import { Button, Select } from "antd";
import { MinusOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import {
  createCategoryStart,
  createCategorySuccess,
} from "../../redux/categorySlice";
import { CategoryService } from "../../services/CategoryService";
import { toast } from "react-toastify";

const CategoryBox = () => {
  const dispatch = useDispatch();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { category, isLoading } = useSelector((state) => state.category);
  const [catName, setCatName] = useState(null);

  const handleChange = (value) => {
    setCatName(value);
  };

  const handleCreateCategory = async () => {
    if (!catName) return toast.warn("Iltimos kategoriyani tanlang!");
    dispatch(createCategoryStart());
    try {
      let formData = new FormData();
      formData.append("name", catName);
      const data = await CategoryService.createCategory(formData);
      dispatch(createCategorySuccess());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="category-box">
      <div className="category-box-actions d-flex">
        <Button
          style={{ width: "250px" }}
          className="d-flex align-items-center justify-content-center"
          icon={isCreateOpen ? <MinusOutlined /> : <PlusOutlined />}
          onClick={() => setIsCreateOpen(!isCreateOpen)}
        >
          {isCreateOpen ? "Bekor qilish" : "Yangi kategoriya yaratish"}
        </Button>
        {isCreateOpen && (
          <>
            <div className="hide-menu ms-5">
              <Select
                defaultValue={""}
                style={{ width: "180px" }}
                onChange={handleChange}
              >
                <Select.Option style={{ display: "none" }} value="">
                  Kategoriya tanlash
                </Select.Option>
                {category?.map((cat, index) => {
                  return (
                    <Select.Option key={index} value={cat.name}>
                      {cat.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <Button
              loading={isLoading}
              className="ms-2 d-flex align-items-center"
              icon={<SendOutlined />}
              onClick={handleCreateCategory}
            >
              saqlash
            </Button>
          </>
        )}
      </div>
      <hr />
      <div className="row pt-3">
        {category?.map((cat, index) => {
          return <CategoryItem key={index} cat={cat} />;
        })}
      </div>
    </div>
  );
};

export default CategoryBox;
