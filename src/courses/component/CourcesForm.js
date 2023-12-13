import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./style.css";
import "./mediaScreen.css";
import "../component/mediaScreen.css";
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../../config/constraints";
// import { PHONE_PE_URL } from "../../config/constraints";
// import { EmailContext } from "../../context/EmailContext";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
});


export const CourcesForm = ({data}) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const PHONE_PE_URL = process.env.REACT_APP_PHONE_PE_URL;
    // const { updateEmail } = useContext(EmailContext);
    console.log(data.amount)
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
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
        <section className="home-three-banner">
            <div className="banner-image">
                <div className="container-fluid">
                    <div className="row_home">
                        <div className="col-lg-7 banner-inner">
                            <img src={data.img} alt="images" />

                            <marquee
                                id="mar_scroll"
                                width="100%"
                                height="100px"
                                direction="left"
                            >
                                Exclusive! Limited Slots Available. Join Now.
                            </marquee>
                        </div>

                        <div className="fom_header">
                            <h2 style={{ color: "#000" }}>Subscribe to SLP’s courses</h2>
                            <form onSubmit={formik.handleSubmit}>
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
                                        <div className="error">{formik.errors.name}</div>
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
                                        <div className="error">{formik.errors.email}</div>
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
                                        <div className="error">{formik.errors.phoneNumber}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6 col-md-6 row_col">
                                    <button className="btn-success" type="submit">
                                        Submit
                                    </button>
                                </div>
                                <div className="tag_row">
                                    <img src={data.tagg} alt="Formtagg" className="formtagg" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

