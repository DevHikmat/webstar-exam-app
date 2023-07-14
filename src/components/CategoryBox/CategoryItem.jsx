import { Button, Card } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { CategoryService } from "../../services/CategoryService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  deleteCategoryStart,
  deleteCategorySuccess,
} from "../../redux/categorySlice";

const { Meta } = Card;

const CategoryItem = ({ cat }) => {
  const [tempId, setTempId] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.category);

  const handleDeleteCategory = async (id) => {
    setTempId(id);
    dispatch(deleteCategoryStart());
    try {
      const data = await CategoryService.deleteCategory(id);
      dispatch(deleteCategorySuccess());
      toast.success(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="col-3">
      <div className="category-box-item">
        <Link to={`category/${cat._id}`}>
          <Card
            hoverable
            style={{
              width: 240,
              marginBottom: "30px",
            }}
            cover={
              <img
                alt="category image"
                style={{ height: "180px", objectFit: "cover" }}
                src={cat.image?.url}
              ></img>
            }
          >
            <Meta title={cat.name} />
          </Card>
        </Link>
        <Button
          loading={isLoading && tempId === cat._id}
          className="delete-category-btn"
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteCategory(cat._id)}
        ></Button>
      </div>
    </div>
  );
};

export default CategoryItem;
