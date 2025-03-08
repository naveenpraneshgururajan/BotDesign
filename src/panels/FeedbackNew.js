import React, { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const feedbackData = [
  {
    category: "Call Handling",
    feedback:
      "Handled calls professionally, maintained a calm tone, and resolved queries effectively.",
    improvement: "Could work on reducing hold times.",
    rating: 5,
  },
  {
    category: "Time Management",
    feedback:
      "Managed multiple calls efficiently without compromising on quality.",
    improvement: "Could work on reducing response time between calls.",
    rating: 4,
  },
  {
    category: "Clarity & Communication",
    feedback:
      "Explained solutions clearly and ensured the customer understood the process.",
    improvement: "Could improve on avoiding technical jargon.",
    rating: 4,
  },
  {
    category: "Problem Resolution",
    feedback: "Quickly identified issues and provided effective solutions.",
    improvement: "Could enhance troubleshooting skills for complex cases.",
    rating: 5,
  },
  {
    category: "Technical Knowledge",
    feedback:
      "Demonstrated strong product knowledge and provided accurate solutions.",
    improvement: "Could stay updated with new feature releases.",
    rating: 4,
  },
  {
    category: "Patience & Empathy",
    feedback:
      "Showed great patience and empathy when dealing with frustrated customers.",
    improvement: "Could improve active listening skills.",
    rating: 5,
  },
];

const overallRating = 89;

const FeedbackNew = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [showOverallRating, setShowOverallRating] = useState(false);

  useEffect(() => {
    feedbackData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
        if (index === feedbackData.length - 1) {
          setTimeout(() => {
            setShowOverallRating(true);
          }, 1000);
        }
      }, (index + 1) * 1000);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 1,
          marginTop: 1,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Colleague Feedback
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#F8F9FA",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-evenly",
          padding: 2,
          color: "black",
        }}
      >
        {/* Overall Performance Rating */}
        <Box
          sx={{
            backgroundColor: "white",
            color: "black",
            padding: 2,
            borderRadius: "16px",
            textAlign: "center",
            width: "15%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "85%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Your score is
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "green" }}>
            Awesome
          </Typography>
          <CircularProgress
            variant={showOverallRating ? "determinate" : "indeterminate"}
            value={overallRating}
            size={120}
            sx={{ marginTop: 2, color: "#D4145A" }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 1 }}>
            {overallRating}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            out of 100
          </Typography>
        </Box>

        {/* Performance Feedback Section */}
        <Box
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {feedbackData.map((feedback, index) =>
            visibleCards.includes(index) ? (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: 3,
                  borderRadius: "12px",
                  textAlign: "left",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {feedback.category}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: "#2E7D32",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Excellent
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {feedback.rating * 20}%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {feedback.feedback}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: "#E65100",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: 1,
                  }}
                >
                  High Impact
                </Typography>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FeedbackNew;
