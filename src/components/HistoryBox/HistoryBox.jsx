import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
const columns = [
  { key: "key", title: "#", dataIndex: "key" },
  { key: "exam", title: "Imtihon nomi", dataIndex: "title" },
  { key: "quizCount", title: "Savollar soni", dataIndex: "countQuiz" },
  { key: "date", title: "Topshirgan sana", dataIndex: "examMoment" },
  { key: "result", title: "Yechildi", dataIndex: "correctCount" },
  {
    key: "percent",
    title: "Natija(%)",
    render: (his) => {
      return `${Math.round((his.correctCount / his.countQuiz) * 100)}%`;
    },
  },
  {
    key: "result",
    title: "Status",
    render: (his) => {
      return Math.round((his.correctCount / his.countQuiz) * 100) >= 60 ? (
        <span className="text-success">passed</span>
      ) : (
        <span className="text-danger">failed</span>
      );
    },
  },
];

const HistoryBox = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);

  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  useEffect(() => {
    setHistory(
      reverseArr(currentUser.history).map((his, index) => {
        return { ...his, key: index + 1 };
      })
    );
  }, []);

  return (
    <div className="history-box pt-3">
      {history.length > 0 ? (
        <Table columns={columns} dataSource={history} pagination={false} />
      ) : (
        <h5>Tarix mavjud emas!</h5>
      )}
    </div>
  );
};

export default HistoryBox;
