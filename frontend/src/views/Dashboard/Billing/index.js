// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Icon,
  Stack,
  Text,
  useCheckbox,
  useCheckboxGroup,
  chakra,
  RadioGroup,
  Radio,
  Spacer,
  Input,
  HStack,
  Button,
  Divider,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import Card from "components/Card/Card";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import React, { useEffect, useRef, useState } from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";
import BillingInformation from "./components/BillingInformation";
import CreditCard from "./components/CreditCard";
import Invoices from "./components/Invoices";
import PaymentMethod from "./components/PaymentMethod";
import PaymentStatistics from "./components/PaymentStatistics";
import Transactions from "./components/Transactions";
import { FiSearch } from "react-icons/fi";
import { SearchIcon } from "@chakra-ui/icons";

function Billing() {
  const [value, setValue] = React.useState("1");
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const [collectionList, setCollectionList] = useState([]);
  const collectionRef = useRef();

  useEffect(() => {
    collectionRef.current.value = "";
  }, [collectionList]);

  const [discountType, setDiscountType] = useState('percent')
  const [discount, setDiscount] = useState()

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card mb={"1em"}>
        <Flex direction="column">
          <Box>
            <Title>Coupon Type</Title>
            <RadioGroup onChange={setValue} value={value}>
              <Radio value="1">Static Coupon</Radio>
              <Stack direction="column">
                <Radio value="2">Dynamic Coupon</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Divider marginY={5} borderColor="#fff" />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Discount Code
            </Text>
            <HStack marginBottom={2}>
              <Input></Input>
              <Button rounded={"md"}>Generate</Button>
            </HStack>
            <Text fontSize={15} textColor="gray">
              Customers must enter this code at checkout
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card mb={"1em"}>
        <Flex direction={"column"}>
          <Title>Value</Title>
          <HStack w={"100%"}>
            <Button rounded={"md"} px={10} onClick={()=>setDiscountType("percent")} variant={"outline"} style={{backgroundColor:discountType=="percent"?"rgb(237, 242, 247)":"white"}}>
              Percentage
            </Button>
            <Button rounded={"md"} px={10} onClick={()=>setDiscountType("rupees")} variant={"outline"} style={{backgroundColor:discountType=="rupees"?"rgb(237, 242, 247)":"white"}}>
              Fixed Amount
            </Button>
            <InputGroup>
              <Input onChange={(e)=>setDiscount(e.target.value)} />
              <InputRightElement children={discountType=="percent"?"%":"₹"}></InputRightElement>
            </InputGroup>
          </HStack>
        </Flex>
        <Divider marginY={5} borderColor="#fff" />
        <Box>
          <Title>Applies to</Title>
          <Text fontWeight={500}>Collection Name</Text>
          <HStack marginY={4}>
            <InputGroup>
              <InputLeftElement children={<SearchIcon />}></InputLeftElement>
              <Input placeholder="Search Collections" ref={collectionRef} />
            </InputGroup>
            <Button
              rounded={"md"}
              onClick={() => {
                setCollectionList((prev) => [
                  ...prev,
                  collectionRef.current.value,
                ]);
              }}
            >
              Browse
            </Button>
          </HStack>
          <Box>
            {collectionList.map((item, index) => {
              return (
                <Button key={index} mx={1}>
                  {item}{" "}
                  <MdDeleteForever
                    onClick={() =>
                      setCollectionList((prev) =>
                        prev.filter((collItem) => collItem != item)
                      )
                    }
                    style={{ marginLeft: "0.5rem" }}
                    size={30}
                  />{" "}
                  <button></button>
                </Button>
              );
            })}
          </Box>
        </Box>
      </Card>

      <Card mb={"1em"}>
        <Box>
          <Title>Active Dates</Title>
          <Flex>
            <Stack direction="column" marginX={4}>
              <Text>Start Date</Text>
              <Input type="date"></Input>
            </Stack>
            <Stack direction="column">
              <Text>Start Time (EST)</Text>
              <Input type="time"></Input>
            </Stack>
          </Flex>
          <Checkbox paddingY={3}>Set End Date</Checkbox>
          <Flex>
            <Stack direction="column" marginX={4}>
              <Text>End Date</Text>
              <Input type="date"></Input>
            </Stack>
            <Stack direction="column">
              <Text>End Time (EST)</Text>
              <Input type="time"></Input>
            </Stack>
          </Flex>
        </Box>
      </Card>
    </Flex>
  );
}

function Title(props) {
  return (
    <Text fontSize="xl" fontWeight="bold" mb={5}>
      {props.children}
    </Text>
  );
}

export default Billing;
