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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import CouponApi from "api/coupons";
import { useAuth } from "auth-context/auth.context";

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

  const [discountType, setDiscountType] = useState("percent");
  const [discount, setDiscount] = useState();

  const startDateRef = useRef();
  const endDateRef = useRef();
  const couponRef = useRef();
  const redeemsNum = useRef();

  const { user } = useAuth();

  function generateCoupon() {
    console.log(user)
    const data = {
      company_name: user?.company,
      code: couponRef.current.value,
      max_count: parseInt(redeemsNum.current.value),
      creator_email: user?.email,
      product_categories: collectionList,
      expires_at: new Date(Date.parse(endDateRef.current.value)),
      expired: false,
      verify_count: 0,
      discount: discountType=="amount"? Math.max(0,discount): Math.max(0,Math.min(100,discount)),
      type:discountType,
      users: {},
    };
    CouponApi.generateStaticCoupon(data)
      .then((response) => {
        console.log(response.data.data);
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
  }

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
              <Input ref={couponRef}></Input>
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
            <Button
              rounded={"md"}
              px={10}
              onClick={() => setDiscountType("percent")}
              variant={"outline"}
              style={{
                backgroundColor:
                  discountType == "percent" ? "rgb(237, 242, 247)" : "white",
              }}
            >
              Percentage
            </Button>
            <Button
              rounded={"md"}
              px={10}
              onClick={() => setDiscountType("amount")}
              variant={"outline"}
              style={{
                backgroundColor:
                  discountType == "amount" ? "rgb(237, 242, 247)" : "white",
              }}
            >
              Fixed Amount
            </Button>
            {/* <InputGroup> */}
              <NumberInput style={{flex:1}} >
              <NumberInputField onChange={(e) => setDiscount(e.target.value)} />
              <InputRightElement
                children={discountType == "percent" ? "%" : "₹"}
              ></InputRightElement>
              </NumberInput>
            {/* </InputGroup> */}
          </HStack>
        </Flex>
        <Divider marginY={5} borderColor="#fff" />
        <Title>Max Redeems</Title>
        <NumberInput>
          <NumberInputField ref={redeemsNum} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
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
          {/* <Flex>
            <Stack direction="column" marginX={4}>
              <Text>Start Date</Text>
              <Input type="datetime-local" ref={startDateRef}></Input>
            </Stack>
          </Flex> */}
          {/* <Checkbox paddingY={3}>Set End Date</Checkbox> */}
          <Flex>
            <Stack direction="column" marginX={4}>
              <Text>End Date</Text>
              <Input type="datetime-local" ref={endDateRef}></Input>
            </Stack>
          </Flex>
        </Box>
      </Card>
      <Button onClick={() => generateCoupon()}>Save</Button>
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
