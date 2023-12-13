import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import { About, Contact, Home } from "../components";
import { Cancellation, Service, Terms } from "../policies";
import { Footer, Navbar } from "../layouts";
import { UnderDevelopment } from "../layouts/UnderDevelopment";
import { SubHeader } from "../layouts";
import { JsCource } from "../courses/JsCource";
import { Services } from "../components/Services";
import { CounsellingForm } from "../services/form/CounsellingForm";
// import { PersonalDetails } from "./services/form/PersonalDetails";
import { FirstForm } from "../resume_builder/FirstForm";
import { ResumeHeadline } from "../resume_builder/ResumeHeadline";
import { KeySkills } from "../resume_builder/KeySkills";
import { Counselling_form } from "../self/Counselling_form";
import { Emplyoment } from "../resume_builder/Emplyoment";
import { ProjectForm } from "../resume_builder/ProjectForm";
import { Achivement } from "../resume_builder/Achivement";
import { Certifications } from "../resume_builder/Certifications";
import { Education } from "../resume_builder/Education";
import { Admin } from "../admin/Admin";
import { AddCourseVideo } from "../admin/forms/AddCourseVideo";
import { VideoList } from "../user/VideoList";
import { useEffect, useState } from "react";
import axios from "axios";

// import { BACKEND_URL } from '../config/constraints';
import { Login } from '../login/Login';
import ProtectedRoute from './ProtectedRoutes';
import { User } from '../user/User';
import { ForgotPassword } from '../login/ForgotPassword';
import MediaContext from '../context/MediaContext';

import { ThankYou } from '../layouts/ThankYou';
import Logout from '../logout/Logout';
import Select_course from '../self/Select_course';
import { HTML_CSS_Cource } from '../courses/HTML_CSS_Cource';
import { PaymentFailed } from '../layouts/PaymentFailed';
import { ChangePassword } from '../user/profile/ChangePassword';
import BioData from '../user/profile/BioData';
import { UpdateBio } from '../user/profile/UpdateBio';
import { Flower } from '../admin/Flower';
import { AddUser } from '../admin/AddUser';
import { AllUsers } from '../admin/AllUsers';
import { Courses } from '../admin/Courses';
import { DeletedCourse } from '../admin/DeletedCourse';
import { Blogs, CoreMembers, HRtraining, ITteam, TrainerProfile } from '../hr';



export const AllRoutes = () => {






  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} exact>
          {" "}
        </Route>
        {/* <Route path="/about" Component={About} exact> */}
        <Route path="/about" Component={About} exact>
          {" "}
        </Route>
        <Route path='/login' element=<Login />></Route>
        <Route path='/logout' element=<Logout />></Route>
        <Route path="/forgot" Component={ForgotPassword} exact></Route>

        <Route path="/services" Component={Services} exact></Route>
        <Route path="/contact" Component={Contact} exact></Route>
        <Route path="/courses/js" Component={JsCource}></Route>
        <Route path="/courses/html_css" Component={HTML_CSS_Cource}></Route>
        <Route path="/policy/terms_and_condition" Component={Terms}></Route>
        <Route path="/policy/service" Component={Service}></Route>
        <Route
          path="/policy/cancellation_and_refund"
          Component={Cancellation}
        ></Route>

        <Route path="/under_development" Component={UnderDevelopment}></Route>
        <Route path='/thankyou' Component={ThankYou}></Route>
        <Route path='/payment_failed' Component={PaymentFailed}></Route>
        <Route path="/SubHeader" Component={SubHeader} exact></Route>

        {/* form given to students */}

        <Route path="/demo" Component={CounsellingForm}></Route>
        {/* <Route path='/personal_details' Component={PersonalDetails}></Route> */}

        {/* hr pages */}
        <Route path='/hr_training' Component={HRtraining}></Route>
        <Route path='/trainerProfile' Component={TrainerProfile}></Route>
        <Route path='/coreMembers' Component={CoreMembers}></Route>
        <Route path='/itteam' Component={ITteam}></Route>
        <Route path='/Blog' Component={Blogs}></Route>

        {/* For resume maker */}
        <Route path="/first" Component={FirstForm}></Route>
        <Route path="/summary" Component={ResumeHeadline}></Route>
        <Route path="/keySkills" Component={KeySkills}></Route>
        <Route path="/employment" Component={Emplyoment}></Route>
        <Route path="/project" Component={ProjectForm}></Route>
        <Route path="/achivement" Component={Achivement}></Route>
        <Route path="/certification" Component={Certifications}></Route>
        <Route path="/education" Component={Education}></Route>

        {/* For self fill up counselling from */}
        <Route path="/counselling_form" Component={Counselling_form}></Route>
        <Route path="/counselling_study" Component={Select_course}></Route>

        {/* for admin page */}
        <Route
          path="/admin"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<Flower />} />
            </>
          }
        />
        <Route path=""></Route>
        <Route
          path="/admin/add_user"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<AddUser />} />
            </>
          }
        />
        <Route
          path="/admin/all_users"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<AllUsers />} />
            </>
          }
        />
         <Route
          path="/admin/upload"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<AddCourseVideo />} />
            </>
          }
        />
        <Route
          path="/admin/all_courses"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<Courses />} />
            </>
          }
        />
        <Route
          path="/admin/deleted_courses"
          element={
            <>
              <Admin />
              <ProtectedRoute element={<DeletedCourse />} />
            </>
          }
        />

        




        {/* for user page */}
        <Route path="/userPage" element={<ProtectedRoute element={<VideoList />} />}></Route>
        <Route path="/change_password" element={<ChangePassword />}></Route>
        <Route path='/add_bio_data' Component={BioData}></Route>
        <Route path='/update_bio_data' Component={UpdateBio}></Route>

        {/* <Route path='/video' element={<VideoList />}></Route> */}
        {/* <Route path='/testVideo' Component={Test}></Route> */}



      </Routes>
      <Footer />
    </>
  )
}
