import React from "react";

const ExamItem = ({ quiz, setIsModalOpen, setTitle }) => {
  const { title, countQuiz, quizTime } = quiz;

  return (
    <div className="col-4 mb-4">
      <div
        className="exam-item shadow h-100 cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
          setTitle(title);
        }}
      >
        <div className="exam-item-brand">
          {/* <i className={`${icon}`}></i> */}
        </div>
        <div className="exam-item-info border-start ps-4">
          <h5>{title}</h5>
          <p>Savollar soni: {countQuiz} ta</p>
          <p>Berilgan vaqt: {quizTime} min</p>
          {/* <p>Minimal o'tish: {t} ta</p> */}
        </div>
      </div>
    </div>
  );
};

export default ExamItem;
