import React, { useEffect } from "react";
import "./css/App.css";
// import IframeComponent from './IframeComponent'
import ChatBotComponent from "./ChatbotComponent";
import { Paper, TextField } from "@mui/material";
import Idpanel from "./panels/Idpanel";
import ProductsPanel from "./panels/ProductsPanel";
import IvrPanel from "./panels/IvrPanel";
import VerificationPanel from "./panels/VerificationPanel";
import WhatsappComponent from "./WhatsappComponent";

function App() {
  // Function to get query parameter from the URL
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  // Set the scenario based on the 'scenario' query parameter
  const scenario = parseInt(getQueryParam("scenario")) || 1;

  useEffect(() => {}, [scenario]);

  return (
    <div className="container">
      <div className="top">
        <Idpanel scenario={scenario}></Idpanel>
        <ProductsPanel scenario={scenario}></ProductsPanel>
        <IvrPanel scenario={scenario}></IvrPanel>
        <VerificationPanel scenario={scenario}></VerificationPanel>
      </div>
      <div className="iframe-container">
        <iframe src="https://localhost:3000/lloyds.png" width={100}></iframe>
      </div>

      {/* ChatBot Component */}
      <ChatBotComponent scenario={scenario} />
    </div>
  );
}

export default App;
