import React, { useContext, useEffect, useState } from 'react'
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
import { AppContext } from '../Context/ParentContext';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';



const Quiz = () => {
    const gemini_key = import.meta.env.VITE_GEMINI_API;
    const genAI = new GoogleGenerativeAI(gemini_key);
    const {quizData} = useContext(AppContext)
    const [questionArray,setQuestionArray] = useState([])
    useEffect(()=>{
        for(let i=0;i<10;i++){
            genDescription(quizData)
        }
    },[])
    console.log(questionArray);

    async function genDescription(prompt) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
          const chat = model.startChat({
            history: [
              {
                role: "user",
                parts: [
                  {
                    text: "give me one within 15 words from the data that I will give you next. Try to give unique question from the data.",
                  },
                ],
              },
              {
                role: "model",
                parts: [{ text: "Ok, I will analyze the data and give you a unique question from it." }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 10000,
              temperature: 0.7,
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
          console.log(text);
          setQuestionArray([...questionArray,text])
    
        } catch (error) {
          console.log(error);
          genDescription(prompt)
        }
      }
    //   console.log(questionArray);
    //   console.log(quizData);
  return (
    <Box mt={"5vw"}>
    <Center><Text color={"white"} className='futuristic' fontSize={"4vw"}>Quiz</Text></Center>
    <Center>
        <Flex justify={"column"} bgColor={"#ffffff1a"} borderRadius={"2xl"} w={"90vw"}>
            <Text color={""}>Question ?</Text>
            <Flex>Option</Flex>
            <Flex>Option</Flex>
            <Flex>Option</Flex>
            <Flex>Option</Flex>
        </Flex>
    </Center>
    </Box>
  )
}

export default Quiz