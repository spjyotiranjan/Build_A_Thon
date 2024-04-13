import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  SlideFade,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Logo from "./../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AppContext } from "../Context/ParentContext";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(null)
  const { userData,loginDone } = useContext(AppContext);



  useEffect(() => {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 100); // Adjust the delay as needed
  
      return () => clearTimeout(timeout);
    }, []);
  const { user,isAuthenticated, isLoading } = useAuth0();


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"10px"}
        pos={"fixed"}
        w={"60vw"}
        h={[null, "5vw", null, "4.4vw"]}
        top={"1vw"}
        transition={"all 1.5s"}
        transform={`scale(${isVisible ? "1" : "0.8"}) translateY(${
          isVisible ? "0" : "1vw"
        })`}
        opacity={isVisible ? "1" : "0"}
        bgColor={"#ffffff1a"}
        borderRadius={"2xl"}
        //   _hover={{transform: "scale(1.01)"}}
        justify={"space-between"}
        align={"center"}
        px={"3vw"}
        border={"3px solid #ffffff33"}
        filter={"drop-shadow(0 0vw 1vw #ffffff50 )"}
        zIndex={"1"}
      >
        <Box
          w={"20%"}
          _hover={{
            filter: "drop-shadow(0 0 1vw #01EAF980)",
          }}
          transition={"all 0.2s"}
          cursor={"pointer"}
          onClick={()=>{
            navigate("/")
          }}
        >
          <Img src={Logo} maxH={"1.5vw"} />
        </Box>
        <Flex w={"50%"} justify={"space-between"}>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.5vw #ffffff90)",
            }}
            transition={"all 0.3s"}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Menu isOpen={isOpen}>
            <MenuButton
              variant={"link"}
              fontSize={"1.3vw"}
              h={[null, "5vw", null, "4.4vw"]}
              color={"white"}
              _expanded={{ color: "#ffffffe6" }}
              as={Button}
              _focus={{ boxShadow: "none" }}
              onClick={isOpen ? onClose : onOpen}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              _hover={{
                filter: "drop-shadow(0 0 0.5vw #ffffff90)",
              }}
              transition={"all 0.3s"}
            >
              Explore{" "}
              {isOpen ? (
                <ChevronUpIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              ) : (
                <ChevronDownIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              )}
            </MenuButton>
            <MenuList
              m={"-0.51vw"}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              bgColor={"#ffffff33"}
              border={"1px solid #ffffff1a"}
              filter={"drop-shadow(0 0 1vw #000000)"}
              p={"0.5vw"}
            >
              <MenuItem
                bgColor={"#10223000"}
                borderRadius={"0.3vw"}
                _hover={{
                  backgroundColor: "#ffffff10",
                  transition: "all 0.5s",
                }}
                fontSize={[null, "1.3vw", null, "1vw"]}
                color={"white"}
                fontWeight={"bold"}
                className="robotoMono"
                onClick={() => {
                  navigate("/course");
                }}
              >
                Learn Anything
              </MenuItem>
              {/* <MenuItem
                bgColor={"#10223000"}
                borderRadius={"0.3vw"}
                _hover={{
                  backgroundColor: "#ffffff10",
                  transition: "all 0.5s",
                }}
                fontSize={[null, "1.3vw", null, "1vw"]}
                fontWeight={"bold"}
                className="robotoMono"
                color={"white"}
                onClick={() => {
                  navigate("/quiz");
                }}
              >
                Give Quizzes
              </MenuItem> */}
            </MenuList>
          </Menu>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
            // onClick={() => {
            //   if (footerRef.current) {
            //     const y =
            //       footerRef.current.getBoundingClientRect().top +
            //       window.pageYOffset -
            //       100;
            //     window.scrollTo({ top: y, behavior: "smooth" });
            //   }
            // }}
          >
            Contact Us
          </Button>
        </Flex>
        {isLoading ? (
          <Flex w={"20%"} justify="end">
            <Spinner color="white" />
          </Flex>
        ) : (
          <Flex w={"20%"} justify={"end"}>
            {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
          </Flex>
        )}
      </Flex>
    </Center>
  );
};

export default Navbar;
