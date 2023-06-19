import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./Exam.scss";
import ExamItem from "./ExamItem";
import { useDispatch, useSelector } from "react-redux";
import { getQuizStart, getQuizSuccess } from "../../redux/quizSlice";
import { QuizService } from "../../services/QuizService";
import { toast } from "react-toastify";
// const quizs = [
//   {
//     id: 1,
//     title: "Html5",
//     icon: "fa-brands fa-html5",
//     length: 10,
//     deadline: 8,
//     time: 10,
//   },
//   {
//     id: 2,
//     title: "Css3",
//     icon: "fa-brands fa-css3",
//     length: 20,
//     deadline: 14,
//     time: 20,
//   },
//   {
//     id: 3,
//     title: "JavaScript simple",
//     icon: "fa-brands fa-square-js",
//     length: 20,
//     deadline: 14,
//     time: 20,
//   },
//   {
//     id: 4,
//     title: "JavaScript medium",
//     icon: "fa-brands fa-js",
//     length: 20,
//     deadline: 14,
//     time: 25,
//   },
//   {
//     id: 5,
//     title: "React Js",
//     icon: "fa-brands fa-react",
//     length: 20,
//     deadline: 14,
//     time: 30,
//   },
// ];

const ExamBox = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const { quiz } = useSelector((state) => state.quiz);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAllQuiz = async () => {
    dispach(getQuizStart());
    try {
      const data = await QuizService.getAllQuiz();
      dispach(getQuizSuccess(data.quizzes));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    handleAllQuiz();
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`${title.replace(" ", "-").toLowerCase()}`);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="exam-box" style={{ cursor: "pointer" }}>
      <div className="container">
        <div className="row">
          {quiz?.map((item, index) => {
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
    </div>
  );
};

export default ExamBox;
