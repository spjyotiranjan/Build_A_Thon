import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, VStack, Text, Button, Flex, Img } from "@chakra-ui/react";
import Background from "./../assets/Boy_Learning.jpg";
import "./../Font.css";
import { AppContext } from "../Context/ParentContext";
import LearningAI from "./../assets/LearningAI.png";
import { useNavigate } from "react-router-dom";
import PostLoginForm from "./PostLoginForm";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(null)
  const [showModal, setShowModal] = useState(false);
  const exploreRef = useRef()
  const { user, isLoading,isAuthenticated } = useAuth0();


  const {
    userData,
    setUserData,
    setLoginDone,
    loginDone,
    accessToken,
    isSocialLogin,
    setIsSocialLogin,
    allUsers,
    setUserId,
    userId
  } = useContext(AppContext);
useEffect(() => {
  if (!isLoading) {
    if (accessToken != "") {
      const options = {
        method: "GET",
        url: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users`,
        params: { q: `email:${user.email}`, search_engine: "v3" },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .request(options)
        .then((response) => {
          setUserData(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}, [user]);
useEffect(() => {
  if (Object.keys(userData).length != 0) {
    setIsSocialLogin(userData.identities[0].isSocial);
    allUsers.forEach((e) => {
      if (e.Email === userData.email) {
        setLoginDone(true);
        console.log(e._id);
        setUserId(e._id)
        return;
      }
    });
  }
}, [userData,loginDone]);
// console.log(allUsers);

useLayoutEffect(() => {
  if (Object.keys(userData).length != 0 && !loginDone && isAuthenticated) {
    setShowModal(true);
  }
  if (loginDone) {
    setShowModal(false);
  }
}, [loginDone,allUsers,isAuthenticated]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Adjust the delay as needed
    const timeout2 = setTimeout(()=>{navigate("/")},100)

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <PostLoginForm showModal={showModal} setShowModal={setShowModal} />
      <Box
        h={isVisible ? "90vh" : "95vh"}
        transition={"all 5s"}
        w={"100%"}
        bgImage={`linear-gradient(90deg, #040619e6 20.00%,#04061900 50.00%),linear-gradient(180deg, #04061900 70.00%,#040619 100.00%),url(${Background})`}
        bgSize={"cover"}
        // position={"absolute"}
        p={"40vh 7vw"}
      >
        <VStack
          spacing={"2vw"}
          align={"start"}
          transform={`translateX(${isVisible ? "0" : "-10vw"}) scale(${
            isVisible ? "1" : "0.8"
          })`}
          opacity={isVisible ? "1" : "0"}
          transition={"all 1.5s"}
        >
          <Text
            background={
              "-webkit-linear-gradient(113deg, rgba(0,178,255,1) 7%, rgba(7,216,239,1) 80%)"
            }
            backgroundClip={"text"}
            textShadow={"0 0 1vw #6E94E3"}
            className="astro"
            fontSize={"3vw"}
            letterSpacing={"0.1vw"}
            mb={"-1vw"}
          >
            Powered By AI
          </Text>
          <Text
            fontSize={"1.7vw"}
            color={"white"}
            letterSpacing={"0.1vw"}
            w={"40%"}
            className="robotoMono"
          >
            Learn and execute smarter by using AI
          </Text>
          <Button
            className="astro"
            color={"#ffffffcc"}
            bgColor={"#ffffff1a"}
            border={"2px solid #9292924d"}
            // filter={"drop-shadow(0 0 1vw #ffffff)"}
            transition={"all 0.3s"}
            _hover={{
              backgroundColor: "#ffffff1a",
              color: "#ffffff",
              filter: "drop-shadow(0 0 2vw #ffffff)",
            }}
            backdropFilter={"blur(15px)"}
            fontSize={"1.4vw"}
            letterSpacing={"0.2vw"}
            borderRadius={"2xl"}
            p={"2.3vw 3vw 1.8vw 3vw"}
            onClick={()=>{
              if (exploreRef.current) {
                const y =
                  exploreRef.current.getBoundingClientRect().top +
                  window.pageYOffset -
                  100;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            Explore
          </Button>
        </VStack>
      </Box>

      <Flex px={"7vw"} justify={"space-around"} my={"10vw"} ref={exploreRef}>
        <Flex direction={"column"}>
          <Text
            background={
              "-webkit-linear-gradient(113deg, rgba(0,178,255,1) 7%, rgba(7,216,239,1) 80%)"
            }
            backgroundClip={"text"}
            className="futuristic"
            fontSize={"4vw"}
          >
            Learn Through AI
          </Text>
          <Text my={"2vw"} w={"70%"} color={"white"} fontSize={"1.3vw"} className="robotoMono" letterSpacing={"0.1vw"}>
            With LearnWise you can Learn anything you want through AI making it
            easier to learn anything you want.Try now and learn smartly.
          </Text>
          <Button
            className="astro"
            color={"#ffffffcc"}
            bgColor={"#ffffff1a"}
            border={"2px solid #9292924d"}
            // filter={"drop-shadow(0 0 1vw #ffffff)"}
            transition={"all 0.3s"}
            _hover={{
              backgroundColor: "#ffffff1a",
              color: "#ffffff",
              filter: "drop-shadow(0 0 2vw #ffffff)",
            }}
            backdropFilter={"blur(15px)"}
            fontSize={"1.4vw"}
            letterSpacing={"0.2vw"}
            borderRadius={"2xl"}
            p={"2.3vw 3vw 1.8vw 3vw"}
            maxW = "15vw"
            onClick={()=>{
              navigate("/course")
            }}
          >
            Try Now
          </Button>
        </Flex>
        <Flex justify={"end"}>
          <Img src={LearningAI} w={"100%"} />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
