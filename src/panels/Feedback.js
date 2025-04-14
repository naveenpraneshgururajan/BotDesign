// import React from "react";
// import { Typography, Box, Rating, Card, CardContent } from "@mui/material";

// const Feedback = () => {
//   const colleaguePerformance = {
//     rating: 4,
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#0B1A30",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 5,
//       }}
//     >
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 3,
//           maxWidth: "800px", // Limits overall width
//           width: "100%",
//         }}
//       >
//         {/* Performance Evaluation Card */}
//         <Card sx={{ backgroundColor: "#FF6B6B", color: "white", padding: 2 }}>
//           <CardContent>
//             <Typography variant="h6">Performance Evaluation</Typography>
//             <Typography variant="body1">Audio → Video → Performance</Typography>
//           </CardContent>
//         </Card>

//         {/* Rating Card */}
//         <Card sx={{ backgroundColor: "#FF865E", color: "white", padding: 3 }}>
//           <CardContent>
//             <Typography variant="h6">How do you rate our services?</Typography>
//             <Rating value={colleaguePerformance.rating} readOnly size="large" />
//           </CardContent>
//         </Card>

//         {/* Experience Rating */}
//         <Card sx={{ backgroundColor: "#A463F2", color: "white", padding: 8 }}>
//           <CardContent>
//             <Typography variant="h6">Rate your experience</Typography>
//             <Typography variant="body1">1 2 3 4 5</Typography>
//           </CardContent>
//         </Card>

//         {/* Issues Reporting */}
//         <Card sx={{ backgroundColor: "#6420AA", color: "white", padding: 5 }}>
//           <CardContent>
//             <Typography variant="h6">What didn't work properly?</Typography>
//             <Typography variant="body1">☐ Video was blurry</Typography>
//             <Typography variant="body1">☐ Sound wasn’t working</Typography>
//             <Typography variant="body1">☐ App was crashing</Typography>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Feedback;

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Rating,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
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

const overallRating = 5;

const Feedback = () => {
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

  const columns = Math.min(4, Math.ceil(feedbackData.length / 2));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxHeight: "100vh",
          background: "linear-gradient(135deg, #0B1A30, #162544)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
          overflowY: "auto",
        }}
      >
        {/* Overall Performance Rating */}
        <Card
          sx={{
            backgroundColor: "#1E2A47",
            color: "white",
            padding: 0.5,
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            marginBottom: 8,
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#F8C630" }}
            >
              Overall Performance Rating
            </Typography>
            {showOverallRating ? (
              <Rating
                value={overallRating}
                readOnly
                size="large"
                sx={{ marginTop: 1, color: "#F8C630" }}
              />
            ) : (
              <CircularProgress sx={{ marginTop: 2, color: "#F8C630" }} />
            )}
          </CardContent>
        </Card>

        {/* Divider to separate sections */}
        <Divider
          sx={{
            width: "80%",
            backgroundColor: "#F8C630",
            marginBottom: 2,
            opacity: 0.6,
          }}
        />

        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#F8C630", marginBottom: "30px" }}
        >
          Performance Feedback
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 6,
            maxWidth: "55vw",
            width: "100%",
          }}
        >
          {feedbackData.map((feedback, index) =>
            visibleCards.includes(index) ? (
              <Card
                key={index}
                sx={{
                  backgroundColor: "white",
                  color: "#333",
                  padding: 1,
                  borderRadius: "12px",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
                  },
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
                  >
                    {feedback.category}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#2E7D32" }}
                  >
                    ✅ What went well:
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {feedback.feedback}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#D32F2F" }}
                  >
                    ⚠️ Areas for Improvement:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", color: "#555", mb: 2 }}
                  >
                    {feedback.improvement}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Rating
                    value={feedback.rating}
                    readOnly
                    size="large"
                    sx={{ display: "flex", justifyContent: "center" }}
                  />
                </CardContent>
              </Card>
            ) : null
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Feedback;
