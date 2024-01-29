import React, { useRef, useEffect, useState } from "react";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import "./Whatsapp.css";
import { chatBotdata } from "./data/chatbotData";
import axios from "axios";

import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

const WhatsappComponent = (props) => {
  var mockData = [];
  const { scenario } = props;
  if (scenario === 1) {
    mockData = chatBotdata.scenario1;
  } else if (scenario === 2) {
    mockData = chatBotdata.scenario2;
  } else if (scenario === 3) {
    mockData = chatBotdata.scenario3;
  } else if (scenario === 4) {
    mockData = chatBotdata.scenario4;
  } else if (scenario === 5) {
    mockData = chatBotdata.scenario5;
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsvisible] = useState(false);
  const [displayOffer, setDisplayOffer] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [defaultMessageDisplayed, setDefaultMessageDisplayed] = useState(false);
  const tooltipRef = useRef(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  var apiRes = true;

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Trigger the effect whenever messages change

  useEffect(() => {
    // Add event listener to close Tooltip on outside click
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltipOpen(false);
      }
    };
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const openChatbotWithDelay = async () => {
      setIsvisible(true);

      const welcomeMessage = {
        text: "Hello! How can I assist you today?..",
        user: false,
        tooltip: false,
      };

      let welcomeMessageWithTyping = "";
      for (let i = 0; i < welcomeMessage.text.length; i++) {
        welcomeMessageWithTyping += welcomeMessage.text[i];
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { ...welcomeMessage, text: welcomeMessageWithTyping },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay time between characters
      }

      // Add the complete message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        welcomeMessage,
      ]);
      // Set the state to indicate that the default message is displayed
      setDefaultMessageDisplayed(true);
    };

    const delay1 = 2000; // Adjust the delay time in milliseconds
    const timeoutId1 = setTimeout(openChatbotWithDelay, delay1);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeoutId1);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Focus on the text box when the component mounts
    if (isVisible && defaultMessageDisplayed) {
      inputRef.current.focus();
    }
  }, [isVisible, defaultMessageDisplayed]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const chatWithGPT3 = async (userInput) => {
    if (userInput === "offer accepted please schedule a call back") {
      // Wait for 2000 milliseconds (2 seconds)
      apiRes = false;
      // setDisplayOffer(false);
      await delay(2000);
      // Return the message after the delay
      return "Call back Scheduled.. We will reach you out on or before 28/01/2024";
    }
    const apiEndpoint = "";
    // "https://aaraa-openai.openai.azure.com/openai/deployments/aaraa-gptdeployment/extensions/chat/completions?api-version=2023-07-01-preview";
    const headers = {
      "Content-Type": "application/json",
      "api-key": "e88b1995f0134ba49071b0af6cf47a01",
    };

    const data = {
      dataSources: [
        {
          type: "AzureCognitiveSearch",
          parameters: {
            endpoint: "https://aaraa-aisearch.search.windows.net",
            indexName: "aaraa-index",
            semanticConfiguration: "default",
            queryType: "simple",
            fieldsMapping: {},
            inScope: true,
            roleInformation:
              "You are an AI assistant that helps people find information.",
            filter: null,
            strictness: 3,
            topNDocuments: 5,
            key: "BhgQYkKlVjwKywbDMFKwKh5O8UQ4DiXwK0ZHmim2GKAzSeBIFYRG",
          },
        },
      ],
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps people find information.",
        },
        {
          role: "user",
          content: `${userInput} in 2 lines`, //Replace input given in chat window
        },
      ],
      deployment: "aaraa-openai-deployment",
      temperature: 0,
      top_p: 1,
      max_tokens: 800,
      stop: null,
      stream: false,
    };
    try {
      var response = await axios.post(apiEndpoint, data, { headers });
      response = response.data.choices[0].messages[1].content;
      console.log("Checking the res", response);
      apiRes = true;
      return response;
    } catch (error) {
      return "Error in retriving information";
    }
  };

  const handleClose = () => {
    return setIsvisible(false);
  };
  const handleOpenBot = () => {
    return setIsvisible(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true, tooltip: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: "...", user: false, tooltip: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithGPT3(input);

    // Display AI message with typing effect
    const typedResponse = await new Promise((resolve) => {
      const delayBetweenCharacters = 50; // Adjust the delay time between characters
      let currentCharacter = 0;
      let intervalId = setInterval(() => {
        if (currentCharacter <= response.length) {
          const partialResponse = response.slice(0, currentCharacter);
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { text: partialResponse, user: false, tooltip: false },
          ]);
          currentCharacter++;
        } else {
          clearInterval(intervalId);
          resolve(response);
        }
      }, delayBetweenCharacters);
    });

    const newAiMessage = { text: typedResponse, user: false, tooltip: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    if (response && mockData[0].offerDisplay && apiRes) {
      console.log("apiRespo", apiRes);
      setTimeout(() => {
        const newAiMessage1 = {
          text: "Offer Available",
          user: false,
          tooltip: true,
        };
        setMessages((prevMessages) => [...prevMessages, newAiMessage1]);
        setDisplayOffer(true);
      }, 2000);
    }
    setInput("");
  };

  const handleTooltipToggle = () => {
    setTooltipOpen((prev) => !prev);
  };

  const formatMessage = (message) => {
    const originalString = message;
    const targetPhrases = [
      "Error",
      "information",
      "Current",
      "Classic",
      "Silver",
      "Club",
      "Platinum",
      "Mortgage",
      "Savings",
      "youth",
      "student",
      "Everyday",
      "joint",
    ];

    const words = originalString.split(/\s+/);

    let resultString = "";

    words.forEach((word, index) => {
      const isTargetPhrase = targetPhrases.some(
        (phrase) => phrase.toLowerCase() === word.toLowerCase()
      );

      resultString +=
        (index > 0 ? " " : "") + (isTargetPhrase ? `**${word}**` : word);
    });

    return resultString;
  };

  return (
    <>
      {isVisible ? (
        <div className={`chatbot-container${isVisible ? " visible" : ""}`}>
          {/* <Paper className="chatbot-header">
            <IconButton className="closeButton" onClick={handleClose}>
              <CloseIcon style={{ color: "#ffffff" }} />
            </IconButton>
            <ChatIcon style={{ color: "#25D366" }} />
            <div className="chat-header-text">Chatbot</div>
          </Paper> */} 

           <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              background: "#075E54",
              padding: "15px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <SettingsSuggestOutlinedIcon
              style={{
                fontSize: 50,
                color: "#FFF",
                display: "flex",
                alignItems: "flex-start",
              }}
            ></SettingsSuggestOutlinedIcon>
            <Typography
              variant="h2"
              style={{
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15%",
              }}
            >
              Colleague Assist
            </Typography>
            <div className="closeButton" onClick={handleClose}>
              <CloseIcon
                style={{
                  position: "absolute",
                  top: 30,
                  right: 30,
                  fontSize: 30,
                  color: "#ffffff",
                }}
              ></CloseIcon>
            </div>
          </Paper>

{/* <Paper
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#34B7F1", // Change this to your preferred color
    color: "#FFF",
    marginBottom: "20px",
    borderRadius: "15px", // Optional: Add border-radius for rounded corners
  }}
>
  <div style={{ display: "flex", alignItems: "center" }}>
    <ChatIcon style={{ fontSize: 30, marginRight: "10px" }} />
    <Typography variant="h3">Colleague Assist</Typography>
  </div>
  <IconButton className="closeButton" onClick={handleClose}>
    <CloseIcon style={{ fontSize: 30, color: "#ffffff" }} />
  </IconButton>
</Paper> */}

          <Paper className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.user ? "user-message" : "ai-message"
                }`}
              >
                {message.user ? (
                  <span className="user-icon">
                    👤
                  </span> /* You can use an actual user icon here */
                ) : (
                  <span className="ai-icon">
                    🤖
                  </span> /* You can use an actual AI icon here */
                )}
                {displayOffer && !message.user && message.tooltip ? (
                  <div ref={tooltipRef} className="ai-tooltip">
                    <Tooltip
                      title={mockData[0].offer}
                      arrow
                      placement="left"
                      open={tooltipOpen}
                      onClose={() => setTooltipOpen(false)}
                    >
                      <IconButton
                        className="ai-icon"
                        onClick={handleTooltipToggle}
                      >
                        <InfoOutlinedIcon
                          style={{ fontSize: 20, color: "#000" }}
                        />
                      </IconButton>
                    </Tooltip>
                    {formatMessage(message.text)}
                  </div>
                ) : (
                  <>
                    {message.user ? (
                      formatMessage(message.text)
                    ) : (
                      <span className="ai-message-text">
                        {formatMessage(message.text)}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </Paper>

          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderTop: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                hiddenLabel
                id="outlined"
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                inputRef={inputRef}
                InputProps={{
                  style: { color: "#000" },
                }}
              />

              <IconButton
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#075E54",
                  color: "#fff",
                  fontSize: "x-large",
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </form>
        </div>
      ) : (
        <div onClick={handleOpenBot}>
          <ChatIcon
            style={{ fontSize: 50, color: "#075E54" }}
            className="chatIcon"
          />
        </div>
      )}
    </>
  );
};

export default WhatsappComponent;
