import { Box, Button, Center, Fade, Flex, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const ChatBot = () => {
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API
  );
  function removeAsterisks(str) {
    return str.replace(/\*/g, ""); // Using regular expression to replace all asterisks with an empty string
  }
  const [chatHistory, setChatHistory] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  async function genChat(history, prompt) {
    const initialPrompt = [
      {
        role: "user",
        parts: [
          {
            text: `About LearnWise
                
                learnWise is a website where you can learn any topic and get a overall understanding about any topic through Gemini API. Eduflex generates content about that topic in a descriptive and stepwise manner, so that user can understand the topic, or atleast get a roadmap to learn that topic. The designer and developer of LearnWise is S P Jyotiranjan Sahoo(sp,jyoti,s p, jyotiranjan)`,
          },
          {
            text: `To go to the main tool first you have to join through Google or any email-Password. After that you can go to Main tool by clicking on "Explore" tab of Navbar and then choose "Learn Anything Option". Once you go there, you can give any topic you want to learn in thr input option, then click Learn`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Ok, I analyzed the information about your website. How can I help you",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "I want you act as a chatbot. Assist me with the above information with maximum of 25 words.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Ok I am ready as a chatbot. Lets proceed with the chat",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `You are chatbot for Eduflex only, If any questions asked by me other than the information provided about eduflex, refuse to answer politely with reason.`,
          },
          {
            text: "Do not give any declaration of the data generrated, just provide the minimum data required",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Got it, I will not answer anything out of context of Eduflex, I will only generate content from the data given above about EduFlex without any text about content generated, I will only provide the minimum data required.",
          },
        ],
      },
    ];
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const chat = model.startChat({
        history: [...initialPrompt, ...history],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.9,
          topK: 1,
          topP: 1,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });
      const res = await chat.sendMessage(prompt);
      const text = res.response.text();
      const withoutAsterisks = removeAsterisks(text);
      console.log(withoutAsterisks);
      setContent(withoutAsterisks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (content != "") {
      console.log(content);
      setChatHistory([
        ...chatHistory,
        { role: "model", parts: [{ text: content }] },
      ]);
      setContent("");
    }
  }, [content]);
  const handleSubmit = (e) => {
    e.preventDefault();
    genChat(chatHistory, value);
    setChatHistory([
      ...chatHistory,
      { role: "user", parts: [{ text: value }] },
    ]);
    setValue("");
  };
  return (
    <Flex
      position={"fixed"}
      right={"5vw"}
      top={show ? "5vh" : "85vh"}
      direction={"column"}
      alignItems={"end"}
      zIndex={"2"}
    >
      {show && (
        <Flex
          w={"25vw"}
          h={"80vh"}
          bgColor={"#ffffff33"}
          borderRadius={"2xl"}
          backdropFilter={"auto"}
          backdropBlur={"10px"}
          border={"3px solid #ffffff33"}
          p={"1vw 2vw"}
          direction={"column"}
          justify={"end"}
          // justify={""}
        >
          <Flex
            w={"100%"}
            minHeight={"50vh"}
            direction={"column"}
            justify={"end"}
          >
            {chatHistory.map((e,i)=>{
              return <Flex
              maxWidth={"70%"}
              w={"fit-content"}
              align={"center"}
              p={"0.3vw 1vw"}
              bgColor={"#ffffff50"}
              borderRadius={"lg"}
              mb={"1vw"}
              ml={`${e.role === "user"? "0":"auto"}`}
              key={i}
            >
              {e.parts[0].text}
            </Flex>
            })}
            {/* <Flex maxWidth={"70%"} w={"fit-content"} align={"center"} p={"0.3vw 1vw"} bgColor={"#ffffff50"} borderRadius={"lg"} mb={"1vw"} ml={"0"}>Text</Flex>
              <Flex maxWidth={"70%"} w={"fit-content"} align={"center"} p={"0.3vw 1vw"} bgColor={"#ffffff50"} borderRadius={"lg"} mb={"1vw"} ml={"auto"}>Text</Flex> */}
          </Flex>
          <Flex align={"center"} h={"10vh"} w={"100%"}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "23vw",
              }}
            >
              <input
                type="text"
                value={value}
                style={{
                  width: "17vw",
                  height: "3vw",
                  borderRadius: "1vw",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ffffff50",
                  border: "3px solid #ffffff33",
                  paddingInline: "1vw",
                  color: "white",
                }}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Button
                type="submit"
                borderRadius={"full"}
                boxSize={8}
                w={"3vw"}
                h={"3vw"}
              >
                <Icon as={IoSend} />
              </Button>
            </form>
          </Flex>
        </Flex>
      )}
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
        onClick={() => {
          setShow(!show);
        }}
      >
        <Icon as={TbMessageChatbot} boxSize={9} color={"white"} />
      </Button>
    </Flex>
  );
};

export default ChatBot;
