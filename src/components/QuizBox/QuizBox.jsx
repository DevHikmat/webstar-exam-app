import React from "react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import QuizAdminItem from "./QuizAdminItem";
import QuizUserItem from "./QuizUserItem";
import "./Quiz.scss";

const QuizBox = () => {
  const { quizList } = useSelector((state) => state.quiz);
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="quiz-box" style={{ cursor: "pointer" }}>
      <div className="container">
        <Divider orientation="left">Imtihonlar bo'limi</Divider>
        <div className="row">
          {currentUser?.role === "student"
            ? quizList?.map((item, index) => {
                return <QuizUserItem key={index} quiz={item} />;
              })
            : quizList?.map((item, index) => {
                return <QuizAdminItem key={index} quiz={item} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
