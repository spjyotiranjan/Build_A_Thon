import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import Background from "./../assets/Boy_Reading.jpg";
import SubTopicDetail from "./SubTopicDetail";

const Course = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const [heading, setHeading] = useState("");
  const [subTopics, setSubTopics] = useState([]);
  const [fetched, setFetched] = useState(true);
  const [contentFetched, setContentFetched] = useState(true);
  const [content, setContent] = useState("");

  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);

  function removeAsterisks(str) {
    return str.replace(/\*/g, ""); // Using regular expression to replace all asterisks with an empty string
  }
  async function subtopic(topic) {
    try {
      setFetched(false);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are making a learning content for a topic. Give 10 subtopic about the topic. only give subtopics, don't include decalration of response`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Ok, Please give me a topic" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 10000,
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
      const res = await chat.sendMessage(topic);
      const text = res.response.text();
      const withoutAsterisks = removeAsterisks(text);
      let textArray = withoutAsterisks.split("\n");
      textArray = textArray.filter((item) => item !== "");
      textArray.shift();
      const UpdatedtextArray = textArray.map((e) => {
        return e.split(".").slice(1).join(".").trim();
      });
      setSubTopics(UpdatedtextArray);
      setFetched(true);
      // setSubTopicFetched(true)
    } catch (error) {
      console.log(error);
      subtopic(topic);
    }
  }
  async function genDescription(topic) {
    try {
      setContentFetched(false);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are making a learning content for a topic. Give 300 words description about the topic. only give description, don't include decalration of response`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Ok, Please give me a topic" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 10000,
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
      const res = await chat.sendMessage(topic);
      const text = res.response.text();
      const withoutAsterisks = removeAsterisks(text);

      setContent(withoutAsterisks);
      setContentFetched(true);
      setHeading(topic);
    } catch (error) {
      console.log(error);
      genDescription(topic);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    subtopic(value);
    genDescription(value);
    setValue("");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Adjust the delay as needed
    setContentFetched(true);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Flex transition={"all 5s"} mt={"-5vw"} w={"100%"} direction={"column"} minH={"150vh"}>
      {/* Input  */}

      <Flex
        // direction={"colum
        bgImage={`linear-gradient(90deg, #040619 0.00%,#04061950 50.00%),linear-gradient(90deg, #04061950 50.00%,#040619 100.00%),linear-gradient(180deg, #04061900 70.00%,#040619 100.00%),url(${Background})`}
        h={"50vh"}
        p={"40vh 7vw"}
        mx={"auto"}
        direction={"column"}
        // justify={"space-between"}
        align={"center"}
      >
        <Text
          color={"white"}
          fontSize={"5vw"}
          className="futuristic"
          letterSpacing={"0.3vw"}
          textShadow={"0 0 1vw #ffffff90"}
        >
          Learn Through AI
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex
            w={"80vw"}
            h={"4vw"}
            justify={"space-between"}
            mt={"5vw"}
            align={"center"}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              style={{
                width: "64vw",
                height: "4vw",
                backgroundColor: `#ffffff1a`,
                borderRadius: "0.5vw",
                backdropFilter: "blur(7px)",
                outline: "none",
                padding: "0 2vw",
                color: "white",
                border: "2px solid #ffffff33",
                filter: "drop-shadow(0 0 1vw #ffffff33)",
                fontSize: "1.4vw",
                textAlign: "center",
                letterSpacing: "0.1vw",
              }}
              placeholder="Write any topic you want to learn"
            />
            <Button
              w={"15vw"}
              h={"4vw"}
              color={"white"}
              background={
                "linear-gradient(113deg, rgba(0,178,255,0.5) 7%, rgba(7,216,239,0.5) 80%)"
              }
              _hover={{
                filter: "drop-shadow(0 0 1vw #ffffff50)",
              }}
              fontSize={"1.3vw"}
              type="submit"
              transition={"all 0.3s"}
            >
              Learn
            </Button>
          </Flex>
        </form>
      </Flex>

      {/* Description  */}

      {contentFetched ? (
        <Flex direction={"column"} align={"center"} mt={"5vw"}>
          {content != "" && (
            <Text
              color={"white"}
              fontSize={"3vw"}
              className="futuristic"
              letterSpacing={"0.3vw"}
              textShadow={"0 0 1vw #ffffff90"}
            >
              {heading}
            </Text>
          )}
          {content != "" && (
            <Text
              color={"white"}
              bgColor={"#ffffff33"}
              border={"3px solid #ffffff33"}
              borderRadius={"2xl"}
              fontSize={"1.2vw"}
              textAlign={"center"}
              p={"2vw"}
              w={"90vw"}
            >
              {content}
            </Text>
          )}
        </Flex>
      ) : (
        <Text
          color={"white"}
          fontSize={"3vw"}
          className="futuristic"
          letterSpacing={"0.3vw"}
          textShadow={"0 0 1vw #ffffff90"}
          textAlign={"center"}
        >
          Generating ...
        </Text>
      )}

      {/* Sub Topics  */}
      {content != "" && (
        <Text
          color={"white"}
          fontSize={"2vw"}
          mx={"auto"}
          py={"2vw"}
          className="futuristic"
          letterSpacing={"0.3vw"}
          textShadow={"0 0 1vw #ffffff90"}
        >
          Sub Topics
        </Text>
      )}
      {content != "" && (
        <Tabs
          isManual
          variant="soft-rounded"
          border={"3px solid #ffffff33"}
          color={"white"}
          w={"90vw"}
          mx={"auto"}
          p={" 1vw 3vw"}
          bgColor={"#ffffff33"}
          borderRadius={"2xl"}
        >
          <TabList overflow={"auto"} className="scroll">
            {subTopics.map((e) => (
              <Tab className="robotoMono" _selected={{color: "white",backgroundColor: "#ffffff33"}} color={"#ffffff80"}>{e}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {subTopics.map((e,i)=><SubTopicDetail key={i} subTopic={e}/>)}
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
};

export default Course;
