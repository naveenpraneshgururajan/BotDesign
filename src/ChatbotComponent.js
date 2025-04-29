import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

// Define styles using makeStyles
const useStyles = makeStyles({
  // Container and layout
  chatbotContainer: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 450,
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.5s ease-in, visibility 0.5s ease-in",
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },

  // Header styles
  chatbotHeader: {
    display: "flex",
    alignItems: "center",
    background: "#024731 !important",
    padding: 15,
    marginBottom: 20,
    color: "#fff !important",
    position: "relative",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  headerIcon: {
    fontSize: "2rem",
    marginRight: 10,
    color: "#fff !important",
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: "center",
    color: "#fff !important",
    fontWeight: "bold",
    fontSize: "1.4rem",
    fontFamily: "Arial, sans-serif",
    marginRight: "15%",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonIcon: {
    color: "#fff !important",
  },

  // Messages area
  messagesContainer: {
    height: 400,
    overflowY: "auto",
    padding: 8,
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
    border: "1px solid #ddd",
    borderRadius: 4,
  },
  message: {
    margin: "4px 0",
    padding: 8,
    borderRadius: 4,
    maxWidth: "80%",
    lineHeight: 1.5,
  },
  userMessage: {
    backgroundColor: "#024731 !important",
    color: "#fff !important",
    alignSelf: "flex-end",
    textAlign: "right",
    padding: "10px 15px",
    borderRadius: "4px",
  },
  aiMessage: {
    backgroundColor: "#006a4d !important",
    color: "#fff !important",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: "4px",
    height: "fit-content",
    width: "fit-content",
    wordBreak: "break-word",
  },
  botIcon: {
    marginRight: 8,
    fontSize: "20px",
    padding: 8,
    display: "flex",
  },

  // Input form
  inputForm: {
    display: "flex",
    gap: 8,
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#024731",
      },
      "&:hover fieldset": {
        borderColor: "#024731",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#024731",
      },
    },
  },
  sendButton: {
    backgroundColor: "#024731 !important",
    color: "#fff !important",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: "#01361f !important",
    },
  },

  // Feedback buttons
  feedbackButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  feedbackButton: {
    minWidth: "auto",
    padding: 4,
    color: "#fff",
  },
  sparkling: {
    animation: "$sparkling 0.5s ease-out",
  },

  // Animation
  "@keyframes sparkling": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.2)" },
    "100%": { transform: "scale(1)" },
  },

  // Chat toggle button
  chatbotToggle: {
    position: "fixed",
    bottom: 20,
    right: 20,
    cursor: "pointer",
    zIndex: 1000,
  },
  chatIcon: {
    fontSize: "3rem",
    color: "#024731 !important",
  },

  // Offer banner
  offerBanner: {
    backgroundColor: "#ffecb3",
    border: "1px solid #ff9800",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    textAlign: "center",
  },
  offerTitle: {
    fontWeight: "bold",
  },
});

const ChatbotComponent = ({ scenario = 1 }) => {
  const classes = useStyles();

  // Configuration based on scenario
  const getScenarioData = () => {
    const chatBotdata = {
      scenario1: [
        { offerDisplay: true, offer: "Special offer for scenario 1" },
      ],
      scenario2: [
        { offerDisplay: true, offer: "Special offer for scenario 2" },
      ],
      scenario3: [
        { offerDisplay: true, offer: "Special offer for scenario 3" },
      ],
      scenario4: [
        { offerDisplay: true, offer: "Special offer for scenario 4" },
      ],
      scenario5: [
        { offerDisplay: true, offer: "Special offer for scenario 5" },
      ],
    };

    const welcomeData = {
      scenario1: { welcomeMessage: "Welcome to scenario 1" },
      scenario2: { welcomeMessage: "Welcome to scenario 2" },
      scenario3: { welcomeMessage: "Welcome to scenario 3" },
      scenario4: { welcomeMessage: "Welcome to scenario 4" },
      scenario5: { welcomeMessage: "Welcome to scenario 5" },
    };

    return {
      mockData: chatBotdata[`scenario${scenario}`] || chatBotdata.scenario1,
      welcome:
        welcomeData[`scenario${scenario}`]?.welcomeMessage ||
        "Welcome to our chatbot!",
    };
  };

  const { mockData, welcome } = getScenarioData();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [displayOffer, setDisplayOffer] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({});

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Open chatbot with initial message on load - simplified
  useEffect(() => {
    const openChatbot = async () => {
      setIsVisible(true);

      // Add initial empty placeholder for welcome message
      setMessages([{ text: "", isUser: false }]);

      // Animate the welcome message
      await animateTyping(welcome);

      // Focus on input field
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 500);
    };

    setTimeout(openChatbot, 1000);
  }, [welcome]);

  // Helper function for API responses - simplified
  const callChatAPI = async (userInput) => {
    // Handle special cases first
    if (userInput === "offer accepted please schedule a call back") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Call back Scheduled.. We will reach you out on or before 28/01/2024";
    }

    if (userInput === "increase the customer credit card limit") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Congratulations! Your request to increase your credit limit has been approved. You now have more financial flexibility at your fingertips.";
    }

    try {
      // API configuration
      const response = await axios.post(
        "https://aaraa-openai.openai.azure.com/openai/deployments/aaraa-gptdeployment/extensions/chat/completions?api-version=2023-07-01-preview",
        {
          dataSources: [
            {
              type: "AzureCognitiveSearch",
              parameters: {
                endpoint: "https://aaraa-search.search.windows.net",
                indexName: "aaraa-index",
                key: "YpPWDN4jr9FD9Ict8kvMSaaVY0yaTWoFU9AgcamZMDAzSeB1ipsO",
                embeddingDeploymentName: "aaraa-embedding",
                queryType: "vectorSimpleHybrid",
                strictness: 3,
                topNDocuments: 5,
                inScope: true,
              },
            },
          ],
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant that helps people find information.",
            },
            { role: "user", content: `${userInput} in 2 lines` },
          ],
          deployment: "aaraa-gptdeployment",
          temperature: 0,
          max_tokens: 800,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": "e88b1995f0134ba49071b0af6cf47a01",
          },
        }
      );

      return response.data.choices[0].messages[1].content;
    } catch (error) {
      console.error("API Error:", error);
      return "Error in retrieving information";
    }
  };

  // Form submission handler - simplified
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);

    // Add placeholder for AI response
    setMessages((prev) => [...prev, { text: "...", isUser: false }]);

    // Get AI response
    const response = await callChatAPI(input);
    const cleanResponse = response.replace(/\[doc\d+\]/g, "");

    // Type out AI response with animation
    await animateTyping(cleanResponse);

    // Check if we should display an offer
    if (mockData?.[0]?.offerDisplay) {
      setTimeout(() => setDisplayOffer(true), 1000);
    }

    setInput("");
  };

  // Animate typing effect for messages
  const animateTyping = async (fullText) => {
    for (let i = 1; i <= fullText.length; i++) {
      const partialText = fullText.substring(0, i);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 20));

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: partialText,
          isUser: false,
        };
        return newMessages;
      });
    }
  };

  // Feedback handler
  const handleFeedback = (isLike, index) => {
    setFeedbackStatus((prev) => ({
      ...prev,
      [index]: isLike ? "liked" : "disliked",
    }));
  };

  // Format message to bold certain keywords
  const formatMessage = (message) => {
    const keywords = [
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

    return message
      .split(/\s+/)
      .map((word, i) =>
        keywords.some((kw) => kw.toLowerCase() === word.toLowerCase())
          ? `${i > 0 ? " " : ""}**${word}**`
          : `${i > 0 ? " " : ""}${word}`
      )
      .join("");
  };

  // Helper component for displaying messages
  const MessageBubble = ({ message, index }) => {
    const isUserMessage = message.isUser;

    return (
      <div
        className={`${classes.message} ${
          isUserMessage ? classes.userMessage : classes.aiMessage
        }`}
      >
        {!isUserMessage && <span className={classes.botIcon}>🤖</span>}
        <div>
          <div>{formatMessage(message.text)}</div>

          {/* Feedback buttons only for AI messages */}
          {!isUserMessage && (
            <div className={classes.feedbackButtons}>
              <IconButton
                size="small"
                className={`${classes.feedbackButton} ${
                  feedbackStatus[index] === "liked" ? classes.sparkling : ""
                }`}
                onClick={() => handleFeedback(true, index)}
              >
                👍
              </IconButton>
              <IconButton
                size="small"
                className={`${classes.feedbackButton} ${
                  feedbackStatus[index] === "disliked" ? classes.sparkling : ""
                }`}
                onClick={() => handleFeedback(false, index)}
              >
                👎
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {isVisible ? (
        <div
          className={`${classes.chatbotContainer} ${
            isVisible ? classes.visible : ""
          }`}
        >
          {/* Header */}
          <div className={classes.chatbotHeader}>
            <SettingsSuggestOutlinedIcon className={classes.headerIcon} />
            <Typography variant="h5" className={classes.headerTitle}>
              Colleague Assist
            </Typography>
            <div className={classes.closeButtonContainer}>
              <IconButton size="small" onClick={() => setIsVisible(false)}>
                <CloseIcon className={classes.closeButtonIcon} />
              </IconButton>
            </div>
          </div>

          {/* Messages */}
          <Paper className={classes.messagesContainer} elevation={1}>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} index={index} />
            ))}
            <div ref={messagesEndRef} />
          </Paper>

          {/* Special offer section */}
          {displayOffer && (
            <div className={classes.offerBanner}>
              <Typography variant="body1" className={classes.offerTitle}>
                Offer Available
              </Typography>
              <Typography variant="body2">{mockData[0].offer}</Typography>
            </div>
          )}

          {/* Input form */}
          <form className={classes.inputForm} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              inputRef={inputRef}
              className={classes.inputField}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.sendButton}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div
          className={classes.chatbotToggle}
          onClick={() => setIsVisible(true)}
        >
          <SmartToyOutlinedIcon className={classes.chatIcon} />
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
