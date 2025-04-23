"use client";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axiosInstance from "@/app/utils/axios";
import { Button, Card, Typography, Spin, message, Select, Steps } from "antd";
import {
  ScanOutlined,
  StopOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const QRScanner: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<any>(null);
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [productionStatus, setProductionStatus] = useState<string[]>([]);
  let scanner: Html5QrcodeScanner | null = null;

  interface StepData {
    title: string;
    status: any;
  }

  const username: any = localStorage.getItem("username");

  const stepsStatus: StepData[] = [
    { title: "รอช่างมารับงาน", status: "รอช่างมารับงาน" },
    { title: "ช่างรับงานแล้ว", status: "ช่างรับงานแล้ว" },
    { title: "แลปได้รับงานแล้ว", status: "แลปได้รับงานแล้ว" },
    { title: "กระบวนการดัดลวด", status: "กระบวนการดัดลวด" },
    { title: "กระบวนการโรยผง", status: "กระบวนการโรยผง" },
    { title: "กระบวนการกอชิ้นงาน", status: "กระบวนการกอชิ้นงาน" },
    { title: "กระบวนการขัดชิ้นงาน", status: "กระบวนการขัดชิ้นงาน" },
    { title: "กระบวนการทำงานใส", status: "กระบวนการทำงานใส" },
    { title: "งานเสร็จแล้วรอส่ง", status: "งานเสร็จแล้วรอส่ง" },
    { title: "งานมาถึงสาขาแล้ว", status: "งานมาถึงสาขาแล้ว" },
    { title: "ลูกค้ารับงานแล้ว", status: "ลูกค้ารับงานแล้ว" },
    { title: "แก้งาน", status: "แก้งาน" },
  ];

  const updateStepsBasedOnPrdName = (prd_name: string) => {
    if (
      prd_name.includes("พิมพ์ retainer - ลวด") ||
      prd_name.includes("งานแก้ รีเทนเนอร์ ลวด(พิมพ์)")
    ) {
      return [
        { title: "รอช่างมารับงาน", status: "รอช่างมารับงาน" },
        { title: "ช่างรับงานแล้ว", status: "ช่างรับงานแล้ว" },
        { title: "แลปได้รับงานแล้ว", status: "แลปได้รับงานแล้ว" },
        { title: "กระบวนการดัดลวด", status: "กระบวนการดัดลวด" },
        { title: "กระบวนการโรยผง", status: "กระบวนการโรยผง" },
        { title: "กระบวนการกอชิ้นงาน", status: "กระบวนการกอชิ้นงาน" },
        { title: "กระบวนการขัดชิ้นงาน", status: "กระบวนการขัดชิ้นงาน" },
        { title: "งานเสร็จแล้วรอส่ง", status: "งานเสร็จแล้วรอส่ง" },
        { title: "งานมาถึงสาขาแล้ว", status: "งานมาถึงสาขาแล้ว" },
        { title: "ลูกค้ารับงานแล้ว", status: "ลูกค้ารับงานแล้ว" },
        { title: "แก้งาน", status: "แก้งาน" },
      ];
    }

    if (
      prd_name.includes("สแกน retainer - ลวด") ||
      prd_name.includes("งานแก้ รีเทนเนอร์ ลวด(สแกน)")
    ) {
      return [
        { title: "รอช่างมารับงาน", status: "รอช่างมารับงาน" },
        { title: "แลปได้รับงานแล้ว", status: "แลปได้รับงานแล้ว" },
        { title: "กระบวนการดัดลวด", status: "กระบวนการดัดลวด" },
        { title: "กระบวนการโรยผง", status: "กระบวนการโรยผง" },
        { title: "กระบวนการกอชิ้นงาน", status: "กระบวนการกอชิ้นงาน" },
        { title: "กระบวนการขัดชิ้นงาน", status: "กระบวนการขัดชิ้นงาน" },
        { title: "งานเสร็จแล้วรอส่ง", status: "งานเสร็จแล้วรอส่ง" },
        { title: "งานมาถึงสาขาแล้ว", status: "งานมาถึงสาขาแล้ว" },
        { title: "ลูกค้ารับงานแล้ว", status: "ลูกค้ารับงานแล้ว" },
        { title: "แก้งาน", status: "แก้งาน" },
      ];
    }

    if (
      prd_name.includes("พิมพ์ retainer - ใส") ||
      prd_name.includes("งานแก้ รีเทนเนอร์ ใส(พิมพ์)") ||
      prd_name.includes("ทำ tray ฟอกสีฟัน")
    ) {
      return [
        { title: "รอช่างมารับงาน", status: "รอช่างมารับงาน" },
        { title: "ช่างรับงานแล้ว", status: "ช่างรับงานแล้ว" },
        { title: "แลปได้รับงานแล้ว", status: "แลปได้รับงานแล้ว" },
        { title: "กระบวนการทำงานใส", status: "กระบวนการทำงานใส" },
        { title: "งานเสร็จแล้วรอส่ง", status: "งานเสร็จแล้วรอส่ง" },
        { title: "งานมาถึงสาขาแล้ว", status: "งานมาถึงสาขาแล้ว" },
        { title: "ลูกค้ารับงานแล้ว", status: "ลูกค้ารับงานแล้ว" },
        { title: "แก้งาน", status: "แก้งาน" },
      ];
    }

    if (
      prd_name.includes("สแกน retainer - ใส") ||
      prd_name.includes("งานแก้ รีเทนเนอร์ ใส(สแกน)")
    ) {
      return [
        { title: "รอช่างมารับงาน", status: "รอช่างมารับงาน" },
        { title: "แลปได้รับงานแล้ว", status: "แลปได้รับงานแล้ว" },
        { title: "กระบวนการทำงานใส", status: "กระบวนการทำงานใส" },
        { title: "งานเสร็จแล้วรอส่ง", status: "งานเสร็จแล้วรอส่ง" },
        { title: "งานมาถึงสาขาแล้ว", status: "งานมาถึงสาขาแล้ว" },
        { title: "ลูกค้ารับงานแล้ว", status: "ลูกค้ารับงานแล้ว" },
        { title: "แก้งาน", status: "แก้งาน" },
      ];
    }
    return stepsStatus;
  };

  const mapStatus = (status: string) => {
    if (status === "ลูกค้ารับงานแล้ว") {
      return productionStatus.includes("ลูกค้ารับงานแล้ว") ? "process" : "wait";
    }
    if (status === "แก้งาน") {
      return productionStatus.includes("แก้งาน") ? "error" : "wait";
    }
    if (productionStatus.includes(status)) return "finish";
    return "wait";
  };

  useEffect(() => {
    if (scanning) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(
        async (decodedText) => {
          console.log("QR Code Decoded:", decodedText);

          setQrData(decodedText);
          setScanning(false);
          scanner?.clear();
          try {
            setLoading(true);
            console.log("Fetching item info with item_id:", decodedText);

            const response = await axiosInstance.get("/commons/get_ptinfo", {
              params: { item_id: decodedText },
            });

            console.log("Response from /commons/get_ptinfo:", response.data);
            setItemInfo(response.data);
            setStatusUpdated(false);
            message.success("ดึงข้อมูลสำเร็จ!");

            const productionResponse: any = await axiosInstance.get(
              "/commons/get_ptinfo2",
              { params: { item_id: decodedText } }
            );

            console.log(
              "Response from /commons/get_ptinfo2:",
              productionResponse.data
            );

            const statusData = productionResponse.data[0]?.status_data;
            console.log("Extracted status_data:", statusData);

            setProductionStatus(statusData ? statusData.split(",") : []);
          } catch (error) {
            console.error("Error fetching item info:", error);
            setItemInfo(null);
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
          } finally {
            setLoading(false);
          }
        },
        (errorMessage) => {
          console.error("QR Scan Error:", errorMessage);
        }
      );
    }
    return () => {
      console.log("Clearing scanner...");
      scanner?.clear();
    };
  }, [scanning]);

  const handleStatusInsert = async () => {
    const username: any = localStorage.getItem("username");
    let status_data = "";

    if (
      [
        "RA",
        "AR",
        "SA",
        "AS",
        "ON",
        "UD",
        "NW",
        "CW",
        "R2",
        "LB",
        "BK",
        "SQ",
        "BN",
        "PK",
        "RS",
        "FS",
        "T3",
        "BP",
        "NT",
        "PP",
      ].includes(username)
    ) {
      if (itemInfo[0]?.status_data === "งานมาถึงสาขาแล้ว") {
        if (!selectedStatus) {
          message.warning("กรุณาเลือกสถานะก่อนอัปเดต");
          return;
        }
        status_data = selectedStatus;
      } else if (itemInfo[0]?.status_data === "งานเสร็จแล้วรอส่ง") {
        status_data = "งานมาถึงสาขาแล้ว";
      } else if (itemInfo[0]?.status_data === "รอช่างมารับงาน") {
        status_data = "ช่างรับงานแล้ว";
      } else {
        status_data = "รอช่างมารับงาน";
      }
    } else if (["Adminlab1", "Adminlab2", "Adminlab3"].includes(username)) {
      status_data =
        itemInfo[0]?.status_data === "กระบวนการขัดชิ้นงาน" ||
        itemInfo[0]?.status_data === "กระบวนการทำงานใส"
          ? "งานเสร็จแล้วรอส่ง"
          : "แลปได้รับงานแล้ว";
    } else if (
      ["Station1(jub)", "Station1(gap)", "Station1(ane)"].includes(username)
    ) {
      if (
        itemInfo[0]?.status_data === "แลปได้รับงานแล้ว" ||
        itemInfo[0]?.status_data === "กระบวนการทำงานใส"
      ) {
        status_data = "กระบวนการดัดลวด";
      } else {
        message.warning("ข้ามขั้นตอน กรุณาทำตามขั้นตอนการทำงาน");
        return;
      }
    } else if (
      ["Station2(an)", "Station2(pang)", "Station2(fluke)"].includes(username)
    ) {
      if (
        itemInfo[0]?.status_data === "กระบวนการดัดลวด" ||
        itemInfo[0]?.status_data === "กระบวนการทำงานใส"
      ) {
        status_data = "กระบวนการโรยผง";
      } else {
        message.warning("ข้ามขั้นตอน กรุณาทำตามขั้นตอนการทำงาน");
        return;
      }
    } else if (
      ["Station3(boom)", "Station3(dow)", "Station3(ear)"].includes(username)
    ) {
      if (
        itemInfo[0]?.status_data === "กระบวนการโรยผง" ||
        itemInfo[0]?.status_data === "กระบวนการทำงานใส"
      ) {
        status_data = "กระบวนการกอชิ้นงาน";
      } else {
        message.warning("ข้ามขั้นตอน กรุณาทำตามขั้นตอนการทำงาน");
        return;
      }
    } else if (
      ["Station4(boom)", "Station4(dow)", "Station4(ear)"].includes(username)
    ) {
      if (
        itemInfo[0]?.status_data === "กระบวนการกอชิ้นงาน" ||
        itemInfo[0]?.status_data === "กระบวนการทำงานใส"
      ) {
        status_data = "กระบวนการขัดชิ้นงาน";
      } else {
        message.warning("ข้ามขั้นตอน กรุณาทำตามขั้นตอนการทำงาน");
        return;
      }
    } else if (["Station5(mind)", "Station5(alli)"].includes(username)) {
      if (
        itemInfo[0]?.status_data === "กระบวนการดัดลวด" ||
        itemInfo[0]?.status_data === "กระบวนการโรยผง" ||
        itemInfo[0]?.status_data === "กระบวนการกอชิ้นงาน" ||
        itemInfo[0]?.status_data === "กระบวนการขัดชิ้นงาน" ||
        itemInfo[0]?.status_data === "แลปได้รับงานแล้ว"
      ) {
        status_data = "กระบวนการทำงานใส";
      } else {
        message.warning("ข้ามขั้นตอน กรุณาทำตามขั้นตอนการทำงาน");
        return;
      }
    } else if (username === "Chanatip") {
      status_data = "งานดี";
    } else {
      message.warning("ไม่สามารถระบุสถานะได้");
      return;
    }

    const author_status = username;
    if (itemInfo && itemInfo.length > 0) {
      const item_id = itemInfo[0].item_id;
      try {
        await axiosInstance.post("/commons/post_status_QR", {
          item_id,
          status_data,
          author_status,
        });
        message.success("อัปเดตสถานะสำเร็จ!");
        const response = await axiosInstance.get("/commons/get_ptinfo", {
          params: { item_id },
        });
        console.log("Response from /commons/get_ptinfo:", response.data);
        const productionResponse: any = await axiosInstance.get(
          "/commons/get_ptinfo2",
          { params: { item_id } }
        );
        console.log(
          "Response from /commons/get_ptinfo2:",
          productionResponse.data
        );
        const statusData = productionResponse.data[0]?.status_data;
        console.log("Extracted status_data:", statusData);

        setProductionStatus(statusData ? statusData.split(",") : []);
        setItemInfo(response.data);
        setStatusUpdated(true);
        setSelectedStatus("");
      } catch (error) {
        message.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
      }
    }
  };

  const currentStepsStatus = itemInfo
    ? updateStepsBasedOnPrdName(itemInfo[0].prd_name)
    : stepsStatus;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <Title level={2}>QR Code Scanner</Title>

      {!scanning ? (
        <Button type="primary" onClick={() => setScanning(true)}>
          <ScanOutlined />
          Start Scan
        </Button>
      ) : (
        <Button danger onClick={() => setScanning(false)}>
          <StopOutlined />
          Stop Scan
        </Button>
      )}

      {scanning && (
        <div
          id="reader"
          style={{ width: "300px", height: "300px", marginTop: "10px" }}
        ></div>
      )}

      {qrData && (
        <Card style={{ marginTop: "20px" }}>
          <Title level={4}>Scanned QR Code :</Title>
          <Text>{qrData}</Text>
        </Card>
      )}

      {loading ? (
        <Spin size="large" style={{ display: "block", marginTop: "20px" }} />
      ) : (
        itemInfo &&
        itemInfo.length > 0 && (
          <Card style={{ marginTop: "20px" }}>
            <Title level={4}>Item Info :</Title>
            <p>
              <Text strong>Item ID :</Text> {itemInfo[0].item_id ?? "N/A"}
            </p>
            <p>
              <Text strong>รายชื่อลูกค้า :</Text> {itemInfo[0].Name ?? "N/A"}
            </p>
            <p>
              <Text strong>หัตถการ :</Text> {itemInfo[0].prd_name ?? "N/A"}
            </p>
            <p>
              <Text strong>วันที่นัดลูกค้า :</Text>{" "}
              {itemInfo[0].date_of_book
                ? new Date(itemInfo[0].date_of_book).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
            <p>
              <Text strong>จำนวนชิ้นงาน :</Text> {itemInfo[0].item_qty ?? "N/A"}
            </p>
            <p>
              <Text strong>สาขา :</Text> {itemInfo[0].brc_sname ?? "N/A"}
            </p>
            <p>
              <Text strong>สถานะการผลิต :</Text>{" "}
              {itemInfo[0]?.status_data ?? "N/A"}
              {itemInfo[0]?.status_data === "งานมาถึงสาขาแล้ว" && (
                <div style={{ marginTop: "10px" }}>
                  <Text strong>เลือกสถานะ :</Text>{" "}
                  <Select
                    value={selectedStatus}
                    onChange={(value) => setSelectedStatus(value)}
                    style={{ width: "200px", marginLeft: "10px" }}
                  >
                    <Option value="ลูกค้ารับงานแล้ว">ลูกค้ารับงานแล้ว</Option>
                    <Option value="แก้งาน">แก้งาน</Option>
                  </Select>
                </div>
              )}
            </p>
            <p>
              <Text strong>วันที่งานเสร็จ :</Text>{" "}
              {itemInfo[0].finish_date
                ? new Date(itemInfo[0].finish_date).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
            <p>
              <Text strong>ฟันบน-ฟันล่าง :</Text>{" "}
              {itemInfo[0].qty_data ?? "N/A"}
            </p>
            <Title level={5}>Production Progress</Title>
            {/* <Steps
              current={productionStatus ? productionStatus.length - 1 : 0}
              direction="vertical"
              progressDot
            >
              {currentStepsStatus.map((step, index) => (
                <Step
                  key={index}
                  title={step.title}
                  description={
                    productionStatus.includes(step.status)
                      ? "Completed"
                      : "Pending"
                  }
                />
              ))}
            </Steps> */}
            <Steps current={productionStatus.length} direction="vertical">
              {currentStepsStatus.map((step, index) => (
                <Step
                  key={index}
                  title={step.title}
                  status={mapStatus(step.status)}
                />
              ))}
            </Steps>
            {!statusUpdated &&
              !(
                ([
                  "RA",
                  "AR",
                  "SA",
                  "AS",
                  "ON",
                  "UD",
                  "NW",
                  "CW",
                  "R2",
                  "LB",
                  "BK",
                  "SQ",
                  "BN",
                  "PK",
                  "RS",
                  "FS",
                  "T3",
                  "BP",
                  "NT",
                  "PP",
                ].includes(username) &&
                  (itemInfo[0]?.status_data === "ช่างรับงานแล้ว" ||
                    itemInfo[0]?.status_data === "แลปได้รับงานแล้ว" ||
                    itemInfo[0]?.status_data === "กระบวนการดัดลวด" ||
                    itemInfo[0]?.status_data === "กระบวนการโรยผง" ||
                    itemInfo[0]?.status_data === "กระบวนการกอชิ้นงาน" ||
                    itemInfo[0]?.status_data === "กระบวนการขัดชิ้นงาน" ||
                    itemInfo[0]?.status_data === "กระบวนการทำงานใส" ||
                    itemInfo[0]?.status_data === "ลูกค้ารับงานแล้ว" ||
                    itemInfo[0]?.status_data === "แก้งาน" ||
                    (itemInfo[0]?.status_data === "รอช่างมารับงาน" &&
                      itemInfo[0].prd_name === "สแกน retainer - ใส") ||
                    (itemInfo[0]?.status_data === "รอช่างมารับงาน" &&
                      itemInfo[0].prd_name === "สแกน retainer - ลวด") ||
                    (itemInfo[0]?.status_data === "รอช่างมารับงาน" &&
                      itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)") ||
                    (itemInfo[0]?.status_data === "รอช่างมารับงาน" &&
                      itemInfo[0].prd_name ===
                        "งานแก้ รีเทนเนอร์ ลวด(สแกน)"))) ||
                (["Adminlab1", "Adminlab2", "Adminlab3"].includes(username) &&
                  itemInfo[0]?.status_data !== "ช่างรับงานแล้ว" &&
                  itemInfo[0]?.status_data !== "กระบวนการขัดชิ้นงาน" &&
                  itemInfo[0]?.status_data !== "กระบวนการทำงานใส" &&
                  !(
                    (itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)" &&
                      itemInfo[0]?.status_data === "รอช่างมารับงาน") ||
                    (itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ลวด(สแกน)" &&
                      itemInfo[0]?.status_data === "รอช่างมารับงาน")
                  )) ||
                (["Station1(jub)", "Station1(gap)", "Station1(ane)"].includes(
                  username
                ) &&
                  ((itemInfo[0]?.status_data !== "แลปได้รับงานแล้ว" &&
                    itemInfo[0]?.status_data !== "กระบวนการทำงานใส") ||
                    itemInfo[0].prd_name === "พิมพ์ retainer - ใส" ||
                    itemInfo[0].prd_name === "สแกน retainer - ใส" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(พิมพ์)" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)" ||
                    itemInfo[0].prd_name === "ทำ tray ฟอกสีฟัน")) ||
                (["Station2(an)", "Station2(pang)", "Station2(fluke)"].includes(
                  username
                ) &&
                  ((itemInfo[0]?.status_data !== "กระบวนการดัดลวด" &&
                    itemInfo[0]?.status_data !== "กระบวนการทำงานใส") ||
                    itemInfo[0].prd_name === "พิมพ์ retainer - ใส" ||
                    itemInfo[0].prd_name === "สแกน retainer - ใส" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(พิมพ์)" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)" ||
                    itemInfo[0].prd_name === "ทำ tray ฟอกสีฟัน")) ||
                (["Station3(boom)", "Station3(dow)", "Station3(ear)"].includes(
                  username
                ) &&
                  ((itemInfo[0]?.status_data !== "กระบวนการโรยผง" &&
                    itemInfo[0]?.status_data !== "กระบวนการทำงานใส") ||
                    itemInfo[0].prd_name === "พิมพ์ retainer - ใส" ||
                    itemInfo[0].prd_name === "สแกน retainer - ใส" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(พิมพ์)" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)" ||
                    itemInfo[0].prd_name === "ทำ tray ฟอกสีฟัน")) ||
                (["Station4(boom)", "Station4(dow)", "Station4(ear)"].includes(
                  username
                ) &&
                  ((itemInfo[0]?.status_data !== "กระบวนการกอชิ้นงาน" &&
                    itemInfo[0]?.status_data !== "กระบวนการทำงานใส") ||
                    itemInfo[0].prd_name === "พิมพ์ retainer - ใส" ||
                    itemInfo[0].prd_name === "สแกน retainer - ใส" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(พิมพ์)" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ใส(สแกน)" ||
                    itemInfo[0].prd_name === "ทำ tray ฟอกสีฟัน")) ||
                (["Station5(mind)", "Station5(alli)"].includes(username) &&
                  (itemInfo[0]?.status_data === "รอช่างมารับงาน" ||
                    itemInfo[0]?.status_data === "ช่างรับงานแล้ว" ||
                    itemInfo[0]?.status_data === "กระบวนการทำงานใส" ||
                    itemInfo[0]?.status_data === "งานเสร็จแล้วรอส่ง" ||
                    itemInfo[0]?.status_data === "งานมาถึงสาขาแล้ว" ||
                    itemInfo[0]?.status_data === "ลูกค้ารับงานแล้ว" ||
                    itemInfo[0]?.status_data === "แก้งาน" ||
                    itemInfo[0].prd_name === "พิมพ์ retainer - ลวด" ||
                    itemInfo[0].prd_name === "สแกน retainer - ลวด" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ลวด(พิมพ์)" ||
                    itemInfo[0].prd_name === "งานแก้ รีเทนเนอร์ ลวด(สแกน)"))
              ) && (
                <Button
                  type="primary"
                  onClick={handleStatusInsert}
                  style={{ marginTop: "10px" }}
                >
                  <FileDoneOutlined />
                  Update Status
                </Button>
              )}
          </Card>
        )
      )}
    </div>
  );
};

export default QRScanner;
