import "./App.css";
import React, { useHistory } from "react";
import axios from "axios";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthContextProvider } from "./context/AuthContext";



function App() {
  return (
    <AuthContextProvider>
     
        <AllRoutes />
    </AuthContextProvider>


  );
}

export default App;
