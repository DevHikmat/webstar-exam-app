import React from "react";
import "./Exam.scss";
import ExamItem from "./ExamItem";
const quizs = [
  {
    id: 1,
    title: "Html5",
    icon: "fa-brands fa-html5",
    length: 10,
    deadline: 8,
    time: 10,
  },
  {
    id: 2,
    title: "Css",
    icon: "fa-brands fa-css3",
    length: 20,
    deadline: 14,
    time: 20,
  },
  {
    id: 3,
    title: "JavaScript 1 simple",
    icon: "fa-brands fa-square-js",
    length: 20,
    deadline: 14,
    time: 20,
  },
  {
    id: 4,
    title: "JavaScript 2 medium",
    icon: "fa-brands fa-js",
    length: 20,
    deadline: 14,
    time: 25,
  },
  {
    id: 5,
    title: "React Js",
    icon: "fa-brands fa-react",
    length: 20,
    deadline: 14,
    time: 30,
  },
];

const ExamBox = () => {
  return (
    <div className="exam-box">
      <div className="container">
        <div className="row">
          {quizs.map((item) => {
            return <ExamItem quiz={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamBox;
