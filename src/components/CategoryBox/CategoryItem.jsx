import { Card } from "antd";
import React from "react";
import { IconFinder } from "../../utils/IconFinder";

const { Meta } = Card;

const CategoryItem = ({ cat }) => {
  return (
    <div className="col-3">
      <div className="category-box-item">
        <Card
          hoverable
          style={{
            width: 240,
            marginBottom: "30px",
          }}
          cover={<i className={IconFinder(cat.name)}></i>}
        >
          <Meta title={cat.name} />
        </Card>
      </div>
    </div>
  );
};

export default CategoryItem;
