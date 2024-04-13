import React from 'react'
import {Box} from "@chakra-ui/react"
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import ChatBot from './Components/ChatBot'
import Course from './Components/Course'
import AllRoutes from './Components/AllRoutes'
import Footer from './Components/Footer'

const App = () => {
  return (
    <Box minH={"100vh"} bgColor={"#040619"}>
      <Navbar/>
      {/* <Home/> */}
      {/* <Course/> */}
      {/* <ChatBot/> */}
      <AllRoutes/>
      <Footer/>
      <ChatBot/>
    </Box>
  )
}

export default App