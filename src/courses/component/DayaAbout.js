import React from 'react';
import images from "../images/home-three-banner-bg.png";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./style.css"
import './mediaScreen.css'
import tagg from "../images/tagg.png";
import { useNavigate } from 'react-router';



const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
});


export const DayaAbout = ({ data }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const PHONE_PE_URL = process.env.REACT_APP_PHONE_PE_URL;
    const date = new Date().toDateString();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const postData = {
                name: values.name,
                email: values.email,
                phone: values.phoneNumber,
            };
          
            console.log(postData);
            try {
                axios
                    // .post("http://localhost:8080/registration", postData)
                    .post(`${PHONE_PE_URL}/registration`, postData)
                    .then((res) => {
                        console.log(res.data.success);
                        if (res.data.success === true) {
                            // updateEmail(values.email)
                            navigate("/payment_page");
                            axios
                                .post(`${BACKEND_URL}/api/phonepe/payment`,{
                                    data: {
                                      name: values.name,
                                      number: values.phoneNumber,
                                      amount: data.amount,
                                    },
                                  })
                                .then((response) => {
                                    // Do something with the response from the second API
                                    navigate("/thankyou")
                                    
                                })
                                .catch((error) => {
                                    console.log("Error fetching the second API:", error);
                                });
                        }
                    });
            } catch (error) {
                console.log("error", error);
            }
            resetForm();
        },
    });

    return (
        <section className="home-three-banner our">
            <div className="banner-image" style={{ backgroundImage: `url(${images})` }}>
                <div className="container-fluid">
                    <div className="row_home">
                        <div className="col-md-5 banner-inner-about">
                            <h4>About Company</h4>
                            {/* <h2 className='form_h2'>
                                    Our <br /> Company
                                </h2> */}
                            <h2 style={{ color: '#000', fontFamily: 'fantasy' }}>Join us today to embark on a transformative journey of learning and skill development!</h2>
                            <p><span style={{ color: '#000', fontWeight: 'bold', fontSize: '25px' }}>W</span>elcome to "Steps of Learning Process" ! We are India's largest platform for online learning, specializing in coding and programming. Our unique approach to education includes real-time live project work, providing students with hands-on experience. With a diverse range of online courses, we empower learners to master the latest technologies and skills. Join us on this journey of continuous learning and skill development.</p>

                            <p>
                                <marquee id='mar_scroll' width="100%" height="100px" direction="left">
                                    Exclusive! Limited Slots Available. Join Now.
                                </marquee>
                            </p>
                        </div>

                        <div className=" fom_header nabox">

                            <h2 style={{ color: '#000' }}>Subscribe to SLP’s courses</h2> <br /><br />
                            <form onSubmit={formik.handleSubmit} className='about-form'>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className='error'>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='error'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Pn.No.</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                        <div className='error'>{formik.errors.phoneNumber}</div>
                                    ) : null}
                                </div>

                                <div className="col-md-6">
                                    <button className="btn-success" type="submit">Pay Now</button>
                                </div>
                                <div className=" tag_row">
                                    <img src={data.tagg} alt="Dayatagg" className="formtagg" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <GoTop/> */}
            </div>
        </section>
    )

}



