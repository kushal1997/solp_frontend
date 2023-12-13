import React from 'react'
import "./flower.css"
import { InactivityTimer } from '../layouts/InactivityTimer'

export const Flower = () => {
  return (

    //  * Renders a flower component with multiple layers of petals in different colors.
    //  * @returns {JSX.Element} - The rendered flower component.
    
  <>
  <InactivityTimer/>
      <div className="flowerBody">
      <div className="flower">
        <div className="f-wrapper">
          <div className="flower__line" />
          <div className="f">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__leaf flower__leaf--5" />
            <div className="flower__leaf flower__leaf--6" />
            <div className="flower__leaf flower__leaf--7" />
            <div className="flower__leaf flower__leaf--8 flower__fall-down--yellow" />
          </div>
        </div>
        <div className="f-wrapper f-wrapper--2">
          <div className="flower__line" />
          <div className="f">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__leaf flower__leaf--5" />
            <div className="flower__leaf flower__leaf--6" />
            <div className="flower__leaf flower__leaf--7" />
            <div className="flower__leaf flower__leaf--8 flower__fall-down--pink" />
          </div>
        </div>
        <div className="f-wrapper f-wrapper--3">
          <div className="flower__line" />
          <div className="f">
            <div className="flower__leaf flower__leaf--1" />
            <div className="flower__leaf flower__leaf--2" />
            <div className="flower__leaf flower__leaf--3" />
            <div className="flower__leaf flower__leaf--4" />
            <div className="flower__leaf flower__leaf--5" />
            <div className="flower__leaf flower__leaf--6" />
            <div className="flower__leaf flower__leaf--7" />
            <div className="flower__leaf flower__leaf--8 flower__fall-down--purple" />
          </div>
        </div>
        <div className="flower__glass" />
      </div>
    </div>
  </>
  )
}
