import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./style.css";
import './mediaScreen.css'
import "../component/mediaScreen.css"
import images from "../images/banner2.2.png";
import tagg from "../images/tagg.png";


// import images1 from "../images/home-three-banner-bg.png";

const loadRazorPay = (src) => {
    return new Promise(resolve => {


        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        document.body.appendChild(script);
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }

    })
}

const __DEV__ = document.domain === 'localhost'
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
});


export const CourcesForm = () => {
    const date = new Date().toDateString();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const data = await loadRazorPay();
                console.log(data);
            } catch (error) {
                console.error('Razorpay SDK failed to load', error);
                alert('Razorpay SDK failed to load');
            }

            const data = fetch('http://localhost:1337/razorpay',
                { method: 'POST' })
                .then(t => t.json())
                .then(res => {
                    console.log(res);
                    const options = {
                        "key": __DEV__ ? process.env.REACT_APP_RAZORPAY_API_KEY : "API_NOT_AVAILABLE",
                        "currency": res.currency,
                        "amount": parseInt(res.amount),
                        "order_id": res.id,
                        "name": "Daya CS Pvt. Ltd", //your business name
                        "description": "Java Bootcamp",
                        "image": "https://www.dayacs.com/images/logowhtup.png",
                        "handler": function (response) {
                            alert(response.razorpay_payment_id);
                            alert(response.razorpay_order_id);
                            alert(response.razorpay_signature)
                            sendEmail(values.email);
                            submitForm(date, values.name, values.email, values.phoneNumber);

                        },
                        "prefill": {
                            "name": values.name, //your customer's name
                            "email": values.email,
                            "contact": values.phoneNumber,
                        },
                        "notes": {
                            "address": "Razorpay Corporate Office"
                        },
                        "theme": {
                            "color": "#3399cc"
                        }
                    };
                    var paymentObject = new window.Razorpay(options);
                    paymentObject.open()
                })
                console.log(data);
        },
    });
    const sendEmail = async (email) => {
        // try {
        //     const response = await axios.post('/send-email', {
        //         to: email,
        //         subject: 'Test Email',
        //         text: 'Hello, this is a test email from React!',
        //     });
        //     console.log('Email sent:', response.data.message);
        // } catch (error) {
        //     console.error('Error sending email:', error);
        // }
        console.log(`Sending confirmation email to ${email}`);
    };
    const submitForm = async (date, name, email, phoneNumber) => {
        try {
            const response = await axios.post(
                'https://api.apispreadsheets.com/data/bOc63gFUrrtElkcY/',
                {
                    // Structure your data based on the API's requirements
                    data: {
                        date: date,
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber
                        // Add more fields
                    },
                }
            );
            console.log('Form data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };
    return (
        <section className="home-three-banner">
            <div className="banner-image"> 
                <div className="container-fluid">
                    <div className="row_home">
                        <div className="col-lg-7 banner-inner">
                            <img src={images} alt="images" />

                            <marquee id='mar_scroll' width="100%" height="100px" direction="left">
                              JavaScript Session Starting Date : 04/11/2023  {"/"} Time : 10:00AM
                            </marquee>
                        </div>
                    
                        <div className="fom_header">
                            <h2  style={{color: '#000'}}>Subscribe to SLP’s courses</h2> 
                            <form onSubmit={formik.handleSubmit} >
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
                            
                                <div className="col-lg-6 col-md-6 row_col" >
                                    <button className="btn-success" type="submit">Submit</button>
                                </div>
                                <div className="col-lg-6 col-md-6 tag_row">
                                    <img src={tagg} alt="Formtagg"  className="formtagg"  />
                                </div>
                                    
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


