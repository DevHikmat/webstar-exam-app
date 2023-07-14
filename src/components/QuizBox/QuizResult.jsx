import React from "react";
import { useSelector } from "react-redux";

const QuizResult = () => {
  const { totalScore, currentQuiz } = useSelector((state) => state.quiz);

  return (
    <div className="quiz-result">
      <div className="row">
        <div className="col-4">
          <h5 className="text-primary mb-4">Statistika</h5>
          <ul className="list-unstyled">
            <li className="text-success">
              <span className="fw-bold me-3">To'g'ri javoblar soni:</span>
              <span>{totalScore?.correctCount}</span>
            </li>
            <li className="text-danger">
              <span className="fw-bold me-3">Xato javoblar soni:</span>
              <span>{currentQuiz.countQuiz - totalScore?.correctCount}</span>
            </li>
            <li className="">
              <span className="fw-bold me-3">Umumiy to'plagan ball: </span>
              <span>
                {Math.round(
                  (totalScore?.correctCount / currentQuiz.countQuiz) * 100
                )}{" "}
                %
              </span>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <h6>Xato javob bergan savol raqamlari:</h6>
          <div>
            {totalScore?.wrongAttemps.length === 0 ? (
              <div>mavjud emas!</div>
            ) : (
              <div className="d-flex flex-wrap">
                {totalScore?.wrongAttemps.map((attemp, index) => {
                  return (
                    <span className="me-3" key={index}>
                      {attemp + 1}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="col-4">
          {Math.round(
            (totalScore?.correctCount / currentQuiz.countQuiz) * 100
          ) >= 60 ? (
            <div>
              <img
                style={{ height: "200px" }}
                src="https://media.istockphoto.com/id/1217001853/vector/approve-and-reject-medal-vector-icons.jpg?s=612x612&w=0&k=20&c=N2k2Rn5_6o37LAzvlcyPlkOedy6WBgZTRpO-6sd8T8E="
                alt="passed-image"
                className="img-fluid"
              />
            </div>
          ) : (
            <div>
              <img
                style={{ height: "200px" }}
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/education-school/failed-icon.png"
                alt="passed-image"
                className="img-fluid"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
