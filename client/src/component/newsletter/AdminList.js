import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";

import { baseUrl } from "../../utils";


import ViewNewsletter from "./ViewNewsletter";
import Edit from "./Edit";

const AdminList = () => {
  const [data, setData] = useState([]);

  console.log(data);

  const getN = async () => {
    await fetch(`${baseUrl}/api/v1/newsletter/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res.newsletters);
        }
      });
  };

  useEffect(() => {
    getN();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "35%",
    },
    {
      title: "CreatedBy",
      dataIndex: ["createdBy", "name"],
      key: "CreatedBy",
      width: "35%",
    },
    {
      key: "action",
      width: "30%",
      render: (text, record) => (
        <Space>
          <ViewNewsletter n={record} />
          <Edit n={record} />
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default AdminList;