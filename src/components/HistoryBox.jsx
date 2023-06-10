import React from "react";
import { Table } from "antd";

const dataSource = [
  {
    id: 1,
    title: "Html 5",
    date: "08-06-2023",
    count: "20",
    correct: "18",
    total: "o'tdi",
  },
  {
    id: 2,
    title: "Css 3",
    date: "08-06-2023",
    count: "20",
    correct: "12",
    total: "o'tmadi",
  },
  {
    id: 3,
    title: "Html 5",
    date: "08-06-2023",
    count: "20",
    correct: "19",
    total: "o'tdi",
  },
];

const columns = [
  { key: "key", title: "#", dataIndex: "id" },
  { key: "exam", title: "Imtihon turi", dataIndex: "title" },
  { key: "date", title: "Topshirilgan sana", dataIndex: "date" },
  { key: "result", title: "Savollar soni", dataIndex: "count" },
  { key: "result", title: "To'g'ri javoblar", dataIndex: "correct" },
  { key: "total", title: "Natija", dataIndex: "total" },
];

const HistoryBox = () => {
  return (
    <div className="history-box">
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default HistoryBox;
