import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import ChatBotComponent from "./ChatbotComponent";
import Idpanel from "./panels/Idpanel";
import ProductsPanel from "./panels/ProductsPanel";
import IvrPanel from "./panels/IvrPanel";
import VerificationPanel from "./panels/VerificationPanel";
import LogoPanel from "./panels/LogoPanel";
import ReportStrip from "./ReportStrip";

function AllPanels() {
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
      {/* Other components that should always render */}
      <div className="top">
        <LogoPanel />
        <Idpanel scenario={scenario} />
        <ProductsPanel scenario={scenario} />
        <IvrPanel scenario={scenario} />
        <VerificationPanel scenario={scenario} />
      </div>

      <div className="iframe-container">
        <iframe src="https://localhost:3000/lloyds.png" width={100}></iframe>
      </div>

      {/* ChatBot Component */}
      <ChatBotComponent scenario={scenario} />
      <ReportStrip />
    </div>
  );
}

export default AllPanels;
