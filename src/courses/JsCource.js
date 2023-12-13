import React from 'react'
import './component/style.css'
import { CourcesAbout, CourcesAbout_Instructor, CourcesForm, DayaAbout} from './component'
import { JSAbout, JSAboutInstructor, JSForm } from './data/JSContent'

export const JsCource = () => {
  return (
    <>
        <CourcesForm data={JSForm}/>
        <CourcesAbout data={JSAbout}/>
        <CourcesAbout_Instructor data={JSAboutInstructor}/>
        <DayaAbout data={JSForm}/>
    </>
  )
}
