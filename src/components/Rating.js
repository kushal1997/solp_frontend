import React from 'react'
import ReactStars from "react-rating-stars-component";
import './mediaScreen.css';


export const Rating = () => {
  const ratingChanged = (newRating) => {
      console.log(newRating);
  };
return (
  <>
      <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />
      
  </>
)
}

