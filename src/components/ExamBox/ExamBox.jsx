import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ExamItem from "./ExamItem";
import "./Exam.scss";

const ExamBox = () => {
  const navigate = useNavigate();
  const { quiz } = useSelector((state) => state.quiz);
  const { currentUser } = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="exam-box" style={{ cursor: "pointer" }}>
      <div className="container">
        <div className="row">
          {currentUser?.role === "user"
            ? quiz?.map((item, index) => {
                return (
                  <ExamItem
                    key={index}
                    quiz={item}
                    setIsModalOpen={setIsModalOpen}
                    setTitle={setTitle}
                  />
                );
              })
            : quiz?.map((item, index) => {
                return (
                  <ExamItem
                    key={index}
                    quiz={item}
                    setIsModalOpen={setIsModalOpen}
                    setTitle={setTitle}
                  />
                );
              })}
        </div>
      </div>
      {currentUser?.role === "user" && (
        <Modal onOk={handleOk} onCancel={handleCancel} open={isModalOpen}>
          <h5>
            <i className="fa-solid fa-warning text-warning"></i> Diqqat! Ushbu
            yo'riqnomaga amal qiling.
          </h5>
          <ol className="">
            <li>Sahifani yangilamang.</li>
            <li>Sahifani yangilamang.</li>
            <li>Sahifani yangilamang.</li>
            <li>Sahifani yangilamang.</li>
            <li>Sahifani yangilamang.</li>
          </ol>
        </Modal>
      )}
    </div>
  );
};

export default ExamBox;
