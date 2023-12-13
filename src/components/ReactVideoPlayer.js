import React from 'react';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css'
import k from '../videos/k.mp4';
import './mediaScreen.css';
// import logo from '../images/logo.png'

export const ReactVideoPlayer = () => {
  return (
    <>
      <section>
        <div className='container-fluid-player'>
          <Video autoPlay loop
          // poster={logo}
          onCanPlayThrough={() =>{
            console.log('video played')
          }}
          >
            <source src={k} type="video/mp4" height={250} width={300}/>
          </Video>
        </div>
      </section>
    </>
  )
}


