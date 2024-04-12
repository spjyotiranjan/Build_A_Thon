import { Center, Flex, Grid, GridItem, Img, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "./../assets/Logo.png"
import LinkedInIcon from "./../assets/LinkedIn_icon.png"
import InstagramIcon from "./../assets/Instagram_icon.png"
import GithubIcon from "./../assets/Github_icon.png"

const Footer = () => {
  return (
    <Center py={"3%"}>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        // bgColor={"#102230e6"}
        // borderRadius={"5vh"}
        w={"95%"}
        p={["5%", "3%"]}
        direction={["column","row"]}
        justify={"space-between"}
        align={"center"}
        border={"3px solid #ffffff33"}
        bgColor={"#ffffff1a"}
        borderRadius={"2xl"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
      >
        <Flex w={['100%','30%']} justify={"center"} h={["40vw","5vw"]} direction={"column"} align={"center"} mb={["5vw","0"]}>
            <Img src={Logo} maxH={["6vw","3vw"]}/>
            <Text color={"white"} fontSize={["1.1rem",null,"0.9rem","1.1rem"]} my={["3vw","1vw"]}>Made by S P Jyotiranjan Sahoo</Text>
            <Flex w={"30%"} justify={"space-between"}>
                <Link href="https://www.linkedin.com/in/sp-jyotiranjan-sahoo-030740289" isExternal><Img src={LinkedInIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
                <Link href="https://github.com/spjyotiranjan" isExternal><Img src={GithubIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
                <Link href="https://www.instagram.com/spjyotiranjan" isExternal><Img src={InstagramIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
            </Flex>
        </Flex>
        <Grid w={['100%','65%']} gap={10} templateColumns={["1fr","1fr 1fr"]}>
            <GridItem>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.3rem", "2.2rem"]} mb={"1vw"}>About</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>FAQs</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Contact Us</Text>
                </VStack>
            </GridItem>
            <GridItem>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.5rem", "2.2rem"]} mb={"1vw"}>Features</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Learn Anything through AI</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Give Quizzes generated through AI</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Online Leaderboard</Text>
                </VStack>
            </GridItem>
            <GridItem colSpan={[1,2]}>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.5rem", "2.2rem"]} mb={"1vw"}>Technologies Used</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Mongo DB</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>React</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Express</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Node JS</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Gemini</Text>
                </VStack>
            </GridItem>
        </Grid>
      </Flex>
    </Center>
  )
}

export default Footer