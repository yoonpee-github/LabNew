// "use client";
// import React from "react";
// import {
//   Layout,
//   Menu,
//   Card,
//   Button,
//   Typography,
//   Steps,
//   Row,
//   Col,
//   Space,
//   Tag,
// } from "antd";
// import {
//   UserOutlined,
//   SmileOutlined,
//   DashboardOutlined,
//   FileDoneOutlined,
// } from "@ant-design/icons";

// const { Header, Content, Footer } = Layout;
// const { Title, Text } = Typography;
// const { Step } = Steps;

// const DentalPlanPage: React.FC = () => {
//   return (
//     <Layout>
//       <Header style={{ background: "#fff", padding: 0 }}>
//         <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1" icon={<SmileOutlined />}>
//             Plan Overview
//           </Menu.Item>
//           <Menu.Item key="2" icon={<DashboardOutlined />}>
//             My Treatment
//           </Menu.Item>
//           <Menu.Item key="3" icon={<FileDoneOutlined />}>
//             History
//           </Menu.Item>
//         </Menu>
//       </Header>

//       <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
//         <Title level={2} style={{ textAlign: "center" }}>
//           Dental Treatment Plan
//         </Title>
//         <Row gutter={[16, 16]}>
//           <Col span={8}>
//             <Card
//               title="Initial Consultation"
//               bordered={false}
//               style={{ textAlign: "center" }}
//             >
//               <Typography.Text>
//                 Start your journey with an initial consultation to discuss your
//                 dental needs.
//               </Typography.Text>
//               <Tag color="blue">Step 1</Tag>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card
//               title="X-Ray & Analysis"
//               bordered={false}
//               style={{ textAlign: "center" }}
//             >
//               <Typography.Text>
//                 Complete x-rays and analysis to understand the current condition
//                 of your teeth.
//               </Typography.Text>
//               <Tag color="green">Step 2</Tag>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card
//               title="Treatment Plan"
//               bordered={false}
//               style={{ textAlign: "center" }}
//             >
//               <Typography.Text>
//                 Get a comprehensive treatment plan tailored to your needs.
//               </Typography.Text>
//               <Tag color="orange">Step 3</Tag>
//             </Card>
//           </Col>
//         </Row>

//         <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
//           <Col span={24}>
//             <Card title="Treatment Steps" bordered={false}>
//               <Steps current={1} direction="vertical">
//                 <Step
//                   title="Consultation"
//                   description="Discussing treatment options with your dentist."
//                 />
//                 <Step
//                   title="Diagnosis"
//                   description="Complete diagnostic tests including X-rays and exams."
//                 />
//                 <Step
//                   title="Treatment Plan"
//                   description="Customizing a plan for your needs and goals."
//                 />
//                 <Step
//                   title="Follow-up"
//                   description="Final check-ups and maintenance."
//                 />
//               </Steps>
//             </Card>
//           </Col>
//         </Row>

//         <Row
//           gutter={[16, 16]}
//           style={{ marginTop: "30px", justifyContent: "center" }}
//         >
//           <Col>
//             <Button
//               type="primary"
//               size="large"
//               icon={<SmileOutlined />}
//               style={{ fontSize: "16px" }}
//             >
//               Book Appointment
//             </Button>
//           </Col>
//         </Row>
//       </Content>

//       <Footer style={{ textAlign: "center" }}>
//         DentalCare ©2025 Created by YourCompany
//       </Footer>
//     </Layout>
//   );
// };

// export default DentalPlanPage;



"use client";
import React, { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import axiosInstancee from "@/app/utils/axioss";
import { RcFile } from "antd/lib/upload/interface";
import {
  Table,
  DatePicker,
  Select,
  Input,
  Button,
  Space,
  message,
  Upload,
  Modal,
  List,
  Image as AntdImage,
  Checkbox,
  Spin,
  Tooltip,
  notification,
  Tag,
  Tabs,
} from "antd";
import {
  FileImageOutlined,
  CommentOutlined,
  SearchOutlined,
  SaveOutlined,
  DownloadOutlined,
  FilterOutlined,
  CalendarOutlined,
  ProjectOutlined,
  BarsOutlined,
  AppstoreOutlined,
  EditOutlined,
  UploadOutlined,
  OpenAIOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import "antd/dist/reset.css";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import type { SelectProps } from "antd";

const { TextArea } = Input;
const { TabPane } = Tabs;

type TagRender = SelectProps["tagRender"];

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DataWi {
  key: string;
  item_id: string;
  Name: string;
  pt_ohn: string;
  prd_name: string;
  date_of_book: string;
  item_qty: string;
  lc_no: string;
  doctor_name: number;
  brc_sname: string;
  status_data?: string;
  date_of_inserts?: string;
  author_status?: string;
  finish_date?: string;
  date_of_insertsss?: string;
  previous_status_data?: string;
  previous_finish_date?: string;
  author_finishdate?: string;
  file_path?: string;
  date_of_insertss?: string;
  author_image?: string;
  status_mass?: string;
  date_of_inmass?: string;
  author_mass?: string;
  qty_data?: string;
  date_of_qty?: string;
  author_qty?: string;
  author?: string;
}

const quantity_options = ["ฟันบน", "ฟันล่าง"];

const getStatusTextColor = (status: any) => {
  switch (status) {
    case "รอช่างมารับงาน":
      return "processing";
    case "ช่างรับงานแล้ว":
      return "warning";
    case "แลปได้รับงานแล้ว":
      return "magenta";
    case "กระบวนการดัดลวด":
      return "volcano";
    case "กระบวนการโรยผง":
      return "orange";
    case "กระบวนการกอชิ้นงาน":
      return "gold";
    case "กระบวนการขัดชิ้นงาน":
      return "lime";
    case "กระบวนการทำงานใส":
      return "green";
    case "งานเสร็จแล้วรอส่ง":
      return "cyan";
    case "งานมาถึงสาขาแล้ว":
      return "blue";
    case "ลูกค้ารับงานแล้ว":
      return "success";
    case "แก้งาน":
      return "error";
    case "พิมพ์ retainer - ลวด":
      return "processing";
    case "พิมพ์ retainer - ใส":
      return "warning";
    case "พิมพ์ retainer แพ็คคู่":
      return "magenta";
    case "สแกน retainer - ลวด":
      return "volcano";
    case "สแกน retainer - ใส":
      return "orange";
    case "สแกน retainer แพ็คคู่":
      return "gold";
    case "งานแก้ รีเทนเนอร์ ลวด(พิมพ์)":
      return "lime";
    case "งานแก้ รีเทนเนอร์ ลวด(สแกน)":
      return "green";
    case "งานแก้ รีเทนเนอร์ ใส(พิมพ์)":
      return "cyan";
    case "งานแก้ รีเทนเนอร์ ใส(สแกน)":
      return "blue";
    case "Plate มีสกรู":
      return "success";
    case "Plate มีสกรู":
      return "error";
    case "ทำ tray ฟอกสีฟัน":
      return "geekblue";
    default:
      return "purple";
  }
};

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataWi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
  const [branchName, setBranchName] = useState<string[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQuerystatus, setSearchQuerystatus] = useState<string[]>(["All"]);
  const [searchQueryproduct, setSearchQueryproduct] = useState<string[]>([
    "All",
  ]);
  const [searchQuerybrcsname, setSearchQuerybrcsname] = useState<string[]>([
    "All",
  ]);
  const [searchQueryDate, setSearchQueryDate] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [dataSource, setDataSource] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [username, setUsername] = useState<string | null>("");
  const [currentAuthor, setCurrentAuthor] = useState<string | null>("");
  const [comments, setComments] = useState<
    {
      author: string;
      comment: string;
      item_id: string;
      created_at?: string;
      comment_image?: string | null;
    }[]
  >([]);
  const [statusMassMap, setStatusMassMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [qrData, setQrData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("1");

  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/");
    }
  }, [router]);

  const exportCSV = () => {
    const filteredData = data.filter((item) => {
      const itemDate = item.date_of_book
        ? dayjs(item.date_of_book, "YYYY-MM-DD")
        : null;
      const startDate = searchQueryDate ? searchQueryDate[0] : null;
      const endDate = searchQueryDate ? searchQueryDate[1] : null;

      return (
        (searchQuery
          ? item.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pt_ohn?.toLowerCase().includes(searchQuery.toLowerCase())
          : true) &&
        (searchQuerystatus.includes("All") ||
          searchQuerystatus.includes(item.status_data?.toLowerCase() ?? "")) &&
        (searchQueryproduct.includes("All") ||
          searchQueryproduct.includes(item.prd_name?.toLowerCase() ?? "")) &&
        (searchQuerybrcsname.includes("All") ||
          searchQuerybrcsname.some((brc) =>
            item.brc_sname
              ?.split(",")
              .map((s) => s.trim().toLowerCase())
              .some((brcName) =>
                brc
                  .split(",") // เปลี่ยนจาก Array เป็น String และแยกค่า
                  .some((branch) =>
                    branch.toLowerCase().includes(brcName.toLowerCase())
                  )
              )
          )) &&
        (!searchQueryDate ||
          (itemDate &&
            (itemDate.isSame(startDate, "day") ||
              itemDate.isAfter(startDate, "day")) &&
            (itemDate.isSame(endDate, "day") ||
              itemDate.isBefore(endDate, "day"))))
      );
    });

    const header = [
      "Name",
      "เลข HN",
      "ชนิด",
      "Due Date",
      "จำนวน",
      "เลขที่",
      "ชื่อแพทย์",
      "สาขา2",
      "สถานะการผลิต",
    ];

    const csvData = filteredData.map((item) => [
      `"${item.Name || ""}"`,
      `"${item.pt_ohn || ""}"`,
      `"${item.prd_name || ""}"`,
      `"${
        item.date_of_book
          ? format(new Date(item.date_of_book), "dd/MM/yyyy")
          : ""
      }"`,
      `"${item.item_qty || ""}"`,
      `"${item.lc_no || ""}"`,
      `"${item.doctor_name || ""}"`,
      `"${item.brc_sname || ""}"`,
      `"${item.status_data || ""}"`,
    ]);

    const csvContent = [header, ...csvData].map((e) => e.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filtered_retainer_data.csv";
    link.click();
  };

  const fetchData = async () => {
    if (!dates[0] || !dates[1]) {
      message.error("กรุณาเลือกวันที่ที่ต้องการค้นหาข้อมูล");
      return;
    }
    setLoading(true);
    try {
      const formattedStartDate = format(dates[0], "yyyy-MM-dd");
      const formattedEndDate = format(dates[1], "yyyy-MM-dd");
      const params: any = {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        branch_name: Array.isArray(branchName) ? branchName : [branchName],
      };
      const response: any = await axiosInstance.get("/commons/get_all_data_dentallight", {
        params: params,
      });
      setData(
        response.data.map((item: any, index: number) => ({
          ...item,
          key: index.toString(),
          finish_date: item.finish_date
            ? format(new Date(item.finish_date), "yyyy-MM-dd")
            : "",
        }))
      );
      setError(null);
    } catch (err) {
      setError("การค้นหาข้อมูลล้มเหลว กรุณาลองอีกครั้ง");
      message.error("Failed to Search data.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (key: string, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status_data: newStatus } : item
      )
    );
    const item = data.find((item) => item.key === key);
    const storedUsername = localStorage.getItem("username");
    if (item) {
      try {
        const payload: any = {
          item_id: item.item_id,
          status_data: newStatus,
          author_status: storedUsername,
        };
        if (item.finish_date) {
          payload.finish_date = item.finish_date;
        }
        await axiosInstance.post("/commons/post_status_data", payload);
      } catch (err) {
        message.error("Failed to update status");
      }
    }
  };

  const restrictedUsers = [
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
  ];

  const storedUsername = localStorage.getItem("username");

  const handleQuantityChange = async (key: string, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, qty_data: newStatus } : item
      )
    );
    const item = data.find((item) => item.key === key);
    const storedUsername = localStorage.getItem("username");
    if (item) {
      try {
        const payload: any = {
          item_id: item.item_id,
          qty_data: newStatus,
          author_qty: storedUsername,
        };
        await axiosInstance.post("/commons/post_qty_data", payload);
      } catch (err) {
        message.error("Failed to update status");
      }
    }
  };

  const handleFinishDateChange = async (key: string, date: any) => {
    const formattedDate = date ? format(new Date(date), "yyyy-MM-dd") : "";
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, finish_date: formattedDate } : item
      )
    );
    const item = data.find((item) => item.key === key);
    const storedUsername = localStorage.getItem("username");
    if (item) {
      try {
        await axiosInstance.post("/commons/post_finish_date", {
          item_id: item.item_id,
          finish_date: formattedDate,
          author_finishdate: storedUsername,
        });
      } catch (err) {
        message.error("Failed to update finish date");
      }
    }
  };

  const handleSummit = async () => {
    setLoading(true);
    try {
      await fetchData();
      message.success("Save Data successfully.");
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      message.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = async (itemId: any) => {
    try {
      setCurrentItemId(itemId);
      const response: any = await axiosInstance.get(
        `/commons/get_comment_data`,
        {
          params: { item_id: itemId },
        }
      );
      if (response.status === 200) {
        setComments(response.data);
        setIsModalVisible(true);
      } else {
        message.error("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      message.error("An error occurred while fetching comments.");
    }
  };

  const showModal2 = async (itemId: any) => {
    try {
      setCurrentItemId(itemId);
      const response: any = await axiosInstance.get(
        `/commons/get_comment_data`,
        {
          params: { item_id: itemId },
        }
      );
      if (response.status === 200) {
        setComments(response.data);
        setIsModalVisible2(true);
      } else {
        message.error("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      message.error("An error occurred while fetching comments.");
    }
  };

  const handleOk = () => {
    console.log(
      "Updated comment for index:",
      editingIndex,
      "Name",
      currentAuthor,
      "Value:",
      currentComment
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    console.log(
      "Updated comment for index:",
      editingIndex,
      "Name",
      currentAuthor,
      "Value:",
      currentComment
    );
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setCurrentAuthor(storedUsername);
    }
  }, []);

  const fetchDataImage = async (): Promise<
    { item_id: string; file_path: string }[]
  > => {
    if (!dates[0] || !dates[1]) {
      message.error("Please select both Start Date and End Date");
      return [];
    }
    setLoading(true);
    try {
      const formattedStartDate = format(dates[0], "yyyy-MM-dd");
      const formattedEndDate = format(dates[1], "yyyy-MM-dd");
      const params: any = {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        branch_name: Array.isArray(branchName) ? branchName : [branchName],
      };
      const response: any = await axiosInstance.get(
        "/commons/get_all_image_path",
        {
          params: params,
        }
      );

      const filePaths = response.data
        .map((item: any) => ({
          item_id: item.item_id,
          file_path: item.file_path,
        }))
        .filter(
          (item: { file_path: string | null }) => item.file_path !== null
        );

      setError(null);
      return filePaths;
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      message.error("Failed to fetch data.");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (text: any) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error("Error generating QR Code:", err);
      return null;
    }
  };
  const DownloadImageAll = async () => {
    const filePaths = await fetchDataImage();
    if (filePaths.length === 0) {
      message.error("No valid PDFs to merge.");
      return;
    }
    try {
      const pdfDoc = await PDFDocument.create();
      let pendingPage: Awaited<ReturnType<typeof pdfDoc.embedPage>> | null =
        null;
      let pendingQRCode: Awaited<ReturnType<typeof pdfDoc.embedPng>> | null =
        null;
      for (let i = 0; i < filePaths.length; i++) {
        const { item_id, file_path } = filePaths[i];
        const pdfUrl = `${axiosInstancee.defaults.baseURL}${file_path}`;
        console.log("Fetching PDF:", pdfUrl);
        try {
          const response = await fetch(pdfUrl);
          if (!response.ok) {
            console.error("Failed to fetch PDF. Status:", response.status);
            continue;
          }
          const pdfBytes = await response.arrayBuffer();
          const embeddedPdf = await PDFDocument.load(pdfBytes);
          const numPages = embeddedPdf.getPageCount();
          for (let j = 0; j < numPages; j++) {
            const copiedPages = await pdfDoc.copyPages(embeddedPdf, [j]);
            const copiedPage = copiedPages[0];
            const embeddedCopiedPage = await pdfDoc.embedPage(copiedPage);
            const qrCodeBase64 = await generateQRCode(String(item_id));
            let currentQRCode = null;
            if (qrCodeBase64) {
              currentQRCode = await pdfDoc.embedPng(qrCodeBase64);
            }
            if (pendingPage) {
              const newPage = pdfDoc.addPage([842, 595]);
              const { width, height } = newPage.getSize();
              const qrSize = 50;
              const qrMargin = 5;

              newPage.drawPage(pendingPage, {
                x: 0,
                y: 0,
                width: width / 2,
                height: height,
              });

              newPage.drawPage(embeddedCopiedPage, {
                x: width / 2,
                y: 0,
                width: width / 2,
                height: height,
              });
              if (pendingQRCode) {
                newPage.drawImage(pendingQRCode, {
                  x: width / 2 - qrMargin - qrSize,
                  y: height - qrMargin - qrSize,
                  width: qrSize,
                  height: qrSize,
                });
              }
              if (currentQRCode) {
                newPage.drawImage(currentQRCode, {
                  x: width - qrMargin - qrSize,
                  y: height - qrMargin - qrSize,
                  width: qrSize,
                  height: qrSize,
                });
              }
              pendingPage = null;
              pendingQRCode = null;
            } else {
              pendingPage = embeddedCopiedPage;
              pendingQRCode = currentQRCode;
            }
          }
        } catch (error) {
          console.error("Error processing PDF:", error);
        }
      }
      if (pendingPage) {
        const newPage = pdfDoc.addPage([842, 595]);
        const { width, height } = newPage.getSize();
        const qrSize = 50;
        const qrMargin = 20;
        newPage.drawPage(pendingPage, {
          x: 0,
          y: 0,
          width: width / 2,
          height: height,
        });
        if (pendingQRCode) {
          newPage.drawImage(pendingQRCode, {
            x: width / 2 - qrMargin - qrSize,
            y: height - qrMargin - qrSize,
            width: qrSize,
            height: qrSize,
          });
        }
        pendingPage = null;
        pendingQRCode = null;
      }
      const mergedPdfFile = await pdfDoc.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Download_ImageAll.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  };

  const CommentItem = ({ item }: any) => {
    const [imageBlobUrl, setImageBlobUrl] = useState("");
    const comment_image = item.comment_image
      ? `${axiosInstancee.defaults.baseURL}${item.comment_image}`
      : "";
    useEffect(() => {
      if (!comment_image) return;
      console.log("Fetching image from:", comment_image);
      const fetchImage = async () => {
        try {
          const response = await fetch(comment_image, {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Access-Control-Allow-Origin": "*",
            },
          });
          if (!response.ok) {
            console.error("Failed to fetch image. Status:", response.status);
            return;
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setImageBlobUrl(blobUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      fetchImage();
    }, [comment_image]);
    return (
      <List.Item>
        <strong>{item.author} :</strong> {item.comment}
        {imageBlobUrl && (
          <div style={{ marginTop: "8px" }}>
            <img
              src={imageBlobUrl}
              alt="Comment attachment"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <br />
        <small>
          Created at:{" "}
          {moment(item.created_at)
            .add(7, "hours")
            .format("DD/MM/YYYY HH:mm:ss น.")}
        </small>
      </List.Item>
    );
  };

  const handleCheckboxChange = (item_id: string, isChecked: boolean) => {
    Modal.confirm({
      title: "ยืนยันการเปลี่ยนแปลงเป็นงานด่วน",
      content: `โปรดกรอกข้อมูลที่จำเป็น และ แนบใบเสร็จการชำระเงินค่าเร่งงานในช่อง comment❗`,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: async () => {
        const status_mass = isChecked ? "approved" : "not approved";
        const storedUsername = localStorage.getItem("username");
        setStatusMassMap((prevState) => ({
          ...prevState,
          [item_id]: isChecked,
        }));
        try {
          console.log("Sending data:", {
            item_id,
            status_mass,
            author_mass: storedUsername,
          });
          const response = await axiosInstance.post(
            `/commons/post_status_mass`,
            {
              item_id,
              status_mass,
              author_mass: storedUsername,
            }
          );
          console.log("Response received:", response);
          if (response.status === 200) {
            console.log("Data saved successfully:", response.data);
          } else {
            console.error("Failed to save data:", response);
            setStatusMassMap((prevState) => ({
              ...prevState,
              [item_id]: !isChecked,
            }));
          }
        } catch (error) {
          console.error("Error saving data:", error);
          setStatusMassMap((prevState) => ({
            ...prevState,
            [item_id]: !isChecked,
          }));
        }
      },
      onCancel: () => {
        console.log("User cancelled");
      },
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      setQrData(null);
    }
  }, [isModalOpen]);
  useEffect(() => {
    console.log("QR Code Value:", qrData);
  }, [qrData]);
  useEffect(() => {
    if (qrData) {
      QRCode.toDataURL(String(qrData))
        .then((url: any) => setQrCodeImageUrl(url))
        .catch((error: any) =>
          console.error("Error generating QR Code:", error)
        );
    }
  }, [qrData]);

  const showQRCode = (itemId: string) => {
    console.log("Scanning Item ID:", itemId);
    setQrData(null);
    setTimeout(() => {
      setQrData(itemId);
      setIsModalOpen(true);
    }, 100);
  };

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={getStatusTextColor(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const renderUploadSection = (acceptType: string) => (
    <Upload
      fileList={fileList}
      beforeUpload={(file) => {
        setUploadedFile(file);
        setFileList([{ uid: file.uid, name: file.name, status: "done", url: URL.createObjectURL(file) }]);
        return false;
      }}
      onRemove={() => setFileList([])}
      accept={acceptType}
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
  );

  const columns: ColumnsType<DataWi> = [
    // {
    //   title: "#",
    //   dataIndex: "key",
    //   key: "key",
    //   align: "center",
    //   fixed: "left",
    //   width: 21,
    //   className: "red-border",
    //   onHeaderCell: () => ({ style: { textAlign: "center" } }),
    //   render: (text) => parseInt(text) + 1,
    // },
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      align: "center",
      fixed: "left",
      width: 21,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "รายชื่อลูกค้า",
      dataIndex: "Name",
      key: "Name",
      fixed: "left",
      width: 100,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text: string, record: DataWi) => {
        const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})/);
        const formattedDate = dateMatch
          ? `${dateMatch[2]}/${dateMatch[1]}`
          : "";

        return (
          <div>
            {text}{" "}
            {formattedDate && (
              <span style={{ fontSize: "12px", color: "gray" }}>
                ({formattedDate})
              </span>
            )}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {record.file_path && (
                <Button
                  style={{
                    borderColor: "magenta",
                    color: "magenta",
                    backgroundColor: "rgb(252, 239, 255)",
                  }}
                  onClick={() => showQRCode(record.item_id)}
                >
                  📌 QR Code
                </Button>
              )}
            </div>
          </div>
        );
      },
      sorter: (a: DataWi, b: DataWi) => {
        const dateA = a.Name.match(/(\d{1,2})\/(\d{1,2})/);
        const dateB = b.Name.match(/(\d{1,2})\/(\d{1,2})/);
        if (!dateA || !dateB) return 0;
        const dateAObj = new Date(`${dateA[2]}/${dateA[1]}`);
        const dateBObj = new Date(`${dateB[2]}/${dateB[1]}`);
        return dateAObj.getTime() - dateBObj.getTime();
      },
      showSorterTooltip: { title: "📌 คลิกเพื่อเรียงลำดับ รายชื่อลูกค้า" },
    },
    {
      title: "HN",
      dataIndex: "pt_ohn",
      key: "pt_ohn",
      align: "center",
      width: 28,
      className: "red-border",
    },
    {
      title: "หัตถการ",
      dataIndex: "prd_name",
      key: "prd_name",
      align: "center",
      width: 90,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text: string) => {
        const backgroundColor = getStatusTextColor(text);
        return (
          <>
            <span>
              <Tag color={backgroundColor} style={{ fontSize: "16px" }}>
                {text}
              </Tag>
            </span>
          </>
        );
      },
    },
    {
      title: "วันที่นัดลูกค้า",
      dataIndex: "date_of_book",
      key: "date_of_book",
      align: "center",
      className: "red-border",
      width: 45,
      render: (date: string) => (
        <span style={{ color: "red" }}>
          {date ? format(new Date(date), "dd/MM/yyyy") : "-"}
        </span>
      ),

      sorter: (a: any, b: any) => {
        const dateA = new Date(a.date_of_book || "1970-01-01").getTime();
        const dateB = new Date(b.date_of_book || "1970-01-01").getTime();
        return dateA - dateB;
      },

      onFilter: (value, record) => {
        if (!searchQueryDate || !searchQueryDate[0] || !searchQueryDate[1])
          return true;
        const recordDate: any = record.date_of_book
          ? dayjs(record.date_of_book, "YYYY-MM-DD")
          : null;
        return (
          recordDate &&
          recordDate.isSameOrAfter(searchQueryDate[0], "day") &&
          recordDate.isSameOrBefore(searchQueryDate[1], "day")
        );
      },

      filterDropdown: () => (
        <RangePicker
          status="error"
          value={searchQueryDate}
          onChange={(dates) => setSearchQueryDate(dates ?? null)}
          format="DD/MM/YYYY"
          style={{ width: 220, margin: 10 }}
        />
      ),
    },
    {
      title: "จำนวนชิ้นงาน",
      dataIndex: "item_qty",
      key: "item_qty",
      align: "center",
      width: 45,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (_, record) => {
        const formatDate = (text: any) => {
          if (!text) return "";
          const date = new Date(text);
          date.setHours(date.getHours() + 7); // เพิ่ม 7 ชั่วโมง
          return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${date.getFullYear()} ${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
            2,
            "0"
          )}:${String(date.getSeconds()).padStart(2, "0")} น.`;
        };

        const shouldShowSelect =
          parseInt(record.item_qty, 10) === 1 ||
          (parseInt(record.item_qty, 10) === 2 &&
            ["พิมพ์ retainer แพ็คคู่", "สแกน retainer แพ็คคู่"].includes(
              record.prd_name
            ));

        const confirmChange = (value: any) => {
          Modal.confirm({
            title: "ยืนยันการเปลี่ยนแปลง",
            content: `📌กรุณาตรวจสอบความถูกต้อง📌 คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนเป็น "${value}" ?`,
            okText: "ยืนยัน",
            cancelText: "ยกเลิก",
            onOk: () => handleQuantityChange(record.key, value),
          });
        };

        return (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", marginBottom: 8, color: "purple" }}>
              {record.item_qty} ชิ้น
            </div>
            {shouldShowSelect && (
              <Tooltip
                title={
                  record.date_of_qty
                    ? `Update At : ${formatDate(record.date_of_qty)} By : ${
                        record.author_qty
                      }`
                    : "ไม่มีข้อมูล"
                }
              >
                <Select
                  status={record.qty_data ? "error" : undefined} // แสดง error ถ้า qty_data มีค่า
                  value={record.qty_data}
                  onChange={confirmChange}
                  style={{ width: 90, marginBottom: 8 }}
                  dropdownStyle={{ textAlign: "center" }}
                  disabled={["Messenger", ""].includes(
                    localStorage.getItem("username") ?? ""
                  )}
                >
                  {quantity_options.map((qty) => (
                    <Option key={qty} value={qty}>
                      {qty}
                    </Option>
                  ))}
                </Select>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "เลขที่ใขอนุญาต",
      dataIndex: "lc_no",
      key: "lc_no",
      align: "center",
      width: 35,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
    },
    {
      title: "ชื่อแพทย์",
      dataIndex: "doctor_name",
      key: "doctor_name",
      width: 60,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
    },
    {
      title: "สาขา",
      dataIndex: "brc_sname",
      key: "brc_sname",
      align: "center",
      width: 30,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text: string) => {
        const backgroundColor = getStatusTextColor(text);
        const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})/);
        const formattedDate = dateMatch
          ? `${dateMatch[2]}/${dateMatch[1]}`
          : "";
        const branchName = text.replace(/\d{1,2}\/\d{1,2}/, "").trim();
        return (
          <>
            <span>
              <Tag color={backgroundColor} style={{ fontSize: "15px" }}>
                {text}
              </Tag>
            </span>{" "}
            {formattedDate && (
              <span style={{ fontSize: "12px", color: "gray" }}>
                ({formattedDate})
              </span>
            )}
          </>
        );
      },
      sorter: (a: DataWi, b: DataWi) => {
        const nameA = a.brc_sname.replace(/\d{1,2}\/\d{1,2}/, "").trim();
        const nameB = b.brc_sname.replace(/\d{1,2}\/\d{1,2}/, "").trim();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        const dateA = a.brc_sname.match(/(\d{1,2})\/(\d{1,2})/);
        const dateB = b.brc_sname.match(/(\d{1,2})\/(\d{1,2})/);
        if (!dateA || !dateB) return 0;
        const dateAObj = new Date(`${dateA[2]}/${dateA[1]}`);
        const dateBObj = new Date(`${dateB[2]}/${dateB[1]}`);
        return dateAObj.getTime() - dateBObj.getTime();
      },
      showSorterTooltip: { title: "📌 คลิกเพื่อเรียงลำดับ สาขา" },
    },
    {
      title: "สถานะการผลิต",
      dataIndex: "status_data",
      key: "status_data",
      align: "center",
      width: 65,
      className: "red-border",
      render: (status: any, record) => {
        if (!status) return "-";
        const backgroundColor = getStatusTextColor(status);
        const formatDate = (text: any) => {
          if (!text) return "";
          const date = new Date(text);
          date.setHours(date.getHours() + 7); //เพิ่ม7ชั่วโมง
          return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${date.getFullYear()} ${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
            2,
            "0"
          )}:${String(date.getSeconds()).padStart(2, "0")} น.`;
        };
        return (
          <Tooltip
            title={
              record.date_of_inserts
                ? `Update At : ${formatDate(record.date_of_inserts)} By : ${
                    record.author_status
                  }`
                : "ไม่มีข้อมูล"
            }
          >
            {/* <span
              style={{
                backgroundColor:
                  backgroundColor !== "rgb(0, 0, 0)"
                    ? backgroundColor
                    : "transparent",
                color:
                  backgroundColor !== "rgb(0, 0, 0)"
                    ? "rgb(255, 255, 255)"
                    : "rgb(0, 0, 0)",
                padding: backgroundColor !== "rgb(0, 0, 0)" ? "4px 8px" : "0",
                borderRadius: "4px",
              }}
            >
              {status}
              
            </span> */}
            <Tag color={backgroundColor} style={{ fontSize: "15px" }}>
              {status}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "วันที่งานเสร็จ",
      dataIndex: "finish_date",
      key: "finish_date",
      align: "center",
      width: 55,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (_, record) => {
        const formatDate = (text: any) => {
          if (!text) return "";
          const date = new Date(text);
          date.setHours(date.getHours() + 7); // เพิ่ม 7 ชั่วโมง
          return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${date.getFullYear()} ${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
            2,
            "0"
          )}:${String(date.getSeconds()).padStart(2, "0")} น.`;
        };

        return (
          <div style={{ textAlign: "center" }}>
            <Tooltip
              title={
                record.date_of_insertsss
                  ? `Update At : ${formatDate(record.date_of_insertsss)} By : ${
                      record.author_finishdate
                    }`
                  : "ไม่มีข้อมูล"
              }
            >
              <DatePicker
                status={record.finish_date ? "error" : undefined} // ถ้า finish_date มีค่าให้แสดง error
                value={
                  record.finish_date
                    ? dayjs(record.finish_date, "YYYY-MM-DD")
                    : null
                }
                style={{ marginBottom: 8 }}
                onChange={(date) => handleFinishDateChange(record.key, date)}
                format="DD/MM/YYYY"
                disabled={
                  !(
                    localStorage.getItem("username") === "Adminlab1" ||
                    localStorage.getItem("username") === "Adminlab2" ||
                    localStorage.getItem("username") === "Adminlab3" ||
                    localStorage.getItem("username") === "Chanatip"
                  )
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "ไฟล์ใบงาน",
      dataIndex: "file_path",
      key: "file_path",
      align: "center",
      width: 60,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (file_path: string | null, record: DataWi) => {
        const RenderFileWithHeaders: React.FC<{
          file_path: string | null;
          item_id: string;
        }> = ({ file_path, item_id }) => {
          const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
          const fileUrl = `${axiosInstancee.defaults.baseURL}${file_path}`;
          useEffect(() => {
            const fetchFile = async () => {
              try {
                const response = await fetch(fileUrl, {
                  headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Access-Control-Allow-Origin": "*",
                  },
                });
                if (!response.ok) {
                  console.error(
                    "Failed to fetch file. Status:",
                    response.status
                  );
                  return;
                }
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setFileBlobUrl(blobUrl);
                return () => {
                  URL.revokeObjectURL(blobUrl);
                };
              } catch (error) {
                console.error("Error fetching file:", error);
              }
            };
            if (file_path) {
              fetchFile();
            }
          }, [file_path, fileUrl]);

          const DownloadAsPDF = async () => {
            try {
              const response = await fetch(fileUrl, {
                headers: {
                  "ngrok-skip-browser-warning": "69420",
                  "Access-Control-Allow-Origin": "*",
                },
              });
              if (!response.ok) {
                console.error("Failed to fetch file. Status:", response.status);
                return;
              }
              const arrayBuffer = await response.arrayBuffer();
              const pdfDoc = await PDFDocument.load(arrayBuffer);
              const qrData = `${item_id}`;
              const qrCodeDataUrl = await QRCode.toDataURL(qrData);
              const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);
              const qrWidth = 80;
              const qrHeight = 80;
              const pages = pdfDoc.getPages();
              pages.forEach((page) => {
                const xPosition = page.getWidth() - qrWidth - 10;
                const yPosition = page.getHeight() - qrHeight - 0;
                page.drawImage(qrImage, {
                  x: xPosition,
                  y: yPosition,
                  width: qrWidth,
                  height: qrHeight,
                });
              });
              const pdfBytes = await pdfDoc.save();
              const link = document.createElement("a");
              link.href = URL.createObjectURL(
                new Blob([pdfBytes], { type: "application/pdf" })
              );
              link.download = "download.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } catch (error) {
              console.error("Error downloading file:", error);
            }
          };

          const formatDate = (text: string | null) => {
            if (!text) return "";
            const date = new Date(text);
            date.setHours(date.getHours() + 7); //เพิ่ม7ชั่วโมง
            return `${String(date.getDate()).padStart(2, "0")}/${String(
              date.getMonth() + 1
            ).padStart(2, "0")}/${date.getFullYear()} ${String(
              date.getHours()
            ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
              2,
              "0"
            )}:${String(date.getSeconds()).padStart(2, "0")} น.`;
          };

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {file_path && fileBlobUrl && (
                <>
                  {file_path.endsWith(".pdf") ? (
                    <Tooltip
                      title={
                        record.date_of_insertss
                          ? `Update At : ${formatDate(
                              record.date_of_insertss
                            )} By : ${record.author_image}`
                          : "ไม่มีข้อมูล"
                      }
                    >
                      <iframe
                        src={fileBlobUrl}
                        title="PDF Viewer"
                        width="100px"
                        height="100px"
                        style={{
                          border: "1px solid #ccc",
                          marginBottom: "5px",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        record.date_of_insertss
                          ? `Update At : ${formatDate(
                              record.date_of_insertss
                            )} By : ${record.author_image}`
                          : "ไม่มีข้อมูล"
                      }
                    >
                      <AntdImage
                        src={fileBlobUrl}
                        alt="Uploaded Image"
                        style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "5px",
                        }}
                        preview={{
                          src: fileBlobUrl,
                        }}
                      />
                    </Tooltip>
                  )}
                </>
              )}

              {storedUsername !== "Adminlab1" &&
                storedUsername !== "Adminlab2" &&
                storedUsername !== "Adminlab3" && (
                  <Upload
                    name="file"
                    accept=".pdf"
                    showUploadList={false}
                    customRequest={async ({
                      file,
                      onSuccess = () => {},
                      onError = () => {},
                    }) => {
                      const typedFile = file as RcFile;
                      setLoading(true);
                      const storedUsername = localStorage.getItem("username");
                      try {
                        const formData = new FormData();
                        formData.append("file", typedFile);
                        formData.append("item_id", record.item_id);
                        formData.append(
                          "author_image",
                          storedUsername || "Unknown"
                        );
                        const response = await axiosInstance.post(
                          "/commons/upload_file",
                          formData,
                          {
                            headers: { "Content-Type": "multipart/form-data" },
                          }
                        );
                        await fetchData();
                        onSuccess(response.data);
                      } catch (error: any) {
                        onError(error);
                        message.error(`${typedFile.name} upload failed.`);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {file_path ? (
                      <Button type="link" icon={<EditOutlined />}>
                        แก้ไขไฟล์
                      </Button>
                    ) : (
                      <Button type="link" icon={<FileImageOutlined />}>
                        อัปโหลดไฟล์
                      </Button>
                    )}
                  </Upload>
                )}

              {file_path && (
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={DownloadAsPDF}
                >
                  ดาวน์โหลดเป็น PDF
                </Button>
              )}
            </div>
          );
        };
        return (
          <RenderFileWithHeaders
            file_path={file_path}
            item_id={record.item_id}
          />
        );
      },
    },
    {
      title: "งานด่วน",
      dataIndex: "Mass",
      key: "Mass",
      align: "center",
      width: 36,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text, record) => {
        const formatDate = (text: any) => {
          if (!text) return "";
          const date = new Date(text);
          date.setHours(date.getHours() + 7); //เพิ่ม7ชั่วโมง
          return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${date.getFullYear()} ${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
            2,
            "0"
          )}:${String(date.getSeconds()).padStart(2, "0")} น.`;
        };
        return (
          <div style={{ textAlign: "center" }}>
            <Tooltip
              title={
                record.date_of_inmass
                  ? `Update At : ${formatDate(record.date_of_inmass)} By : ${
                      record.author_mass
                    }`
                  : "ไม่มีข้อมูล"
              }
            >
              <Checkbox
                checked={
                  statusMassMap[record.item_id] !== undefined
                    ? statusMassMap[record.item_id]
                    : record.status_mass === "approved"
                }
                onChange={(e) =>
                  handleCheckboxChange(record.item_id, e.target.checked)
                }
                disabled={!(localStorage.getItem("username") !== "Messenger")}
              />
            </Tooltip>
            {record.date_of_inmass && (
              <div style={{ fontSize: "12px", color: "purple", marginTop: 8 }}>
                <h4>อัพเดตเมื่อ :</h4>
                <div>{formatDate(record.date_of_inmass)}</div>
              </div>
            )}
          </div>
        );
      },
    },
    // {
    //   title: "Comment",
    //   dataIndex: "comment",
    //   key: "comment",
    //   align: "center",
    //   width: 40,
    //   className: "red-border",
    //   onHeaderCell: () => ({ style: { textAlign: "center" } }),
    //   render: (text, record, index) => (
    //     <div
    //       style={{
    //         textAlign: "center",
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Button
    //         type="primary"
    //         icon={<CommentOutlined />}
    //         onClick={() => showModal(record.item_id)}
    //       />
    //       {record.author && (
    //         <Tag
    //           color={record.author === storedUsername ? "green" : "red"}
    //           style={{ marginTop: "10px" }}
    //         >
    //           Comment
    //         </Tag>
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: "Plan Doctor",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      width: 40,
      className: "red-border",
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (text, record, index) => (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            icon={<OpenAIOutlined />}
            onClick={() => showModal2(record.item_id)}
          />
          {record.author && (
            <Tag
              color={record.author === storedUsername ? "green" : "red"}
              style={{ marginTop: "10px" }}
            >
              Comment
            </Tag>
          )}
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "rgb(247, 252, 255)",
      }}
    >
      <>
        <Modal
          title="QR Code"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {qrCodeImageUrl ? (
            <>
              <p>Item_Id Value: {qrData}</p>
              <img
                src={qrCodeImageUrl}
                alt="QR Code"
                style={{ display: "block", margin: "auto" }}
                width={200}
                height={200}
              />
            </>
          ) : (
            <p>กำลังโหลด...</p>
          )}
        </Modal>

        <Modal
          title="Edit Comment"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel} loading={loading}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              loading={loading}
              onClick={async () => {
                try {
                  if (!currentItemId || !currentAuthor || !currentComment) {
                    message.error("Please fill in all fields before saving.");
                    return;
                  }
                  setLoading(true);
                  const formData = new FormData();
                  formData.append("item_id", currentItemId);
                  formData.append("author", currentAuthor);
                  formData.append("comment", currentComment);
                  if (uploadedFile) {
                    formData.append("image", uploadedFile);
                  }
                  const response: any = await axiosInstance.post(
                    "/commons/save_comment",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (response.data.success) {
                    setComments([
                      ...comments,
                      {
                        item_id: currentItemId,
                        author: currentAuthor,
                        comment: currentComment,
                        comment_image: uploadedFile
                          ? URL.createObjectURL(uploadedFile)
                          : null,
                        created_at: response.data.created_at,
                      },
                    ]);
                    setIsModalVisible(false);
                    setCurrentComment("");
                    setUploadedFile(null);
                    setFileList([]);
                    message.success(response.data.message);
                    notification.success({
                      key: Date.now(),
                      message: "Comment Saved",
                      description: `📝 ${currentComment}`,
                      placement: "bottomRight",
                      duration: 0,
                    });
                  }
                } catch (error) {
                  console.error("Error saving comment:", error);
                  message.error("Failed to save comment. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              Save
            </Button>,
          ]}
        >
          <h3>User :</h3>
          <Spin spinning={loading}>
            <Input
              value={currentAuthor ?? ""}
              readOnly
              style={{ marginBottom: "16px", fontWeight: "bold" }}
            />
          </Spin>
          <h3>Comment :</h3>
          <Spin spinning={loading}>
            <Input.TextArea
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              rows={4}
              placeholder="Enter your comment here..."
              style={{ marginBottom: "16px" }}
            />
          </Spin>
          <h3>Upload Image:</h3>
          <Spin spinning={loading}>
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setUploadedFile(file);
                setFileList([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: URL.createObjectURL(file),
                  },
                ]);
                return false;
              }}
              onRemove={() => setFileList([])}
              accept="image/*"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Spin>
          <div style={{ marginTop: "16px" }}>
            <strong>Item ID:</strong> {currentItemId}
          </div>
          <div style={{ marginTop: "20px" }}>
            <h3>All Comments</h3>
            <List
              bordered
              dataSource={comments
                .filter((item) => item.item_id === currentItemId)
                .sort(
                  (a, b) =>
                    new Date(a.created_at || 0).getTime() -
                    new Date(b.created_at || 0).getTime()
                )}
              renderItem={(item) => <CommentItem item={item} />}
            />
          </div>
        </Modal>

        <Modal
      title="Treatment Plan & Comments"
      open={isModalVisible2}
      onCancel={handleCancel2}
      footer={null}
      width={750}
    >
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} type="card">
        {/* หัวข้อ 1: Preparation */}
        <TabPane tab="Patient Photos" key="1">
          <h3>Upload Patient Photos:</h3>
          {renderUploadSection("image/*")}
          <h3>Comment:</h3>
          <TextArea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            rows={3}
            placeholder="Enter your comment..."
          />
        </TabPane>

        <TabPane tab="Scan Files" key="2">
          <h3>Upload Scan Files (PDF, ZIP, etc.):</h3>
          {renderUploadSection(".pdf,.zip,.rar")}
          <h3>Comment:</h3>
          <TextArea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            rows={3}
            placeholder="Enter your comment..."
          />
        </TabPane>

        <TabPane tab="Work Sheets" key="3">
          <h3>Upload Work Sheets:</h3>
          {renderUploadSection("image/*")}
          <h3>Comment:</h3>
          <TextArea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            rows={3}
            placeholder="Enter your comment..."
          />
        </TabPane>

        {/* หัวข้อ 2: Select Plan */}
        <TabPane tab="Plan" key="4">
          <h3>Upload Plan Files (Images, Documents, Videos):</h3>
          {renderUploadSection("image/*,.pdf,.mp4,.mov")}
          <h3>Comment:</h3>
          <TextArea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            rows={3}
            placeholder="Enter your comment..."
          />
        </TabPane>

        {/* หัวข้อ 3: Production */}
        <TabPane tab="Stage" key="5">
          <h3>Upload Stage Files (Images, Documents, Videos):</h3>
          {renderUploadSection("image/*,.pdf,.mp4,.mov")}
          <h3>Comment:</h3>
          <TextArea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            rows={3}
            placeholder="Enter your comment..."
          />
        </TabPane>
      </Tabs>

      <Button
        type="primary"
        loading={loading}
        style={{ marginTop: "16px" }}
      >
        Save Comment
      </Button>

      <div style={{ marginTop: "20px" }}>
        <h3>All Comments</h3>
        <List
          bordered
          dataSource={comments.filter((item) => item.item_id === currentItemId)}
          renderItem={(item) => (
            <List.Item>
              <div>
                <p>{item.comment}</p>
                {item && <a target="_blank">View File</a>}
                <small>{item.created_at}</small>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Modal>

      </>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Retainer Data
      </h2>
      <Space
        size="large"
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span>
          <CalendarOutlined /> วันที่ :
        </span>
        <RangePicker
          status="error"
          style={{ width: 220, marginLeft: -20 }}
          onChange={(values) =>
            setDates([
              values?.[0]?.toDate() || null,
              values?.[1]?.toDate() || null,
            ])
          }
          format="DD/MM/YYYY"
          disabled={loading}
        />
        <span>
          <BarsOutlined /> สาขา :
        </span>
        <Select
          value={branchName}
          // onChange={setBranchName}
          tagRender={tagRender}
          status="error"
          onChange={(newValues) => setBranchName(newValues)}
          style={{ width: 85, marginLeft: -20 }}
          mode="multiple"
          showSearch={false}
          disabled={loading}
        >
          <Option
            value="All"
            disabled={branchName.length > 0 && !branchName.includes("All")}
          >
            All
          </Option>
          <Option value="RA" disabled={branchName.includes("All")}>
            RA
          </Option>
          <Option value="AR" disabled={branchName.includes("All")}>
            AR
          </Option>
          <Option value="SA" disabled={branchName.includes("All")}>
            SA
          </Option>
          <Option value="AS" disabled={branchName.includes("All")}>
            AS
          </Option>
          <Option value="ON" disabled={branchName.includes("All")}>
            ON
          </Option>
          <Option value="UD" disabled={branchName.includes("All")}>
            UD
          </Option>
          <Option value="NW" disabled={branchName.includes("All")}>
            NW
          </Option>
          <Option value="CW" disabled={branchName.includes("All")}>
            CW
          </Option>
          <Option value="R2" disabled={branchName.includes("All")}>
            R2
          </Option>
          <Option value="LB" disabled={branchName.includes("All")}>
            LB
          </Option>
          <Option value="BK" disabled={branchName.includes("All")}>
            BK
          </Option>
          <Option value="SQ" disabled={branchName.includes("All")}>
            SQ
          </Option>
          <Option value="BN" disabled={branchName.includes("All")}>
            BN
          </Option>
          <Option value="PK" disabled={branchName.includes("All")}>
            PK
          </Option>
          <Option value="RS" disabled={branchName.includes("All")}>
            RS
          </Option>
          <Option value="FS" disabled={branchName.includes("All")}>
            FS
          </Option>
          <Option value="T3" disabled={branchName.includes("All")}>
            T3
          </Option>
          <Option value="BP" disabled={branchName.includes("All")}>
            BP
          </Option>
          <Option value="NT" disabled={branchName.includes("All")}>
            NT
          </Option>
          <Option value="PP" disabled={branchName.includes("All")}>
            PP
          </Option>
        </Select>
        <span>
          <FilterOutlined /> Filter :
        </span>
        <Input
          status="error"
          placeholder="ชื่อ-สกุล หรือ เลขHN"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginLeft: -20 }}
          disabled={loading || !data.length}
        />
        <span>
          <ProjectOutlined /> สถานะการผลิต :
        </span>
        <Select
          status="error"
          mode="multiple"
          placeholder="Search by Status"
          tagRender={tagRender}
          value={Array.isArray(searchQuerystatus) ? searchQuerystatus : ["All"]}
          onChange={(values) => {
            if (values.includes("All")) {
              setSearchQuerystatus(["All"]);
            } else {
              setSearchQuerystatus(values.filter((v) => v !== "All"));
            }
          }}
          style={{ width: 190, marginLeft: -20 }}
          disabled={loading || !data.length}
        >
          <Option
            value="All"
            disabled={
              searchQuerystatus.length > 0 && searchQuerystatus[0] !== "All"
            }
          >
            All
          </Option>
          <Option
            value="รอช่างมารับงาน"
            disabled={searchQuerystatus.includes("All")}
          >
            รอช่างมารับงาน
          </Option>
          <Option
            value="ช่างรับงานแล้ว"
            disabled={searchQuerystatus.includes("All")}
          >
            ช่างรับงานแล้ว
          </Option>
          <Option
            value="แลปได้รับงานแล้ว"
            disabled={searchQuerystatus.includes("All")}
          >
            แลปได้รับงานแล้ว
          </Option>
          <Option
            value="กระบวนการดัดลวด"
            disabled={searchQuerystatus.includes("All")}
          >
            กระบวนการดัดลวด
          </Option>
          <Option
            value="กระบวนการโรยผง"
            disabled={searchQuerystatus.includes("All")}
          >
            กระบวนการโรยผง
          </Option>
          <Option
            value="กระบวนการกอชิ้นงาน"
            disabled={searchQuerystatus.includes("All")}
          >
            กระบวนการกอชิ้นงาน
          </Option>
          <Option
            value="กระบวนการขัดชิ้นงาน"
            disabled={searchQuerystatus.includes("All")}
          >
            กระบวนการขัดชิ้นงาน
          </Option>
          <Option
            value="กระบวนการทำงานใส"
            disabled={searchQuerystatus.includes("All")}
          >
            กระบวนการทำงานใส
          </Option>
          <Option
            value="งานเสร็จแล้วรอส่ง"
            disabled={searchQuerystatus.includes("All")}
          >
            งานเสร็จแล้วรอส่ง
          </Option>
          <Option
            value="งานมาถึงสาขาแล้ว"
            disabled={searchQuerystatus.includes("All")}
          >
            งานมาถึงสาขาแล้ว
          </Option>
          <Option
            value="ลูกค้ารับงานแล้ว"
            disabled={searchQuerystatus.includes("All")}
          >
            ลูกค้ารับงานแล้ว
          </Option>
          <Option value="แก้งาน" disabled={searchQuerystatus.includes("All")}>
            แก้งาน
          </Option>
        </Select>
        <span>
          <AppstoreOutlined /> หัตถการ :
        </span>
        <Select
          status="error"
          mode="multiple"
          placeholder="Search by Product"
          tagRender={tagRender}
          value={
            Array.isArray(searchQueryproduct) ? searchQueryproduct : ["All"]
          }
          onChange={(values) => {
            if (values.includes("All")) {
              setSearchQueryproduct(["All"]);
            } else {
              setSearchQueryproduct(values.filter((v) => v !== "All"));
            }
          }}
          style={{ width: 230, marginLeft: -20 }}
          disabled={loading || !data.length}
        >
          <Option
            value="All"
            disabled={
              searchQueryproduct.length > 0 && searchQueryproduct[0] !== "All"
            }
          >
            All
          </Option>
          <Option
            value="พิมพ์ retainer - ลวด"
            disabled={searchQueryproduct.includes("All")}
          >
            พิมพ์ retainer - ลวด
          </Option>
          <Option
            value="พิมพ์ retainer - ใส"
            disabled={searchQueryproduct.includes("All")}
          >
            พิมพ์ retainer - ใส
          </Option>
          <Option
            value="พิมพ์ retainer แพ็คคู่"
            disabled={searchQueryproduct.includes("All")}
          >
            พิมพ์ retainer - แพ็คคู่
          </Option>
          <Option
            value="สแกน retainer - ลวด"
            disabled={searchQueryproduct.includes("All")}
          >
            สแกน retainer - ลวด
          </Option>
          <Option
            value="สแกน retainer - ใส"
            disabled={searchQueryproduct.includes("All")}
          >
            สแกน retainer - ใส
          </Option>
          <Option
            value="สแกน retainer แพ็คคู่"
            disabled={searchQueryproduct.includes("All")}
          >
            สแกน retainer - แพ็คคู่
          </Option>
          <Option
            value="งานแก้ รีเทนเนอร์ ลวด(พิมพ์)"
            disabled={searchQueryproduct.includes("All")}
          >
            งานแก้ รีเทนเนอร์ ลวด(พิมพ์)
          </Option>
          <Option
            value="งานแก้ รีเทนเนอร์ ลวด(สแกน)"
            disabled={searchQueryproduct.includes("All")}
          >
            งานแก้ รีเทนเนอร์ ลวด(สแกน)
          </Option>
          <Option
            value="งานแก้ รีเทนเนอร์ ใส(พิมพ์)"
            disabled={searchQueryproduct.includes("All")}
          >
            งานแก้ รีเทนเนอร์ ใส(พิมพ์)
          </Option>
          <Option
            value="งานแก้ รีเทนเนอร์ ใส(สแกน)"
            disabled={searchQueryproduct.includes("All")}
          >
            งานแก้ รีเทนเนอร์ ใส(สแกน)
          </Option>
          <Option
            value="Plate มีสกรู"
            disabled={searchQueryproduct.includes("All")}
          >
            Plate มีสกรู
          </Option>
          <Option
            value="Plate ไม่มีสกรู"
            disabled={searchQueryproduct.includes("All")}
          >
            Plate ไม่มีสกรู
          </Option>
          <Option
            value="ทำ tray ฟอกสีฟัน"
            disabled={searchQueryproduct.includes("All")}
          >
            ทำ tray ฟอกสีฟัน
          </Option>
          <Option
            value="night guard"
            disabled={searchQueryproduct.includes("All")}
          >
            Night Guard
          </Option>
        </Select>

        <span>
          <AppstoreOutlined /> พื้นที่ :
        </span>
        <Select
          status="error"
          mode="multiple"
          placeholder="Search by Product"
          tagRender={tagRender}
          value={
            Array.isArray(searchQuerybrcsname) ? searchQuerybrcsname : ["All"]
          }
          onChange={(values) => {
            if (values.includes("All")) {
              setSearchQuerybrcsname(["All"]);
            } else {
              setSearchQuerybrcsname(values.filter((v) => v !== "All"));
            }
          }}
          style={{ width: 230, marginLeft: -20 }}
          disabled={loading || !data.length}
        >
          <Option
            value="All"
            disabled={
              searchQuerybrcsname.length > 0 && searchQuerybrcsname[0] !== "All"
            }
          >
            All
          </Option>
          <Option
            value="RA,BP,FS,LB,AR,NW,CW,RS"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันจันทร์
          </Option>
          <Option
            value="BK,R2,PK,T3,SA,NT,AS,SQ,ON,PP,BN,UD"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันอังคาร
          </Option>
          <Option
            value="RA,BP,FS,LB,AR,NW,CW,RS"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันพุธ
          </Option>
          <Option
            value="BK,R2,PK,T3,SA,NT,AS,SQ,ON,PP,BN,UD"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันพฤหัสบดี
          </Option>
          <Option
            value="RA,BP,FS,LB,AR,NW,CW,RS"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันศุกร์
          </Option>
          <Option
            value="BK,R2,PK,T3,SA,NT,AS,SQ,ON,PP,BN,UD"
            disabled={searchQuerybrcsname.includes("All")}
          >
            วันเสาร์
          </Option>
        </Select>
        {/* <span>
          <MenuUnfoldOutlined /> วันที่นัดลูกค้า :
        </span>
        <DatePicker.RangePicker
          status="error"
          value={searchQueryDate}
          onChange={(dates) => setSearchQueryDate(dates ?? null)}
          format="DD/MM/YYYY"
          style={{ width: 220, marginLeft: -20 }}
          disabled={loading || !data.length}
        /> */}
        <Button
          onClick={fetchData}
          loading={loading}
          style={{
            boxShadow: "4px 4px 8px rgba(255, 171, 45, 0.2)",
            marginLeft: -10,
            borderColor: "orange",
            color: "orange",
            backgroundColor: "rgb(253, 246, 239)",
          }}
        >
          Search <SearchOutlined />
        </Button>
      </Space>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="link"
          onClick={DownloadImageAll}
          loading={loading}
          // disabled={
          //   !data.length ||
          //   storedUsername === "Messenger" ||
          //   restrictedUsers.includes(storedUsername ?? "")
          // }
          style={{
            marginBottom: "20px",
            boxShadow: "4px 4px 8px rgba(152, 43, 255, 0.2)",
            marginRight: "5px",
            backgroundColor: "rgb(248, 241, 255)",
            borderColor: "purple",
            color: "purple",
          }}
        >
          ดาวน์โหลดรูปภาพทั้งหมด <FileImageOutlined />
        </Button>
        <Button
          type="link"
          onClick={exportCSV}
          loading={loading}
          // disabled={
          //   !data.length ||
          //   storedUsername === "Messenger" ||
          //   restrictedUsers.includes(storedUsername ?? "")
          // }
          style={{
            marginBottom: "20px",
            boxShadow: "4px 4px 8px rgba(152, 43, 255, 0.2)",
            backgroundColor: "rgb(248, 241, 255)",
            borderColor: "purple",
            color: "purple",
          }}
        >
          Export CSV <DownloadOutlined />
        </Button>
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <Table
        columns={columns}
        dataSource={data.filter((item) => {
          const itemDate = item.date_of_book
            ? dayjs(item.date_of_book, "YYYY-MM-DD")
            : null;
          const startDate = searchQueryDate ? searchQueryDate[0] : null;
          const endDate = searchQueryDate ? searchQueryDate[1] : null;

          return (
            (searchQuery
              ? item.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.pt_ohn?.toLowerCase().includes(searchQuery.toLowerCase())
              : true) &&
            (searchQuerystatus.includes("All") ||
              searchQuerystatus.includes(
                item.status_data?.toLowerCase() ?? ""
              )) &&
            (searchQueryproduct.includes("All") ||
              searchQueryproduct.includes(
                item.prd_name?.toLowerCase() ?? ""
              )) &&
            (searchQuerybrcsname.includes("All") ||
              searchQuerybrcsname.some((brc) =>
                item.brc_sname
                  ?.split(",")
                  .map((s) => s.trim().toLowerCase())
                  .some((brcName) =>
                    brc
                      .split(",") // เปลี่ยนจาก Array เป็น String และแยกค่า
                      .some((branch) =>
                        branch.toLowerCase().includes(brcName.toLowerCase())
                      )
                  )
              )) &&
            (!searchQueryDate ||
              (itemDate &&
                (itemDate.isSame(startDate, "day") ||
                  itemDate.isAfter(startDate, "day")) &&
                (itemDate.isSame(endDate, "day") ||
                  itemDate.isBefore(endDate, "day"))))
          );
        })}
        loading={loading}
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "1000"],
          defaultPageSize: 10,
          onChange: (page, pageSize) => {
            if (pageSize === 1000) {
              setDataSource(data);
            } else {
              const pageSizeNumber =
                typeof pageSize === "string" ? Number(pageSize) : pageSize;
              const startIndex = (page - 1) * pageSizeNumber;
              const endIndex = page * pageSizeNumber;
              setDataSource(data.slice(startIndex, endIndex));
            }
          },
        }}
        scroll={{
          x: 1900,
        }}
        className="blue-scroll"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          onClick={handleSummit}
          loading={loading}
          disabled={!data.length}
          style={{
            boxShadow: "4px 4px 8px rgba(0, 15, 56, 0.2)",
            marginTop: "10px",
          }}
        >
          <SaveOutlined /> Submit
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
