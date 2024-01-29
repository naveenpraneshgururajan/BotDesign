import React from "react";
import "./App.css";
// import IframeComponent from './IframeComponent'
import ChatBotComponent from "./ChatbotComponent";
import { Paper, TextField } from "@mui/material";
import Idpanel from "./panels/Idpanel";
import ProductsPanel from "./panels/ProductsPanel";
import IvrPanel from "./panels/IvrPanel";
import VerificationPanel from "./panels/VerificationPanel";
import WhatsappComponent from "./WhatsappComponent";

function App() {
  const scenario = 5;
  return (
    <div className="container">
      <div className="top">
        <Idpanel scenario={scenario}></Idpanel>
        {/* <ProductsPanel scenario={scenario}></ProductsPanel> */}
        <IvrPanel scenario={scenario}></IvrPanel>
        <VerificationPanel scenario={scenario}></VerificationPanel>
      </div>
      <div className="iframe-container">
        <iframe src="https://localhost:3000/lloyds.png" width={100}></iframe>
        {/* <iframe
          title="Lloyds banking group"
          srcDoc="HHHHHHHHHHHh"
          width={600}
          height={499}
        /> */}
      </div>

      {/* ChatBot Component */}
       <ChatBotComponent scenario={scenario} />
       
       {/* <WhatsappComponent scenario={scenario} /> */}
    </div>
  );
}

export default App;
