import { WarningOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { quizExamStart } from "../../redux/quizSlice";

const QuizUserItem = ({ quiz }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { title, countQuiz, quizTime } = quiz;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOk = () => {
    dispatch(quizExamStart());
    setIsOpenModal(false);
    navigate(`quiz/${quiz._id}`);
    message.info("Imtihon boshlandi. Omad!");
  };

  return (
    <div className="col-4 mb-4">
      <div
        className="quiz-user-item shadow-sm h-100 cursor-pointer p-3 rounded"
        onClick={() => setIsOpenModal(true)}
      >
        <div className="quiz-user-item-brand"></div>
        <div className="quiz-item-info border-start ps-4">
          <h5>{title}</h5>
          <p>Savollar soni: {countQuiz} ta</p>
          <p>Berilgan vaqt: {quizTime} min</p>
        </div>
      </div>
      {currentUser?.accessExam ? (
        <Modal
          okText="Boshlash"
          cancelText="Bekor qilish"
          onCancel={() => {
            setIsOpenModal(false);
            message.warning("Imtihon bekor qilindi.");
          }}
          onOk={() => handleModalOk()}
          open={isOpenModal}
          title={
            <div className="text-warning d-flex align-items-center gap-2">
              <WarningOutlined />
              <span>Eslatma! Imtihon paytida...</span>
            </div>
          }
        >
          <Divider></Divider>
          <ol className="list-group ps-3">
            <li>Sahifani yangilamang!</li>
            <li>Chiqib ketmang!</li>
            <li>Boshqa bo'limlarga o'tmang.</li>
            <span className="fw-bold">
              Yuqoridagi barcha holatlarda imtihon boshidan boshlanadi va har
              gal turlicha savollar tushadi.
            </span>
            <Divider className="my-3"></Divider>
            <li>
              Agar vaqt tugab qolsa avtomatik tarzda belgilagan javoblaringiz
              tekshiriladi. Belgilamagan savollar hisobga olinmaydi!
            </li>
          </ol>
        </Modal>
      ) : (
        <Modal
          open={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          footer={false}
          title={
            <div className="text-warning d-flex align-items-center gap-2">
              <WarningOutlined />
              <span>Imtihonga ruxsat yo'q !</span>
            </div>
          }
        >
          <Button type="primary" onClick={() => setIsOpenModal(false)}>
            Tushunarli
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default QuizUserItem;
