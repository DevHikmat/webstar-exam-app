import React from "react";
import { Link } from "react-router-dom";

const QuizAdminItem = ({ quiz }) => {
  const { title, countQuiz, quizTime } = quiz;

  return (
    <div className="col-4 mb-4">
      <Link to={`${quiz._id}`}>
        <div className="quiz-item shadow h-100 cursor-pointer">
          <div className="quiz-item-brand"></div>
          <div className="quiz-item-info border-start ps-4">
            <h5>{title}</h5>
            <p>Savollar soni: {countQuiz} ta</p>
            <p>Berilgan vaqt: {quizTime} min</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuizAdminItem;
