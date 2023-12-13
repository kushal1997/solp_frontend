import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const MediaContext=createContext({
    medias:{},
    setMedias:()=>{},
    getAllMedias:()=>{},
})
export const MediaContextProvider= ({ children }) => {
    const [medias, setMedias] = useState([]);
  
    useEffect(() => {
      getAllMedias();
    }, []);
  
    const getAllMedias = () => {
        axios
          .get(`http://localhost:8080/courses/get_course/html`)
          .then((result) => {
            console.log(result.data.courseData);
            setMedias(result.data.courseData);
          })
          .catch((error) => {
            setMedias([]);
            console.log(error);
            alert("Error happened!");
          });
      };
  
    return (
      <MediaContext.Provider value={{ medias, setMedias,getAllMedias }}>
        {children}
      </MediaContext.Provider>
    );
  };

export default MediaContext;
