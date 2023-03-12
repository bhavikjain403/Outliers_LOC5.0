/*eslint-disable*/
// chakra imports
import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card.js";
import IconBox from "components/Icons/IconBox";
import { CreativeTimLogo } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import signInImage from "../../assets/img/incento.png";
import SidebarHelpImage from "../../assets/img/SidebarHelpImage.png";
// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, routes }) => {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Card>
              <div key={prop.name}>
                <Text
                  color={activeColor}
                  fontWeight="bold"
                  fontSize={30}
                  mb={{
                    xl: "12px",
                  }}
                  mx="auto"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="12px"
                >
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
                {createLinks(prop.views)}
              </div>
            </Card>
          </>
        );
      }
      return (
        <>
          <Card>
            <NavLink to={prop.layout + prop.path} key={prop.name}>
              {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg={activeBg}
                  mb={{
                    xl: "12px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="12px"
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex alignItems="center">
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg="teal.300"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={activeColor} my="auto" fontSize="xl">
                      {document.documentElement.dir === "rtl"
                        ? prop.rtlName
                        : prop.name}
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "12px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="12px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex alignItems="center">
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={inactiveBg}
                        color="teal.300"
                        h="30px"
                        w="30px"
                        me="12px"
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={inactiveColor} my="auto" fontSize="xl">
                      {document.documentElement.dir === "rtl"
                        ? prop.rtlName
                        : prop.name}
                    </Text>
                  </Flex>
                </Button>
              )}
            </NavLink>
          </Card>
        </>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box>
        <Link
          href={`${process.env.PUBLIC_URL}/#/`}
          target="_blank"
          display="flex"
          lineHeight="100%"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          <img src={signInImage} />
        </Link>
        <Separator></Separator>
      </Box>
      <Stack direction="column" mb="10px">
        {links}
        <Box mt="24px">
          <Flex
            borderRadius="15px"
            flexDirection="column"
            bgImage={SidebarHelpImage}
            justifyContent="flex-start"
            alignItems="start"
            boxSize="border-box"
            p="16px"
            h="170px"
            w="100%"
          >
            <IconBox width="35px" h="35px" bg="white" mb="auto">
              <QuestionIcon color="teal.300" h="18px" w="18px" />
            </IconBox>
            <Text fontSize="sm" color="white" fontWeight="bold">
              Need help?
            </Text>
            <Text fontSize="xs" color="white" mb="10px">
              Please check our docs
            </Text>
            <Link
              w="100%"
              href="https://documenter.getpostman.com/view/17263120/2s93JtQPPx"
              target="_blank"
            >
              <Button
                fontSize="10px"
                fontWeight="bold"
                w="100%"
                bg="white"
                _hover="none"
                _active={{
                  bg: "white",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                color="black"
              >
                API DOCS
              </Button>
            </Link>
          </Flex>
        </Box>
      </Stack>
      <SidebarHelp />
    </>
  );
};

export default SidebarContent;
