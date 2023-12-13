import React, { useState } from 'react';
import { QApage } from './QApage';
import { Overview } from './Overview';
import { CourseContent } from './CourseContent';
// import { LearningTool } from './LearningTool';

export const BottomHeader = () => {
  const [showQ,setShowQ] =useState(false);
const handleQ=()=>{
  setShowQ(!showQ)
}
  return (
    <>
      <section>
        <div className='row'>
          <div className='col-md-2'>
            <button onClick={handleQ}>
              Q & A
            </button>
          </div>

          <div className='col-md-2'> <Overview /> </div>
          <div className='col-md-2'> <CourseContent /> </div>
          {/* <div className='col-md-2'> <LearningTool/> </div> */}
        </div>
        <div>
            <div className={`${showQ ? 'showblock': 'hideblock'}`}>
              {
                showQ && <QApage/>
              }
            </div>
        </div>
      </section>



    </>
  )
}
