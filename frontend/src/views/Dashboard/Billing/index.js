// Chakra imports
import {
  Box,
  Checkbox,
  CheckboxGroup,
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

function Billing() {
  const [value, setValue] = React.useState("1");
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
      <Card>
        <Flex direction={"column"}>
            <Title>Value</Title>
            <HStack w={"100%"} >
              <Button rounded={"md"} px={10}>Percentage</Button>
              <Button rounded={"md"} px={10}>Fixed Amount</Button>
              <Input></Input>
            </HStack>
            <Title></Title>
        </Flex >
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
