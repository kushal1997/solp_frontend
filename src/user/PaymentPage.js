import React, { useState } from "react";
import qr from "../assets/qr.jpeg";
import "./css/paymentPage.css";
const PaymentPage = () => {

const [upiref,setUpiRef] =useState('');
const handelSubmit = (e)=>{
  e.preventDefault();
  console.log(" UPI ref No." ,upiref)
setUpiRef('')
}
  return (
    <div className="payment_page">
      <div className="body">
        <h1 style={{ fontSize: "1.5rem",marginBottom:"53px",fontFamily:"cursive"}}>Payment Page</h1>
        <img src={qr} alt="upi"/>
        <div className="details">
        <p>Amount :- 149/-</p>
        <p>Fill up these details</p>
        <form onSubmit={handelSubmit}>
        <label style={{color:'black'}}>
          UPI ref No. :-
          <input style={{border:"1px solid black"}} 
          type="text"   
    onChange={(e)=>setUpiRef(e.target.value)} 
value={upiref}
          />
        </label>
        <label style={{color:'black'}}>
          Upload ss :-
          <input type="file" accept="image/*" />
        </label>
        <button type="submit" style={{border:'1px solid',padding:'5px',margin:'5px 5px',borderRadius:'5px', backgroundColor:'lightblue'}}>Submit</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
