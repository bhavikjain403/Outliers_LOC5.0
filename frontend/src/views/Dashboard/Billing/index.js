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
import React, { useEffect } from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
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
            <Button rounded={"md"} px={10}>
              Percentage
            </Button>
            <Button rounded={"md"} px={10}>
              Fixed Amount
            </Button>
            <InputGroup>
              <Input />
              <InputRightElement children="%"></InputRightElement>
            </InputGroup>
          </HStack>
          <Title></Title>
        </Flex>
        <Divider marginY={5} borderColor="#fff" />
        <Box>
          <Text fontSize="l" fontWeight="bold" marginY={2}>
            Applies to
          </Text>
          <RadioGroup onChange={setValue} value={value}>
            <Radio value="1">Specific Collections</Radio>
            <Stack direction="column">
              <Radio value="2">Specific Products</Radio>
            </Stack>
          </RadioGroup>
          <HStack marginY={4}>
            <InputGroup>
              <InputLeftElement children={<SearchIcon />}></InputLeftElement>
              <Input placeholder="Search Collections" />
            </InputGroup>
            <Button rounded={"md"}>Browse</Button>
          </HStack>
        </Box>
      </Card>

      <Card mb={"1em"}>
        <Box>
          <Title>Minimum Purchase Requirements</Title>
          <RadioGroup onChange={setValue} value={value}>
            <Radio value="1">No Minimum Requirements</Radio>
            <Stack direction="column">
              <Radio value="2">Minimum Purchase Amount (₹)</Radio>
              <InputGroup>
                <InputLeftElement children="₹" paddingx={2} />
                <Input width="150px" />
              </InputGroup>
              <Text color="gray" marginY={2}>
                Applies only to selected products
              </Text>
            </Stack>
            <Radio value="3">Minimum Quantity of Items</Radio>
          </RadioGroup>
        </Box>
      </Card>

      <Card mb={"1em"}>
        <Box>
          <Title>Customer Eligibility</Title>
          <RadioGroup onChange={setValue} value={value}>
            <Radio value="1">All Customers</Radio>
            <Stack direction="column">
              <Radio value="2">Specific Customer Segments</Radio>
            </Stack>
            <Radio value="3">Specific Customers</Radio>
          </RadioGroup>
          <HStack>
            <InputGroup marginY={5}>
              <InputLeftElement children={<SearchIcon />} />
              <Input />
            </InputGroup>
            <Button rounded={"md"}>Browse</Button>
          </HStack>
        </Box>
      </Card>

      <Card mb={"1em"}>
        <Box>
          <Title>Maximum Discount Uses</Title>
          <CheckboxGroup onChange={setValue} value={value}>
            <Stack mb={"0.8em"}>
              <Checkbox>
                Limit number of times this discount can be used
              </Checkbox>
              <Input width={60} focusBorderColor="black.400"></Input>
            </Stack>
            <Stack direction="column">
              <Checkbox>Limit to one per user</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Card>

      <Card mb={"1em"}>
        <Box>
          <Title>Combinations</Title>
          <Text mb={"0.8em"}>This product can be combined with:</Text>
          <CheckboxGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Checkbox>Other Products</Checkbox>
              <Checkbox>Shipping Discountsr</Checkbox>
            </Stack>
          </CheckboxGroup>
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
