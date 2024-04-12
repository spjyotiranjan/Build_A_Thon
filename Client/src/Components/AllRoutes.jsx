import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import Course from './Course'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/course' element={<Course/>} />
    </Routes>
  )
}

export default AllRoutes