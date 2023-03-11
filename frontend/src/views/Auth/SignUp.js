// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";

import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import signInImage from "assets/img/incento.png";

import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const history = useHistory();
  const { user } = useAuth();

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    AuthApi.Register(formData).then(response => {
      if(response.data) {
        return history.push("/auth/signin");
      } else {
        setError("There has been an error.");
      }
    }).catch(error => {
      setError("There has been an error.");
    })
  }

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        {user && user.token ? (
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
            >
              <Heading color={titleColor} fontSize="32px" mb="10px">
                You are already signed in.
              </Heading>
            </Flex>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
            >
              <Heading color={titleColor} fontSize="32px" mb="10px">
                Welcome To Incento !!
              </Heading>
              <FormControl isRequired>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Name
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Your full name'
              mb='12px'
              size='lg'
              name="name"
              onChange={handleChange}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Company Name
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Your full name'
              mb='12px'
              size='lg'
              name="company"
              onChange={handleChange}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Email
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='email'
              placeholder='Your email address'
              mb='12px'
              size='lg'
              name="email"
              onChange={handleChange}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='password'
              placeholder='Your password'
              mb='12px'
              size='lg'
              name="password"
              onChange={handleChange}
            />
            {/* <FormControl display='flex' alignItems='center' mb='24px'>
              <Switch id='remember-login' colorScheme='teal' me='10px' />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Remember me
              </FormLabel>
            </FormControl> */}
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color="red" marginBottom="15px" fontWeight='medium'>
                {error}
              </Text>
            </Flex>
            <Button
              onClick={handleSubmit}
              type='submit'
              bg='teal.300'
              fontSize='15px'
              color='white'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}>
              SIGN UP
            </Button>
          </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Already have an account?
                  <Link
                    color={titleColor}
                    href="#/auth/signin"
                    ms="5px"
                    fontWeight="bold"
                  >
                    Sign In
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bg="teal.100"
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;