// Chakra imports

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Flex,
  Table,
  HStack,
  Tbody,
  Button,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import React, { useState, ChangeEvent } from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TablesTableRow from "components/Tables/TablesTableRow";
import { useEffect } from "react";
import CouponApi from "api/coupons";
import { useAuth } from "auth-context/auth.context";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import { AttachmentIcon, CheckIcon } from "@chakra-ui/icons";

function Tables() {
  const columns = [
    { field: "code", headerName: "Code", width: 125 },
    { field: "active", headerName: "Active", type: "boolean", width: 80 },
    { field: "creator_email", headerName: "Creator", width: 180 },
    {
      field: "max_count",
      headerName: "Max Redeems",
      type: "number",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      type: "dateTime",
      width: 180,
    },
    {
      field: "expires_at",
      headerName: "Expires At",
      type: "dateTime",
      width: 180,
    },
    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<BsFillChatLeftDotsFill />}
          label="Add"
          //TODO: add functionality to this button
          onClick={() => console.log("hi")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<BsFillChatLeftDotsFill />}
          label="Functionality"
          //TODO: add functionality to this button
          onClick={() => console.log("hi")}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<BsFillChatLeftDotsFill />}
          label="pls"
          //TODO: add functionality to this button
          onClick={() => console.log("hi")}
          showInMenu
        />,
      ],
    },
  ];

  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [dCoupons, setDCoupons] = useState([]);

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("Hello");
    if (!file) {
      return;
    }
    console.log("Hello");

    // 👇 Uploading the file using the fetch API to the server
    fetch("http://127.0.0.1:5000/sender", {
      method: "POST",
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(user);
    CouponApi.getAllStaticCoupons(user?.data?.user?.company || user?.company)
      .then((response) => {
        console.log(response);
        const couponseFormatted = response.data.data.map((item, index) => ({
          ...item,
          id: index,
          createdAt: new Date(item.createdAt),
          expires_at: new Date(item.expires_at),
          active: !item.expired,
        }));
        setCoupons(couponseFormatted);
      })
      .catch((error) => {
        console.log(error);
      });

    CouponApi.getAllDynamicCoupons(user?.data?.user?.company || user?.company)
      .then((response) => {
        console.log(response);
        const couponseFormatted = response.data.data.map((item, index) => ({
          ...item,
          id: index,
          createdAt: new Date(item.createdAt),
          expires_at: new Date(item.expires_at),
          active: !item.expired,
        }));
        setDCoupons(couponseFormatted);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card mb={"1em"}>
        <Stack direction="column">
          <Text fontWeight="bold" fontSize="xl">
            Input User Data File or use previously uploaded File:{" "}
          </Text>

          <InputGroup>
            <InputLeftElement children={<AttachmentIcon />} />
            <Input
              type="file"
              border={0}
              width={"35%"}
              onChange={handleFileChange}
            ></Input>
            <Button colorScheme="linkedin" onClick={handleUpload}>
              Upload{" "}
              <span>
                {"  "} {<CheckIcon />}
              </span>
            </Button>
          </InputGroup>

          <HStack>
            <Button colorScheme="teal">Send Coupons on Mail</Button>
            <Button colorScheme="teal">Send Coupons on SMS</Button>
          </HStack>
        </Stack>
      </Card>
      <Card>
        <Text fontSize={30} fontWeight={700} mb={5}>
          Static Coupons
        </Text>
        <DataTable rows={coupons} columns={columns} />
      </Card>
      <Card>
        <Text fontSize={30} fontWeight={700} mb={5}>
          Dynamic Coupons
        </Text>
        <DataTable rows={dCoupons} columns={columns} />
      </Card>
    </Flex>
  );
}

function DataTable({ rows, columns }) {
  const MuiTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 1,
            borderColor: colors.grey,
            borderStyle: "solid",
            borderRadius: 10,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            backgroundColor: colors.blueGrey[900],
            color: "#C1C2C5",
            padding: 10,
          },
        },
      },
    },
  });

  return (
    <div style={{ height: "500px", maxHeight: "100vh", width: "100%" }}>
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </ThemeProvider>
    </div>
  );
}

export default Tables;
