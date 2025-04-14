import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import AllPanels from "./AllPanels";
import Feedback from "./panels/Feedback";
import FeedbackNew from "./panels/FeedbackNew";

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
      {/* Routes should be inside <Routes>, but no <Router> */}
      <Routes>
        <Route path="/" element={<AllPanels />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback2" element={<FeedbackNew />} />
      </Routes>
    </div>
  );
}

export default App;
