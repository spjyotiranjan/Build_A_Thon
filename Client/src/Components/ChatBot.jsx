import { Box, Button, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { TbMessageChatbot } from "react-icons/tb";

const ChatBot = () => {
  return (
    <Flex position={"fixed"} right={"5vw"} top={"5vh"} direction={"column"} alignItems={"end"} zIndex={"2"}>
      <Flex
        w={"25vw"}
        h={"80vh"}
        bgColor={"#ffffff33"}
        borderRadius={"2xl"}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
        border={"3px solid #ffffff33"}
      >
        <Flex>
            
        </Flex>

      </Flex>
      <Button
        w={"4vw"}
        h={"4vw"}
        mt={"1vw"}
        borderRadius={"full"}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
        bgColor={"#ffffff33"}
        border={"3px solid #ffffff33"}
        _hover={{
          filter: "drop-shadow(0 0 1vw #01EAF980)",
          transform: "scale(1.05)",
        }}
        transition={"all 0.3s"}
      >
        <Icon as={TbMessageChatbot} boxSize={9} color={"white"} />
      </Button>
    </Flex>
  );
};

export default ChatBot;
