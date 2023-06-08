import React from "react";
import { Link } from "react-router-dom";

const ExamItem = ({ quiz }) => {
  const { id, title, icon, length, deadline, time } = quiz;
  return (
    <div className="col-4 mb-4">
      <Link to={`${title.toLowerCase()}`}>
        <div className="exam-item shadow-sm h-100">
          <div className="exam-item-brand">
            <i className={`${icon}`}></i>
          </div>
          <div className="exam-item-info border-start ps-4">
            <h5>{title}</h5>
            <p>Savollar soni: {length} ta</p>
            <p>Berilgan vaqt: {time} min</p>
            <p>Minimal o'tish: {deadline} ta</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExamItem;
