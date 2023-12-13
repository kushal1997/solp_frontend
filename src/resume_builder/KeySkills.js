import React from "react";
import { Formik, Form, Field, ErrorMessage,FieldArray  } from "formik";
import * as Yup from "yup";
import "../services/css/counselling.css";
import "../services/css/mediaScreen.css";
import { useState } from "react";



export const KeySkills = () => {
  return (
    <div className="cover">
      <div className="c-small">
        <div className="containerCoun">
          <Formik
            initialValues={{ skills: [''] }}
            onSubmit={(values) => {
              console.log(values.skills);
            }}
          >
            {({ values }) => ( // Include values here
              <Form>
              <h2 style={{ color: "white" }}>Add Technical Skills</h2>
                <FieldArray name="skills">
                  {({ remove, push }) => (
                    <div>
                      {values.skills.length > 0 &&
                        values.skills.map((skill, index) => (
                          <div className="project" key={index}>
                            <label htmlFor={`skills.${index}`}>
                              Skill
                              <Field
                                type="text"
                                id={`skills.${index}`}
                                name={`skills.${index}`}
                                placeholder="Add your skill"
                              />
                            </label>
                            <button type="button" style={{color:"red",fontSize:"17px",border:"1px solid red"}} onClick={() => remove(index)}>
                              Remove
                            </button>
                            <ErrorMessage
                              name={`skills.${index}`}
                              className="error"
                              component="div"
                            />
                          </div>
                        ))}
                        <div style={{display:"flex",flexDirection:"column"}}>
                        <button
                        type="button"
                        onClick={() => push('')}
                        className="submit"
                      >
                        Add Skill
                      </button>
                      <button type="submit" className="submit">
                        Submit
                      </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};





