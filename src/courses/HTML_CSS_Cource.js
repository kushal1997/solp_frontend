import React from 'react'
import './component/style.css'
import { CourcesAbout, CourcesAbout_Instructor, CourcesForm, DayaAbout } from './component'
import { HTMLCSSAbout, HTMLCSSAboutInstructor, HTMLForm } from './data/HTMLContent'

export const HTML_CSS_Cource = () => {
    return (
        <>
            <CourcesForm data={HTMLForm} />
            <CourcesAbout data={HTMLCSSAbout} />
            <CourcesAbout_Instructor data={HTMLCSSAboutInstructor} />
            <DayaAbout data={HTMLForm} />
        </>
    )
}
