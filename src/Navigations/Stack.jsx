import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import { Homescreen } from '../Screens/Homescreen'
import { Signupscreen } from '../Screens/Signupscreen'
import { Loginscreen } from '../Screens/Loginscreen'


import { Applicantscreen } from '../Screens/Applicantscreen'
import { Employescreen } from '../Screens/Employescreen'
// import { ProtectedRoute } from '../Components/ProtectedRoute'
import { Userprofilescreen } from '../Screens/Userprofilescreen'
import { Userinfoscreen } from '../Screens/Userinfoscreen'
import { Viewapplicantsscreen } from '../Screens/Viewapplicantsscreen'
import { Updatejobscreen } from '../Screens/Updatejobscreen'
import { Emploginscreen } from '../Screens/Emploginscreen'
import { Jobdescscreen } from '../Screens/Jobdescscreen'
import { ProtectedRoute } from '../Components/Protectedroute/ProtectedRoute'

export const Stack = () => {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Homescreen/>}/>
       <Route  path='/Signup' element={<Signupscreen/>}/>
       <Route  path='/Login' element={<Loginscreen/>}/>
       {/* <Route path="/Emplogin" element={<Emploginscreen/}/> */}
      <Route path='/Emplogin' element={<Emploginscreen/>}/>

       <Route element={<ProtectedRoute/>}>
          <Route path="/Applicant" element={<Applicantscreen/>}/>
          <Route path='/Jobdesc' element={<Jobdescscreen/>}/>
          <Route path='/Profile' element={<Userprofilescreen/>}/>
          <Route path='userinfoupdate' element={<Userinfoscreen/>}/>
          <Route path="/Employe" element={<Employescreen/>} />
          <Route path='/viewapplicants' element={<Viewapplicantsscreen/>}/>
          <Route path='/updatejob' element={<Updatejobscreen/>}/>
        </Route>




    </Routes>
    </BrowserRouter>
  )
}
