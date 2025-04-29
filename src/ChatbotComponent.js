import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

// Define styles using styled API
const ChatbotContainer = styled("div")(({ theme }) => ({
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
  "&.visible": {
    opacity: 1,
    visibility: "visible",
  },
}));

const ChatbotHeader = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#024731",
  padding: 15,
  marginBottom: 20,
  color: "#fff",
  position: "relative",
}));

const HeaderIcon = styled(SettingsSuggestOutlinedIcon)(({ theme }) => ({
  fontSize: "2rem",
  marginRight: 10,
  color: "#fff",
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  color: "#fff",
}));

const CloseButtonStyled = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },
}));

const MessagesContainer = styled(Paper)(({ theme }) => ({
  height: 400,
  overflowY: "auto",
  padding: 8,
  display: "flex",
  flexDirection: "column",
  marginBottom: 16,
}));

const Message = styled("div")(({ theme, isUser }) => ({
  margin: "4px 0",
  padding: 8,
  borderRadius: 4,
  maxWidth: "80%",
  lineHeight: 1.5,
  backgroundColor: isUser ? "#024731" : "#006a4d",
  color: "#fff",
  alignSelf: isUser ? "flex-end" : "flex-start",
  textAlign: isUser ? "right" : "left",
  display: "flex",
  alignItems: "flex-start",
}));

const BotIcon = styled("span")(({ theme }) => ({
  marginRight: 8,
}));

const InputForm = styled("form")(({ theme }) => ({
  display: "flex",
  gap: 8,
}));

const SendButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: "#024731",
  color: "#fff",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "#01361f",
  },
}));

const FeedbackButtons = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 4,
}));

const FeedbackButtonStyled = styled(IconButton)(({ theme, active }) => ({
  minWidth: "auto",
  padding: 4,
  color: "#fff",
  animation: active ? "sparkling 0.5s ease-out" : "none",
  "@keyframes sparkling": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.2)" },
    "100%": { transform: "scale(1)" },
  },
}));

const ChatbotToggle = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  cursor: "pointer",
}));

const ChatIcon = styled(SmartToyOutlinedIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: "#024731",
}));

const OfferBanner = styled("div")(({ theme }) => ({
  backgroundColor: "#ffecb3",
  border: "1px solid #ff9800",
  borderRadius: 8,
  padding: 10,
  marginBottom: 16,
  textAlign: "center",
}));

const OfferTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const ChatbotComponent = ({ scenario = 1 }) => {
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

  // Open chatbot with initial message on load
  useEffect(() => {
    const openChatbot = async () => {
      setIsVisible(true);

      // Type out welcome message with animation
      const welcomeMessage = { text: welcome, isUser: false };
      let typedMessage = "";

      for (let i = 0; i < welcomeMessage.text.length; i++) {
        typedMessage += welcomeMessage.text[i];
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { ...welcomeMessage, text: typedMessage },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setMessages((prev) => [...prev.slice(0, -1), welcomeMessage]);

      // Focus on input field
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 500);
    };

    setTimeout(openChatbot, 1000);
  }, [welcome]);

  // Helper function for API responses
  const chatWithGPT3 = async (userInput) => {
    // Special case handling
    if (userInput === "offer accepted please schedule a call back") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Call back Scheduled.. We will reach you out on or before 28/01/2024";
    }

    if (userInput === "increase the customer credit card limit") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Congratulations! Your request to increase your credit limit has been approved. You now have more financial flexibility at your fingertips.";
    }

    // API call
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
    };

    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].messages[1].content;
    } catch (error) {
      return "Error in retrieving information";
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Add placeholder for AI response
    setMessages((prev) => [...prev, { text: "...", isUser: false }]);

    // Get AI response
    let response = await chatWithGPT3(input);

    // Clean response by removing [doc1], [doc2], etc.
    response = response.replace(/\[doc\d+\]/g, "");

    // Type out AI response with animation
    for (let i = 0; i <= response.length; i++) {
      const partialResponse = response.slice(0, i);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: partialResponse, isUser: false },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    // Check if we should display an offer
    if (mockData?.[0]?.offerDisplay) {
      setTimeout(() => setDisplayOffer(true), 1000);
    }

    setInput("");
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

  return (
    <>
      {isVisible ? (
        <ChatbotContainer className={isVisible ? "visible" : ""}>
          {/* Header */}
          <ChatbotHeader>
            <HeaderIcon />
            <HeaderTitle variant="h5">Colleague Assist</HeaderTitle>
            <CloseButtonStyled onClick={() => setIsVisible(false)}>
              <CloseIcon />
            </CloseButtonStyled>
          </ChatbotHeader>

          {/* Messages */}
          <MessagesContainer>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {!message.isUser && <BotIcon>🤖</BotIcon>}
                <div>
                  <div>{formatMessage(message.text)}</div>

                  {/* Feedback buttons for AI messages */}
                  {!message.isUser && (
                    <FeedbackButtons>
                      <FeedbackButtonStyled
                        active={feedbackStatus[index] === "liked"}
                        onClick={() => handleFeedback(true, index)}
                      >
                        👍
                      </FeedbackButtonStyled>
                      <FeedbackButtonStyled
                        active={feedbackStatus[index] === "disliked"}
                        onClick={() => handleFeedback(false, index)}
                      >
                        👎
                      </FeedbackButtonStyled>
                    </FeedbackButtons>
                  )}
                </div>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          {/* Special offer section */}
          {displayOffer && (
            <OfferBanner>
              <OfferTitle variant="body1">Offer Available</OfferTitle>
              <Typography variant="body2">{mockData[0].offer}</Typography>
            </OfferBanner>
          )}

          {/* Input form */}
          <InputForm onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              inputRef={inputRef}
            />
            <SendButtonStyled
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </SendButtonStyled>
          </InputForm>
        </ChatbotContainer>
      ) : (
        <ChatbotToggle onClick={() => setIsVisible(true)}>
          <ChatIcon />
        </ChatbotToggle>
      )}
    </>
  );
};

export default ChatbotComponent;
