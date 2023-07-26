import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { APP_NAME, CLOUD_NAME, BACKEND_URL, UPLOAD_URL } from "../../data/config";
const Signup = () => {
  const [show, setShow] = useState(false);
  const [cnfshow, setcnfShow] = useState(false);

  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Do something with the reader result if needed.
        // For example, you can display a preview of the selected image.
        const previewUrl = reader.result;
      };
      reader.readAsDataURL(file);

      // Pass the selected file to the parent component's function for further processing.
      postDetails(file);
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json',
            mode:'cors'
        },
      };
      const { data } = await axios.post(
       `${BACKEND_URL}/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
       
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", `${APP_NAME}`);
        data.append("cloud_name", `${CLOUD_NAME}`);
    axios.post(
    `${UPLOAD_URL}`,
     data
   )
    .then((response) => {
      setPic(response.data.secure_url);
      setPicLoading(false);
    })
    .catch((error) => {
    
      setPicLoading(false);
    });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="pic" w="120px">
        <Flex direction="column" alignItems="center">
          <FormLabel>Profile Picture</FormLabel>
          <Box
            p={1.5}
            borderWidth={2}
            borderRadius="full"
            borderColor="gray.300"
            overflow="hidden"
            w="120px"
            h="120px"
            margin="auto"
            bg="gray.100"
          >
            {/* Profile picture preview */}
            {pic ? (
              <Image
                src={pic}
                alt="Profile Picture"
                borderRadius="full"
                w="100%"
                h="100%"
                objectFit="cover"
                fallbackSrc="../../src/assets/blankprofile.png"
              />
            ) : (
              <Image
                src="../../src/assets/blankprofile.png"
                borderRadius="full"
                alt="Profile Picture"
                w="100%"
                h="100%"
                objectFit="cover"
              />
            )}

            {/* Input element */}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              display="block"
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              opacity="0"
              cursor="pointer"
            />
          </Box>
        </Flex>
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={cnfshow ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>setcnfShow(!cnfshow)}>
              {cnfshow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
   
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;