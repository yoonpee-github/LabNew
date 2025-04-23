"use client";
import React from "react";
import { Card, Statistic, Row, Col, Typography, Progress, Table } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Mock Data
const visitBookingData = [
  { name: "ม.ค.", visit: 85, booking: 100 },
  { name: "ก.พ.", visit: 78, booking: 90 },
  { name: "มี.ค.", visit: 92, booking: 110 },
  { name: "เม.ย.", visit: 75, booking: 95 },
  { name: "พ.ค.", visit: 88, booking: 105 },
];

const referBookingData = [
  { name: "ม.ค.", refer: 45, bookingRefer: 100 },
  { name: "ก.พ.", refer: 52, bookingRefer: 95 },
  { name: "มี.ค.", refer: 48, bookingRefer: 110 },
  { name: "เม.ย.", refer: 40, bookingRefer: 85 },
  { name: "พ.ค.", refer: 55, bookingRefer: 105 },
];

const combinedData = [
  { name: "ม.ค.", visit: 85, booking: 100, refer: 45, bookingRefer: 100 },
  { name: "ก.พ.", visit: 78, booking: 90, refer: 52, bookingRefer: 95 },
  { name: "มี.ค.", visit: 92, booking: 110, refer: 48, bookingRefer: 110 },
  { name: "เม.ย.", visit: 75, booking: 95, refer: 40, bookingRefer: 85 },
  { name: "พ.ค.", visit: 88, booking: 105, refer: 55, bookingRefer: 105 },
];

const avgVisitBooking =
  (combinedData.reduce((sum, d) => sum + d.visit / d.booking, 0) /
    combinedData.length) *
  100;
const avgReferBookingRefer =
  (combinedData.reduce((sum, d) => sum + d.refer / d.bookingRefer, 0) /
    combinedData.length) *
  100;

const pieVisitBooking = visitBookingData.map((item) => ({
  name: item.name,
  value: Math.round((item.visit / item.booking) * 100),
}));
const pieReferBooking = referBookingData.map((item) => ({
  name: item.name,
  value: Math.round((item.refer / item.bookingRefer) * 100),
}));
const pieSummary = [
  { name: "Visit / Booking", value: 80 },
  { name: "Refer / Booking Refer", value: 60 },
];
const getRandomLightColors = (count: any) =>
  Array.from({ length: count }, () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 60%)`;
  });

const COLORS = getRandomLightColors(combinedData.length);

const tableColumns = [
  { title: "เดือน", dataIndex: "name", key: "name" },
  { title: "Visit", dataIndex: "visit", key: "visit" },
  { title: "Booking", dataIndex: "booking", key: "booking" },
  {
    title: "% Visit / Booking",
    key: "visitPercent",
    render: (_: any, record: any) => (
      <Progress
        percent={Math.round((record.visit / record.booking) * 100)}
        status="active"
      />
    ),
  },
  { title: "Refer", dataIndex: "refer", key: "refer" },
  { title: "Booking Refer", dataIndex: "bookingRefer", key: "bookingRefer" },
  {
    title: "% Refer / Booking Refer",
    key: "referPercent",
    render: (_: any, record: any) => (
      <Progress
        percent={Math.round((record.refer / record.bookingRefer) * 100)}
        status="active"
      />
    ),
  },
];

const tableData = visitBookingData.map((item, index) => ({
  key: index,
  name: item.name,
  visit: item.visit,
  booking: item.booking,
  refer: referBookingData[index].refer,
  bookingRefer: referBookingData[index].bookingRefer,
}));

export default function VisitBookingDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center text-blue-600">
        📊 Visit & Booking Dashboard
      </Title>

      <Row gutter={16} justify="center">
        <Col span={8}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card hoverable className="shadow-md rounded-lg">
              <Statistic
                title="% Visit / Booking"
                value={80}
                suffix="%"
                prefix={<UserOutlined className="text-green-500" />}
              />
              <Progress percent={80} status="active" />
            </Card>
          </motion.div>
        </Col>
        <Col span={8}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card hoverable className="shadow-md rounded-lg">
              <Statistic
                title="% Refer / Booking Refer"
                value={60}
                suffix="%"
                prefix={<CalendarOutlined className="text-blue-500" />}
              />
              <Progress percent={60} status="active" />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Card
          title="📈 Visit, Booking, Refer, Booking Refer"
          className="shadow-lg rounded-lg"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="visit"
                fill="rgb(135, 227, 255)"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="booking"
                fill="rgb(22, 201, 255)"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="refer"
                fill="rgb(255, 193, 143)"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="bookingRefer"
                fill="rgb(255, 131, 29)"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
              <ReferenceLine
                y={avgVisitBooking}
                stroke="rgb(0, 102, 204)"
                strokeDasharray="3 3"
                label="Avg Visit/Booking"
              />
              <ReferenceLine
                y={avgReferBookingRefer}
                stroke="rgb(204, 102, 0)"
                strokeDasharray="3 3"
                label="Avg Refer/BookingRefer"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Card
          title="📉 Refer vs. Booking Refer"
          className="shadow-lg rounded-lg"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visit"
                stroke="rgb(135, 227, 255)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="booking"
                stroke="rgb(22, 201, 255)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="refer"
                stroke="rgb(255, 193, 143)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="bookingRefer"
                stroke="rgb(255, 131, 29)"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <Row gutter={[16, 16]} justify="center">
        <Col span={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            <Card
              title="📊 สัดส่วน Visit / Booking"
              className="shadow-lg rounded-lg"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieVisitBooking}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieVisitBooking.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        <Col span={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Card
              title="📊 สัดส่วน Refer / Booking Refer"
              className="shadow-lg rounded-lg"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieReferBooking}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieReferBooking.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        <Col span={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2 }}
          >
            <Card
              title="📊 เปรียบเทียบ Visit / Refer"
              className="shadow-lg rounded-lg"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieSummary}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieSummary.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <Title level={2} className="text-center text-blue-600">
          📊 Visit & Booking Dashboard
        </Title>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Card
            title="📋 รายละเอียดข้อมูลรายเดือน"
            className="shadow-lg rounded-lg"
          >
            <Table
              dataSource={tableData}
              columns={tableColumns}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
