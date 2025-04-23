// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import denso from "@/app/assets/plusdental.png";
// import { useRouter, usePathname } from "next/navigation";
// import { Button, Menu, Popover, Typography } from "antd";
// import { LogoutOutlined } from "@ant-design/icons";
// import { useUser } from "@/app/components/UserContext";

// const Navbar = () => {
//   const { username, setUsername } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [menuVisible, setMenuVisible] = React.useState(false);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, [setUsername]);

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     setUsername(null);
//     setMenuVisible(false);
//     router.push("/");
//   };

//   return (
//     <div
//       style={{
//         borderBottom: "2px solid lightgray",
//         display: "flex",
//         alignItems: "center",
//         padding: "1rem",
//         position: "relative",
//         height: "60px",
//         justifyContent: "space-between",
//         backgroundImage: `url("https://images8.alphacoders.com/128/1283469.jpg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "250px -300px",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
//         <Image src={denso} alt="denso" width={50} height={50} priority />
//         <Typography.Link
//           onClick={(e) => {
//             if (
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//             ) {
//               router.push("/components");
//             } else {
//               e.preventDefault();
//             }
//           }}
//           style={{
//             fontSize: "15px",
//             fontWeight: "bold",
//             color:
//               pathname === "/components"
//                 ? "rgb(160, 160, 160)"
//                 : "rgb(26, 142, 250)",
//             pointerEvents:
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//                 ? "auto"
//                 : "none",
//           }}
//         >
//           Retainer Data
//         </Typography.Link>
//         <Typography.Link
//           onClick={(e) => {
//             if (
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//             ) {
//               router.push("/components/Lab");
//             } else {
//               e.preventDefault();
//             }
//           }}
//           style={{
//             fontSize: "15px",
//             fontWeight: "bold",
//             color:
//               pathname === "/components/Lab"
//                 ? "rgb(160, 160, 160)"
//                 : "rgb(26, 142, 250)",
//             pointerEvents:
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//                 ? "auto"
//                 : "none",
//           }}
//         >
//           Scan QR Code
//         </Typography.Link>
//         <Typography.Link
//           onClick={(e) => {
//             if (
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//             ) {
//               router.push("/components/Dentallight");
//             } else {
//               e.preventDefault();
//             }
//           }}
//           style={{
//             fontSize: "15px",
//             fontWeight: "bold",
//             color:
//               pathname === "/components/Dentallight"
//                 ? "rgb(160, 160, 160)"
//                 : "rgb(26, 142, 250)",
//             pointerEvents:
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//                 ? "auto"
//                 : "none",
//           }}
//         >
//           Dentallight Data
//         </Typography.Link>
//         <Typography.Link
//           onClick={(e) => {
//             if (
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//             ) {
//               router.push("/components/Performance");
//             } else {
//               e.preventDefault();
//             }
//           }}
//           style={{
//             fontSize: "15px",
//             fontWeight: "bold",
//             color:
//               pathname === "/components/Performance"
//                 ? "rgb(160, 160, 160)"
//                 : "rgb(26, 142, 250)",
//             pointerEvents:
//               username === "Chanatip" ||
//               username === "Adminlab1" ||
//               username === "Adminlab2" ||
//               username === "Adminlab3" ||
//               username === "Station1(jub)" ||
//               username === "Station1(gap)" ||
//               username === "Station1(ane)" ||
//               username === "Station2(an)" ||
//               username === "Station2(pang)" ||
//               username === "Station2(fluke)" ||
//               username === "Station3(boom)" ||
//               username === "Station3(dow)" ||
//               username === "Station3(ear)" ||
//               username === "Station4(boom)" ||
//               username === "Station4(dow)" ||
//               username === "Station4(ear)" ||
//               username === "Station5(mind)" ||
//               username === "Station5(alli)" ||
//               username === "Messenger" ||
//               username === "RA" ||
//               username === "AR" ||
//               username === "SA" ||
//               username === "AS" ||
//               username === "ON" ||
//               username === "UD" ||
//               username === "NW" ||
//               username === "CW" ||
//               username === "R2" ||
//               username === "LB" ||
//               username === "BK" ||
//               username === "SQ" ||
//               username === "BN" ||
//               username === "PK" ||
//               username === "RS" ||
//               username === "FS" ||
//               username === "T3" ||
//               username === "BP" ||
//               username === "NT" ||
//               username === "PP"
//                 ? "auto"
//                 : "none",
//           }}
//         >
//           Performance Lab
//         </Typography.Link>
//       </div>

//       {username ? (
//         <Popover
//           content={
//             <Menu>
//               <Menu.Item key="1">
//                 <Button
//                   type="text"
//                   onClick={() => {
//                     handleLogout();
//                     setMenuVisible(false);
//                   }}
//                   icon={<LogoutOutlined />}
//                   style={{ width: "100%" }}
//                 >
//                   Log out
//                 </Button>
//               </Menu.Item>
//             </Menu>
//           }
//           title="User Options"
//           trigger="click"
//           open={menuVisible}
//           onOpenChange={setMenuVisible}
//         >
//           <Button type="link" style={{ fontSize: "18px", fontWeight: "bold" }}>
//             {username}
//           </Button>
//         </Popover>
//       ) : (
//         <Button
//           type="link"
//           style={{
//             fontSize: "18px",
//             fontWeight: "bold",
//             color: "#333",
//             padding: 0,
//             marginLeft: 10,
//           }}
//           onClick={() => router.push("/")}
//         >
//           Log in
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Navbar;




// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import denso from "@/app/assets/plusdental.png";
// import { useRouter, usePathname } from "next/navigation";
// import { Button, Menu, Popover, Typography } from "antd";
// import { LogoutOutlined } from "@ant-design/icons";
// import { useUser } from "@/app/components/UserContext";

// const Navbar = () => {
//   const { username, setUsername } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [menuVisible, setMenuVisible] = React.useState(false);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, [setUsername]);

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     setUsername(null);
//     setMenuVisible(false);
//     router.push("/");
//   };

//   const menuItems = [
//     { key: "/components", label: "Retainer Data" },
//     { key: "/components/Lab", label: "Scan QR Code" },
//     { key: "/components/Dentallight", label: "Dentallight Data" },
//     { key: "/components/Performance", label: "Performance Lab" },
//     { key: "/components/Booking", label: "Booking" },
//   ];

//   const navLinks = menuItems.map((item) => {
//     // ประกาศ allowedUsernames ภายใน map แต่ภายนอก onClick
//     const allowedUsernames: any = [
//       "Chanatip",
//       "Adminlab1",
//       "Adminlab2",
//       "Adminlab3",
//       "Station1(jub)",
//       "Station1(gap)",
//       "Station1(ane)",
//       "Station2(an)",
//       "Station2(pang)",
//       "Station2(fluke)",
//       "Station3(boom)",
//       "Station3(dow)",
//       "Station3(ear)",
//       "Station4(boom)",
//       "Station4(dow)",
//       "Station4(ear)",
//       "Station5(mind)",
//       "Station5(alli)",
//       "Messenger",
//       "RA",
//       "AR",
//       "SA",
//       "AS",
//       "ON",
//       "UD",
//       "NW",
//       "CW",
//       "R2",
//       "LB",
//       "BK",
//       "SQ",
//       "BN",
//       "PK",
//       "RS",
//       "FS",
//       "T3",
//       "BP",
//       "NT",
//       "PP",
//     ];

//     return (
//       <Typography.Link
//         key={item.key}
//         onClick={(e) => {
//           // ตรวจสอบว่า username อยู่ใน allowedUsernames หรือไม่
//           if (allowedUsernames.includes(username)) {
//             router.push(item.key);
//           } else {
//             e.preventDefault();
//           }
//         }}
//         style={{
//           fontSize: "15px",
//           fontWeight: "bold",
//           color:
//             pathname === item.key ? "rgb(160, 160, 160)" : "rgb(26, 142, 250)",
//           pointerEvents: allowedUsernames.includes(username) ? "auto" : "none",
//           marginRight: "20px", // เพิ่ม gap ระหว่างลิ้งแต่ละตัว
//         }}
//       >
//         {item.label}
//       </Typography.Link>
//     );
//   });

//   const userMenu = (
//     <Menu>
//       {menuItems.map((item) => (
//         <Menu.Item key={item.key} onClick={() => router.push(item.key)}>
//           {item.label}
//         </Menu.Item>
//       ))}
//       <Menu.Item key="logout">
//         <Button
//           type="text"
//           onClick={handleLogout}
//           icon={<LogoutOutlined />}
//           style={{ width: "100%" }}
//         >
//           Log out
//         </Button>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div
//       style={{
//         borderBottom: "2px solid lightgray",
//         display: "flex",
//         alignItems: "center",
//         padding: "1rem",
//         position: "relative",
//         height: "60px",
//         justifyContent: "space-between",
//         backgroundImage: `url("https://images8.alphacoders.com/128/1283469.jpg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "250px -300px",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
//         <Image src={denso} alt="denso" width={50} height={50} priority />

//         <div className="desktop-nav">{navLinks}</div>
//       </div>

//       {username ? (
//         <Popover
//           content={userMenu}
//           title="Select Options"
//           trigger="click"
//           open={menuVisible}
//           onOpenChange={setMenuVisible}
//         >
//           <Button type="link" style={{ fontSize: "18px", fontWeight: "bold" }}>
//             {username}
//           </Button>
//         </Popover>
//       ) : (
//         <Button
//           type="link"
//           style={{
//             fontSize: "18px",
//             fontWeight: "bold",
//             color: "#333",
//             padding: 0,
//             marginLeft: 10,
//           }}
//           onClick={() => router.push("/")}
//         >
//           Log in
//         </Button>
//       )}

//       <style jsx>{`
//         @media (max-width: 750px) {
//           .desktop-nav {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Navbar;



"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import denso from "@/app/assets/plusdental.png";
import { useRouter, usePathname } from "next/navigation";
import { Button, Menu, Popover, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useUser } from "@/app/components/UserContext";

const Navbar = () => {
  const { username, setUsername } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = React.useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setMenuVisible(false);
    router.push("/");
  };

  const menuItems = [
    { key: "/components", label: "Retainer Data" },
    { key: "/components/Lab", label: "Scan QR Code" },
    { key: "/components/Dentallight", label: "Dentallight Data" },
    { key: "/components/Performance", label: "Performance Lab" },
    { key: "/components/Booking", label: "Booking" },
  ];

  const navLinks = menuItems.map((item) => {
    // ประกาศ allowedUsernames ภายใน map แต่ภายนอก onClick
    const allowedUsernames: any = [
      "Chanatip",
      "Adminlab1",
      "Adminlab2",
      "Adminlab3",
      "Station1(jub)",
      "Station1(gap)",
      "Station1(ane)",
      "Station2(an)",
      "Station2(pang)",
      "Station2(fluke)",
      "Station3(boom)",
      "Station3(dow)",
      "Station3(ear)",
      "Station4(boom)",
      "Station4(dow)",
      "Station4(ear)",
      "Station5(mind)",
      "Station5(alli)",
      "Messenger",
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

    return (
      <Typography.Link
        key={item.key}
        onClick={(e) => {
          // ตรวจสอบว่า username อยู่ใน allowedUsernames หรือไม่
          if (allowedUsernames.includes(username)) {
            router.push(item.key);
          } else {
            e.preventDefault();
          }
        }}
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          color:
            pathname === item.key ? "rgb(160, 160, 160)" : "rgb(26, 142, 250)",
          pointerEvents: allowedUsernames.includes(username) ? "auto" : "none",
          marginRight: "20px", // เพิ่ม gap ระหว่างลิ้งแต่ละตัว
        }}
      >
        {item.label}
      </Typography.Link>
    );
  });

  const userMenu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} onClick={() => router.push(item.key)}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item key="logout">
        <Button
          type="text"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
          style={{ width: "100%" }}
        >
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        borderBottom: "2px solid lightgray",
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        position: "relative",
        height: "60px",
        justifyContent: "space-between",
        backgroundImage: `url("https://images8.alphacoders.com/128/1283469.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "250px -300px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <Image src={denso} alt="denso" width={50} height={50} priority />

        <div className="desktop-nav">{navLinks}</div>
      </div>

      {username ? (
        <Popover
          content={userMenu}
          title="Select Options"
          trigger="click"
          open={menuVisible}
          onOpenChange={setMenuVisible}
        >
          <Button type="link" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {username}
          </Button>
        </Popover>
      ) : (
        <Button
          type="link"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            padding: 0,
            marginLeft: 10,
          }}
          onClick={() => router.push("/")}
        >
          Log in
        </Button>
      )}

      <style jsx>{`
        @media (max-width: 800px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;