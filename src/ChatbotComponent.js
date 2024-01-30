import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./css/Chatbot.css";
import { Button, TextField, Box, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SportsVolleyballOutlinedIcon from "@mui/icons-material/SportsVolleyballOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { chatBotdata } from "./data/chatbotData";
import { welcomeData } from "./data/welcomeData";
// import OfferAvailableSection from "./OfferAvailableSection";

const ChatbotComponent = (props) => {
  var mockData = [];
  var welcome;
  const { scenario } = props;
  if (scenario === 1) {
    mockData = chatBotdata.scenario1;
    welcome = welcomeData.scenario1.welcomeMessage;
  } else if (scenario === 2) {
    mockData = chatBotdata.scenario2;
    welcome = welcomeData.scenario2.welcomeMessage;
  } else if (scenario === 3) {
    mockData = chatBotdata.scenario3;
    welcome = welcomeData.scenario3.welcomeMessage;
  } else if (scenario === 4) {
    mockData = chatBotdata.scenario4;
    welcome = welcomeData.scenario4.welcomeMessage;
  } else if (scenario === 5) {
    mockData = chatBotdata.scenario5;
    welcome = welcomeData.scenario5.welcomeMessage;
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsvisible] = useState(false);
  const [displayOffer, setDisplayOffer] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [defaultMessageDisplayed, setDefaultMessageDisplayed] = useState(false);
  const tooltipRef = useRef(null);
  const [feedbackStatus, setFeedbackStatus] = useState({
    liked: false,
    disliked: false,
  });
  const [typeCompleted, setTypeCompleted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  var apiRes = true;

  const handleFeedback = (isLike, index) => {
    setFeedbackStatus({
      liked: isLike && !feedbackStatus.liked,
      disliked: !isLike && !feedbackStatus.disliked,
    });

    // You can update the state of messages based on the index
    const updatedMessages = [...messages];
    updatedMessages[index] = {
      ...updatedMessages[index],
      liked: isLike,
      disliked: !isLike,
    };
    setMessages(updatedMessages);
  };

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
        text: `${welcome}`,
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
    if (timeoutId1) setTypeCompleted(true);

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
    } else if (userInput === "increase the customer credit card limit") {
      // Wait for 2000 milliseconds (2 seconds)
      apiRes = true;
      // setDisplayOffer(false);
      await delay(2000);
      // Return the message after the delay
      return "Congratulations! Your request to increase your credit limit has been approved. You now have more financial flexibility at your fingertips. Enjoy the enhanced purchasing power and make the most of your expanded credit limit. Thank you for choosing us to support your financial journey!";
    }

    const apiEndpoint =
      "https://aaraa-openai.openai.azure.com/openai/deployments/aaraa-gptdeployment/extensions/chat/completions?api-version=2023-07-01-preview";
    const headers = {
      "Content-Type": "application/json",
      "api-key": "e88b1995f0134ba49071b0af6cf47a01",
    };

    const data = {
      dataSources: [
        {
          type: "AzureCognitiveSearch",
          parameters: {
            endpoint: "https://aaraa-search.search.windows.net",
            indexName: "aaraa-index",
            semanticConfiguration: null,
            queryType: "vectorSimpleHybrid",
            fieldsMapping: {},
            inScope: true,
            roleInformation:
              "You are an AI assistant that helps people find information from Lloyds knowledge base.",
            filter: null,
            strictness: 3,
            topNDocuments: 5,
            key: "YpPWDN4jr9FD9Ict8kvMSaaVY0yaTWoFU9AgcamZMDAzSeB1ipsO",
            embeddingDeploymentName: "aaraa-embedding",
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
      deployment: "aaraa-gptdeployment",
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

  // Add this function to your component
  const removeDocTags = (text) => {
    // Use regex to remove [doc1], [doc2], etc. patterns
    return text.replace(/\[doc\d+\]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true, tooltip: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: "...", user: false, tooltip: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithGPT3(input);

    // Remove [doc1], [doc2], etc. from the response
    const cleanedResponse = removeDocTags(response);

    // Display AI message with typing effect
    const typedResponse = await new Promise((resolve) => {
      const delayBetweenCharacters = 50; // Adjust the delay time between characters
      let currentCharacter = 0;
      let intervalId = setInterval(() => {
        if (currentCharacter <= cleanedResponse.length) {
          const partialResponse = cleanedResponse.slice(0, currentCharacter);
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { text: partialResponse, user: false, tooltip: false },
          ]);
          currentCharacter++;
        } else {
          clearInterval(intervalId);
          resolve(cleanedResponse);
        }
      }, delayBetweenCharacters);
    });

    const newAiMessage = { text: typedResponse, user: false, tooltip: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setTypeCompleted(true);
    if (response && mockData[0].offerDisplay && apiRes) {
      console.log("apiRespo", apiRes);
      setTimeout(() => {
        // const newAiMessage1 = {
        //   text: "Offer Available",
        //   user: false,
        //   tooltip: true,
        // };
        // setMessages((prevMessages) => [...prevMessages, newAiMessage1]);
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
      "£2500",
      "student",
      "Everyday",
      "joint",
      "eligible",
      "£1000",
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
          {/* Heading Section */}
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              background: "#024731",
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
          <Paper className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.user ? "user-message" : "ai-message"
                }`}
              >
                {message.user ? null : (
                  <SportsVolleyballOutlinedIcon
                    style={{ fontSize: 20, padding: 8, display: "flex" }}
                  />
                )}
                <div>
                  <>{formatMessage(message.text)}</>
                  <div>
                    {message.user
                      ? null
                      : typeCompleted && (
                          <div className="feedback-buttons">
                            <IconButton
                              onClick={() => handleFeedback(true, index)}
                              className={
                                feedbackStatus.liked ? "sparkling" : ""
                              }
                              style={{
                                color: message.liked && "green",
                                border: "none",
                                fontSize: "22px",
                              }}
                            >
                              👍
                            </IconButton>
                            <IconButton
                              onClick={() => handleFeedback(false, index)}
                              style={{
                                color: message.disliked && "red",
                                border: "none",
                                fontSize: "22px",
                              }}
                            >
                              👎
                            </IconButton>
                          </div>
                        )}
                  </div>
                </div>
              </div>
            ))}

            {/* {messages.map((message, index) => (
              <>
                {message.user ? null : (
                 typeCompleted && <div className="feedback-buttons">
                    <IconButton
                      onClick={() => handleFeedback(true, index)}
                      style={{
                        color: message.liked && "green",
                        border: "none",
                        fontSize:"22px"
                      }}
                    >
                      👍
                    </IconButton>
                    <IconButton
                      onClick={() => handleFeedback(false, index)}
                      style={{
                        color: message.disliked && "red",
                        border: "none",
                        fontSize:"22px"
                      }}
                    >
                      👎
                    </IconButton>
                  </div>
                )}
              </>
            ))} */}
            <div ref={messagesEndRef}></div>
          </Paper>

          <div>
            {displayOffer && (
              <div
                className="offer-available-section"
                style={{
                  background: "#FFECB3",
                  padding: "15px",
                  marginBottom: "15px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "2px solid #FF9800",
                }}
              >
                <Typography variant="body1" color="textPrimary">
                  <strong>Offer Available</strong>
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {mockData[0].offer}
                </Typography>
              </div>
            )}
            <form className="chatbot-input-form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  width: 700,
                  maxWidth: "100%",
                  boxShadow: "#024731",
                }}
              >
                <TextField
                  fullWidth
                  hiddenLabel
                  id="outlined"
                  variant="outlined"
                  placeholder="Type your querry..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  inputRef={inputRef}
                  InputProps={{
                    style: { color: "#024731" },
                  }}
                />
              </Box>

              <Button
                onClick={handleSubmit}
                variant="contained"
                style={{ background: "#024731", paddingRight: 5, width: "35%" }}
                endIcon={<SendIcon style={{ paddingRight: 10 }} />}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div onClick={handleOpenBot}>
          <SmartToyOutlinedIcon
            style={{ fontSize: 50, color: " #024731" }}
            className="chatIcon"
          ></SmartToyOutlinedIcon>
        </div>
      )}
    </>
  );
};
export default ChatbotComponent;
