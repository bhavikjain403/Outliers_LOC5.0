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
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import Card from "components/Card/Card";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import React, { useEffect, useRef, useState } from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
  const [value, setValue] = React.useState("static");
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const [collectionList, setCollectionList] = useState([]);
  const collectionRef = useRef();

  useEffect(() => {
    if (collectionRef.current) {
      collectionRef.current.value = "";
    }
  }, [collectionList]);

  const [discountType, setDiscountType] = useState("percent");
  const [discount, setDiscount] = useState();

  const startDateRef = useRef();
  const endDateRef = useRef();
  const couponRef = useRef();
  const redeemsNum = useRef();
  const sendEmailRef = useRef();

  const { user } = useAuth();

  const newCondition = {
    pre: null,
    equ: null,
    suf: null,
  };
  const newEffect = {
    effect: null,
    offer: null,
  };

  const [conditions, setConditions] = useState([]);
  const [effects, setEffects] = useState([]);

  const [uploadFile, hanndleUploadChange] = Upload();

  useEffect(() => {
    setCollectionList((prev) => [...new Set([...prev, ...uploadFile])]);
  }, [uploadFile]);

  function generateCoupon() {
    console.log(user);
    const data = {
      company_name: user?.data?.user?.company || user?.company,
      creator_email: user?.data?.user?.email || user?.email,
      code: couponRef.current.value,
      max_count: parseInt(redeemsNum.current.value),
      product_categories: collectionList,
      createdAt: new Date(),
      expires_at: new Date(Date.parse(endDateRef.current.value)),
      expired: false,
      verify_count: 0,
      discount:
        discountType == "amount"
          ? Math.max(0, discount)
          : Math.max(0, Math.min(100, discount)),
      type: discountType,
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

  function generateDCoupon() {
    const data = {
      company_name: user?.data?.user?.company,
      creator_email: user?.data?.user?.email,
      expires_at: new Date(Date.parse(endDateRef.current.value)),
      expired: false,
      user_list: collectionList,
      send_email: sendEmailRef.current.checked,
      rules: JSON.stringify({ conditions, effects }),
      users: {},
    };
    CouponApi.generateDynamicCoupon(data)
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
            <Flex
              direction="row"
              width={"100%"}
              justifyContent={"center"}
              gap={10}
            >
              <Button
                rounded={"md"}
                px={10}
                onClick={() => setValue("static")}
                variant={"outline"}
                style={{
                  backgroundColor:
                    value == "static" ? "rgb(237, 242, 247)" : "white",
                }}
              >
                Static
              </Button>
              <Button
                rounded={"md"}
                px={10}
                onClick={() => setValue("dynamic")}
                variant={"outline"}
                style={{
                  backgroundColor:
                    value == "dynamic" ? "rgb(237, 242, 247)" : "white",
                }}
              >
                Dynamic
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Card>
      {value == "static" ? (
        <>
          <Card>
            <Flex>
              {/* <Divider marginY={5} borderColor="#fff" /> */}
              <Box>
                <Title>Discount Code</Title>
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
                      discountType == "percent"
                        ? "rgb(237, 242, 247)"
                        : "white",
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
                <NumberInput style={{ flex: 1 }}>
                  <NumberInputField
                    onChange={(e) => setDiscount(e.target.value)}
                  />
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
                  <InputLeftElement
                    children={<SearchIcon />}
                  ></InputLeftElement>
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
                  Add
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
                  <Text fontWeight={600}>End Date</Text>
                  <Input type="datetime-local" ref={endDateRef}></Input>
                </Stack>
              </Flex>
            </Box>
          </Card>
        </>
      ) : (
        <>
          <Card mb={"1em"}>
            <Title>Rules</Title>
            <Box px={20}>
              <Title>Conditions</Title>
              <Box px={10} mb={10}>
                {conditions.map((item, index) => {
                  return (
                    <>
                      {index != 0 && (
                        <Divider
                          ml={4}
                          orientation={"vertical"}
                          h={"50px"}
                          w={"1px"}
                          backgroundColor={"grey"}
                        />
                      )}
                      <ConditionFlex
                        item={item}
                        set={setConditions}
                        key={index}
                        index={index}
                      />
                    </>
                  );
                })}
                <Divider
                  ml={4}
                  mb={1}
                  orientation={"vertical"}
                  h={"50px"}
                  w={"1px"}
                  backgroundColor={"grey"}
                />
                <AiOutlinePlusCircle
                  size={30}
                  onClick={() => {
                    setConditions((prev) => [...prev, newCondition]);
                  }}
                />
              </Box>
              <Title>Effects</Title>
              <Box px={10} mb={5}>
                {effects.map((item, index) => {
                  return (
                    <>
                      {index != 0 && (
                        <Divider
                          ml={4}
                          orientation={"vertical"}
                          h={"50px"}
                          w={"1px"}
                          backgroundColor={"grey"}
                        />
                      )}
                      <EffectFlex
                        item={item}
                        set={setEffects}
                        key={index}
                        index={index}
                      />
                    </>
                  );
                })}
                <Divider
                  ml={4}
                  mb={1}
                  orientation={"vertical"}
                  h={"50px"}
                  w={"1px"}
                  backgroundColor={"grey"}
                />
                <AiOutlinePlusCircle
                  size={30}
                  onClick={() => {
                    setEffects((prev) => [...prev, newEffect]);
                  }}
                />
              </Box>
            </Box>
          </Card>
          <Card mb={5}>
            <Box>
              <Title>Applies to</Title>
              <Text fontWeight={500}>User IDs</Text>
              <HStack marginY={4}>
                <InputGroup>
                  <InputLeftElement
                    children={<SearchIcon />}
                  ></InputLeftElement>
                  <Input placeholder="Search Collections" ref={collectionRef} />
                </InputGroup>
                <input type="file" accept="application/JSON" onChange={hanndleUploadChange} />
                <Button
                  rounded={"md"}
                  onClick={() => {
                    setCollectionList((prev) => [
                      ...prev,
                      collectionRef.current.value,
                    ]);
                  }}
                >
                  Add
                </Button>
              </HStack>
              <Box>
                {collectionList.map((item, index) => {
                  return (
                    <Button key={index} mx={1} mb={2}>
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
                  <Text fontWeight={600}>End Date</Text>
                  <Input type="datetime-local" ref={endDateRef}></Input>
                </Stack>
              </Flex>
            </Box>
            <Divider mt={5} />
            <Box mt={5}>
              <Flex direction={"column"}>
                <Title>Notify Users</Title>
                <Checkbox px={5} ref={sendEmailRef}>
                  Notify Users via Email
                </Checkbox>
              </Flex>
            </Box>
          </Card>
        </>
      )}
      <Button
        onClick={() =>
          value == "static" ? generateCoupon() : generateDCoupon()
        }
      >
        Save
      </Button>
    </Flex>
  );
}

const preconditions = [
  "cart-value",
  "product-type",
  "loyalty-points",
  "region",
];
const equators = ["equals", "greater-than", "lesser-than"];
const validation = {
  "cart-value": ["equals", "greater-than", "lesser-than"],
  "product-type": ["equals"],
  "loyalty-points": ["equals", "greater-than", "lesser-than"],
  region: ["equals"],
};

const couponType = ["free", "discount", "cashback"];

const couponInputs = {
  free: null,
  discount: "percent",
  cashback: "amount",
};

const inputTypes = {
  "cart-value": "number",
  "product-type": "string",
  "loyalty-points": "number",
  region: "string",
};

function ConditionFlex({ item: { pre, equ, suf }, set, index }) {
  console.log(index, pre, equ, suf);
  const setStuff = {
    set,
    arrIdx: index,
  };
  return (
    <Flex ml={2} mb={1} alignItems={"center"}>
      <Text mr={3} ml={index == 0 ? 0 : -6} fontSize={20} color={"#4287f5"}>
        {index == 0 ? "IF" : "AND"}
      </Text>
      <NewMenu
        items={preconditions}
        menuItem={pre}
        type={"pre"}
        {...setStuff}
      />
      <NewMenu items={equators} menuItem={equ} type={"equ"} {...setStuff} />
      <NewMenu preItem={pre} menuItem={suf} type={"suf"} {...setStuff} />
    </Flex>
  );
}

function EffectFlex({ item: { effect, offer }, set, index }) {
  console.log(index, effect, offer);
  const setStuff = {
    set,
    arrIdx: index,
  };
  return (
    <Flex ml={2} mb={1} alignItems={"center"}>
      <Text mr={3} ml={index == 0 ? -7 : -5} fontSize={20} color={"#4287f5"}>
        {index == 0 ? "THEN" : "AND"}
      </Text>
      <NewMenu
        items={couponType}
        menuItem={effect}
        type={"effect"}
        {...setStuff}
      />
      <NewMenu preItem={effect} menuItem={offer} type={"offer"} {...setStuff} />
    </Flex>
  );
}

function NewMenu({ preItem, items, menuItem, type, set, arrIdx }) {
  if (type === "pre" || type === "equ" || type === "effect") {
    return (
      <Box mr={10}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<BiChevronDown />}
                w={40}
              >
                {menuItem ? menuItem : "Enter"}
              </MenuButton>
              <MenuList>
                {items.map((arrItem, index) => {
                  console.log(menuItem);
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        set((itemsToBeSet) => [
                          ...itemsToBeSet.slice(0, arrIdx),
                          {
                            ...itemsToBeSet[arrIdx],
                            [type]: arrItem,
                          },
                          ...itemsToBeSet.slice(arrIdx + 1),
                        ]);
                      }}
                    >
                      {arrItem}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    );
  } else if (type === "suf") {
    if (inputTypes[preItem] == "number") {
      return (
        <NumberInput style={{ flex: 1 }}>
          <NumberInputField
            onChange={(e) => {
              e.persist();
              set((items) => [
                ...items.slice(0, arrIdx),
                {
                  ...items[arrIdx],
                  [type]: e?.target?.value,
                },
                ...items.slice(arrIdx + 1),
              ]);
            }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      );
    } else {
      return (
        <Input
          onChange={(e) => {
            e.persist();
            set((items) => [
              ...items.slice(0, arrIdx),
              {
                ...items[arrIdx],
                [type]: e?.target?.value,
              },
              ...items.slice(arrIdx + 1),
            ]);
          }}
        ></Input>
      );
    }
  } else {
    if (couponInputs[preItem]) {
      return (
        <NumberInput style={{ flex: 1 }}>
          <NumberInputField
            onChange={(e) => {
              e.persist();
              set((items) => [
                ...items.slice(0, arrIdx),
                {
                  ...items[arrIdx],
                  [type]: e?.target?.value,
                },
                ...items.slice(arrIdx + 1),
              ]);
            }}
          />
          <InputRightElement
            children={couponInputs[preItem] == "percent" ? "%" : "₹"}
          ></InputRightElement>
        </NumberInput>
      );
    } else {
      return <></>;
    }
  }
}

function Title(props) {
  return (
    <Text fontSize="xl" fontWeight="bold" mb={5}>
      {props.children}
    </Text>
  );
}

export function Upload() {
  const [files, setFiles] = useState("");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const jsonResult = JSON.parse(e.target.result);
      const emails = jsonResult.map((item, index) => item.Email);
      console.log("e.target.result", emails);
      setFiles(emails);
    };
  };
  return [files, handleChange];
}

export default Billing;
