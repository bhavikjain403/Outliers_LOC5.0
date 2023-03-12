// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Text,
  InputGroup,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import Card from "components/Card/Card";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useState, useEffect } from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import CouponApi from "api/coupons";
import { useAuth } from "auth-context/auth.context";

import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const defaultFormFields = {
  price: "",
  offer: "",
  discount_applied: "",
  recency: "",
};

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  const [coupon, setCoupons] = useState([]);

  const { user } = useAuth();

  const [prediction, setPrediction] = useState(defaultFormFields);
  const { price, offer, discount_applied, recency } = prediction;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrediction({ ...prediction, [name]: value });
  };

  const options = {
    // exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Coupons Usage",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}",
        dataPoints: coupon,
      },
    ],
  };

  useEffect(() => {
    CouponApi.getAllStaticCoupons(user?.data?.user?.company)
      .then((response) => {
        console.log(response.data.data);
        const couponsFormatted = response.data.data.map((item, index) => ({
          y: item.max_count,
          label: item.code,
        }));
        setCoupons(couponsFormatted);
        // console.log(couponsFormatted);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="28px">
        <MiniStatistics
          title={"Today's Moneys"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today's Users"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"New Clients"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Sales"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      {/* PIE CHART */}
      <Grid height={"450px"} paddingY={5}>
        <Card height={"420px"} paddingY={5}>
          <Flex>
            <CanvasJSChart options={options} />
          </Flex>
        </Card>
      </Grid>    
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="28px"
        mt={{ lg: "26px" }}
        mb={{ lg: "26px" }}
      >
        <Grid>
          <Card>
            <Text fontsize="xl" fontWeigt="bold">
              Predict Customer Retention on Previous Data
            </Text>
            <InputGroup>
              <Stack direction="column">
                <HStack>
                  <Text>History: </Text>
                  <Input name="price" value={price} onChange={handleChange} />
                </HStack>
                <Text textColor="gray">Price in Rs/-</Text>
                <HStack>
                  <Text>Offer: </Text>
                  <Input name="offer" value={offer} onChange={handleChange} />
                </HStack>
                <Text textColor="gray">
                  0 for BOGO, 1 for Discount, 2 for No Offer
                </Text>
                <HStack>
                  <Text>Discount: </Text>
                  <Input
                    type="boolean"
                    name="discount_applied"
                    value={discount_applied}
                    onChange={handleChange}
                  />
                </HStack>
                <Text textColor="gray">
                  0 for Coupon Applied, 1 for No Coupons
                </Text>
                <HStack>
                  <Text>Recency: </Text>
                  <Input
                    name="recency"
                    value={recency}
                    onChange={handleChange}
                  />
                </HStack>
                <Text textColor="gray">
                  How many times user has purchased before
                </Text>
              </Stack>
            </InputGroup>
            <Button type="submit">Predict Customer Retention</Button>
          </Card>
        </Grid>
        <SalesOverview
          title={"Sales Overview"}
          percentage={5}
          chart={<LineChart />}
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <Projects
          title={"Projects"}
          amount={30}
          captions={["Companies", "Members", "Budget", "Completion"]}
          data={dashboardTableData}
        />
        <OrdersOverview
          title={"Orders Overview"}
          amount={30}
          data={timelineData}
        />
      </Grid>
    </Flex>
  );
}
