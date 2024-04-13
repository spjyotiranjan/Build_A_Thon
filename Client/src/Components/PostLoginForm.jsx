import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { AppContext } from "../Context/ParentContext";

const PostLoginForm = ({ showModal, setShowModal }) => {
  // console.log(showModal);
  const {
    userData,
    setUserData,
    isSocialLogin,
    setIsSocialLogin,
    setNavDisplay,
    setFooterDisplay,
    loginDone,
    setLoginDone,
    allUsers,
    setAllUsers,
  } = useContext(AppContext);
  const { user, isLoading } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState("");
  const postData = ()=>{
    const Name = `${isSocialLogin ? userData.name : input}`
    console.log(Name);
    const userObject = {
      Name: Name.slice(0,20),
      Email: userData.email,
      Username: `${isSocialLogin ? input : userData.username}`,
    };
    axios
      .post(import.meta.env.VITE_USER_API, { ...userObject })
      .then((res) => {
        console.log(res.data);
        setInput("")
        setLoginDone(true)
      }).catch((err)=>{
        console.log(err);
      });
  }
  const handleClose = (e) => {
    e.preventDefault();
    postData()
  };
  useLayoutEffect(() => {
    axios
      .get(import.meta.env.VITE_USER_API)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginDone]);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showModal}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        // as={"flex"}
        py={"2vw"}
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        borderRadius={["unset", "2xl"]}
        w={["90%", "55%", null, "40%"]}
        bgColor={"#102230f7"}
      >
        <ModalHeader
          textAlign={"center"}
          color={"white"}
          className="astro"
          letterSpacing={"0.1vw"}
        >
          New to the Website !
        </ModalHeader>
        <ModalBody py={6} justify="center" align="center">
          <Text color={"white"} fontSize={["2vw", "1.4vw"]}>
            {isSocialLogin
              ? "Please Provide a Username"
              : "Please Provide a Name"}
          </Text>
          <Input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            w={["70vw", "40vw", null, "25vw"]}
            h={["10vw", "5vw", null, "3vw"]}
            my={"1vw"}
            bgColor={"#00335Ce6"}
            outline={"none"}
            border={"2px solid #092A44"}
            borderRadius={["2vw", "1vw", null, "0.5vw"]}
            textAlign={"center"}
            color={"#ffffffe6"}
          />
          <Text></Text>
          <Text
            color={"#ffffff50"}
            fontStyle={"italic"}
            w={"90%"}
            fontSize={["0.8vw", "1vw"]}
          >
            It helps us to identify you better <br />
            (You have to give this information to proceed with the website)
          </Text>
        </ModalBody>

        <ModalFooter m={"0 auto"}>
          <Button
            bgColor={"#01EAF980"}
            mt={["5vw", "1vw"]}
            fontSize={["2vw", "1.4vw"]}
            color={"white"}
            w={["35vw", "12vw"]}
            h={["7vh", "7vh", "6.5vh", "8vh"]}
            borderRadius={["3.5vh", "3.5vh", "3.25vh", "4.25vh"]}
            backdropFilter={"auto"}
            backdropBlur={"2px"}
            shadow={"0 0 1vw #10223080"}
            _hover={{
              bgColor: "#01EAF9b3",
              shadow: "0 0 0.7vw #10223080",
              transform: "scale(1.01)",
              transition: "transform 0.3s",
            }}
            onClick={(e) => {
              handleClose(e);
            }}
          >
            Add {isSocialLogin ? "Username" : "Name"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostLoginForm;
