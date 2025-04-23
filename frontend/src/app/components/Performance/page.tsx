"use client";
import React from "react";
import { Card, Statistic, Row, Col, Typography } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Table, Progress, Badge } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";

const { Title } = Typography;

const performanceData = [
  { name: "จันทร์", jobsCompleted: 12, efficiency: 80, avgTime: 15 },
  { name: "อังคาร", jobsCompleted: 18, efficiency: 85, avgTime: 12 },
  { name: "พุธ", jobsCompleted: 15, efficiency: 78, avgTime: 14 },
  { name: "พฤหัสบดี", jobsCompleted: 20, efficiency: 88, avgTime: 10 },
  { name: "ศุกร์", jobsCompleted: 22, efficiency: 90, avgTime: 9 },
  { name: "เสาร์", jobsCompleted: 10, efficiency: 70, avgTime: 20 },
];

const technicians = Array.from({ length: 14 }, (_, i) => ({
  key: i + 1,
  name: `ช่าง ${i + 1}`,
  jobsDone: Math.floor(Math.random() * 60) + 20,
  avgTime: `${Math.floor(Math.random() * 10) + 10} นาที`,
  efficiency: Math.floor(Math.random() * 40) + 60,
  status: ["ดีมาก", "ดี", "ปานกลาง", "ต่ำ"][Math.floor(Math.random() * 4)],
}));

const columns = [
  { title: "ชื่อช่าง", dataIndex: "name", key: "name" },
  { title: "งานที่ทำ", dataIndex: "jobsDone", key: "jobsDone" },
  { title: "เวลาเฉลี่ย", dataIndex: "avgTime", key: "avgTime" },
  { title: "ประสิทธิภาพ", key: "efficiency", render: (_:any, record:any) => <Progress percent={record.efficiency} status="active" /> },
  { title: "สถานะ", dataIndex: "status", key: "status", render: (status:any) => <Badge status="processing" text={status} /> },
];

export default function DashboardPerformance() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center text-blue-600">📊 Dashboard Performance - ช่าง Lab</Title>
      
      <Row gutter={16} justify="center">
        <Col span={6}><Card hoverable><Statistic title="งานที่เสร็จสิ้น" value={180} prefix={<CheckCircleOutlined style={{ color: 'green' }} />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="เวลาเฉลี่ย" value={14} suffix="นาที" prefix={<ClockCircleOutlined style={{ color: 'blue' }} />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="ข้อผิดพลาด" value={5} prefix={<ExclamationCircleOutlined style={{ color: 'red' }} />} /></Card></Col>
        <Col span={6}><Card hoverable><Statistic title="งานที่อยู่ระหว่างดำเนินการ" value={12} prefix={<SyncOutlined style={{ color: 'orange' }} />} /></Card></Col>
      </Row>
      
      <Card title="📈 กราฟประสิทธิภาพรายวัน" className="shadow-lg rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jobsCompleted" fill="#1890ff" barSize={50} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="📉 เวลาทำงานเฉลี่ยของช่าง" className="shadow-lg rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avgTime" stroke="#ff7300" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="🔧 รายละเอียดช่าง" className="shadow-lg rounded-lg">
        <Table dataSource={technicians} columns={columns} pagination={{ pageSize: 5 }} bordered />
      </Card>
    </div>
  );
}

