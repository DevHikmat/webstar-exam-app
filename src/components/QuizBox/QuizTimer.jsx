import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizFinishSuccess } from "../../redux/quizSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  authUpdateStart,
  authUpdateSuccess,
  authUpdateFailure,
} from "../../redux/authSlice";
import { UserService } from "../../services/UserService";

const QuizTimer = ({ studentAnswers }) => {
  const dispatch = useDispatch();
  const { isFinished, currentQuiz } = useSelector((state) => state.quiz);
  let { currentUser } = useSelector((state) => state.auth);

  const { quizTime, questions } = currentQuiz;
  const targetTime = {
    minutes: quizTime,
    seconds: 0,
  };
  const [remainingTime, setRemainingTime] = useState(targetTime);

  // INTERVAL
  const countDown = (interval) => {
    if (
      (remainingTime.minutes === 0 && remainingTime.seconds === 0) ||
      isFinished
    ) {
      clearInterval(interval);
    } else {
      setRemainingTime((prevTime) => {
        let minutes =
          prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;
        let seconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
        return { minutes, seconds };
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => countDown(interval), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isFinished, remainingTime]);

  const handleScore = async (timer) => {
    // CALCULATE SCORE
    let correctCount = 0;
    let wrongAttemps = [];
    for (let i = 0; i < questions.length; i++) {
      if (
        studentAnswers[i] &&
        studentAnswers[i].answer === questions[i].correctAnswer
      ) {
        correctCount++;
      } else {
        wrongAttemps.push(i);
      }
    }
    dispatch(quizFinishSuccess({ correctCount, wrongAttemps }));
    clearTimeout(timer);

    // SUBMIT ANSWERS TO HISTORY
    const handleAddHistory = async () => {
      dispatch(authUpdateStart());
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const data = await response.json();
        let examResult = {
          id: uuidv4(),
          title: currentQuiz.title,
          countQuiz: currentQuiz.countQuiz,
          examMoment: moment(data.datetime).format("MMMM Do YYYY, h:mm"),
          correctCount,
        };
        currentUser = {
          ...currentUser,
          history: [...currentUser.history, examResult],
        };
        const id = localStorage.getItem("id");
        const updatedUser = await UserService.updateUser(id, currentUser);
        dispatch(authUpdateSuccess(updatedUser));
        console.log("user updated");
      } catch (error) {
        console.error("Error fetching global time:", error);
        dispatch(authUpdateFailure());
      }
    };
    handleAddHistory();
  };

  useEffect(() => {
    const timer = setTimeout(
      () => handleScore(timer),
      remainingTime.minutes * 1000 * 60
    );
    if (isFinished) handleScore(timer);
    return () => {
      clearTimeout(timer);
    };
  }, [studentAnswers, isFinished]);

  // =============== AUTO FINISH EXAM ==============

  return remainingTime.minutes === 0 && remainingTime.seconds === 0 ? (
    <div className="quiz-user-view-timer shadow text-danger">
      <i className="fa-regular fa-clock"></i>
      <div className="d-flex">
        <div className="quiz-user-view-timer-minute">00</div>:
        <div className="quiz-user-view-timer-secound">00</div>
      </div>
    </div>
  ) : (
    <div
      className={
        remainingTime.minutes >= 5
          ? "quiz-user-view-timer shadow text-success"
          : "quiz-user-view-timer shadow text-warning"
      }
    >
      <i className="fa-regular fa-clock"></i>
      <div className="d-flex">
        <div className="quiz-user-view-timer-minute">
          {remainingTime.minutes < 10
            ? `0${remainingTime.minutes}`
            : remainingTime.minutes}
        </div>
        :
        <div className="quiz-user-view-timer-secound">
          {remainingTime.seconds < 10
            ? `0${remainingTime.seconds}`
            : remainingTime.seconds}
        </div>
      </div>
    </div>
  );
};

export default QuizTimer;
