import React, { useState, useEffect } from "react";
import {
  Drawer,
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  Box,
  Link,
  Avatar,
  useMediaQuery,
  useTheme,
  Slide,
  Backdrop,
} from "@mui/material";
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  BugReport as BugReportIcon,
  Report as ReportIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const ReportStrip = ({
  onIncident = () => console.log("Incident callback"),
  onBug = () => console.log("Bug callback"),
  onHelp = () => console.log("Help callback"),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleIncident = () => {
    onIncident();
    setIsOpen(false);
  };

  const handleBug = () => {
    onBug();
    setIsOpen(false);
  };

  const handleHelp = (e) => {
    e.preventDefault();
    onHelp();
  };

  // Custom styled trigger button using Paper
  const TriggerButton = () => (
    <Paper
      component="button"
      onClick={() => setIsOpen(true)}
      elevation={8}
      sx={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        background: "linear-gradient(135deg, #d32f2f, #c62828)",
        color: "white",
        border: "none",
        padding: "24px 12px",
        borderRadius: "12px 0 0 12px",
        cursor: "pointer",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.standard,
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        minHeight: "120px",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        zIndex: theme.zIndex.fab,
        "&:hover": {
          transform: "translateY(-50%) translateX(-4px)",
          boxShadow: theme.shadows[12],
        },
      }}
    >
      <Typography
        variant="button"
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "1.5px",
          color: "inherit",
        }}
      >
        REPORT
      </Typography>
      <ReportIcon sx={{ fontSize: 20, writingMode: "initial" }} />
    </Paper>
  );

  // Panel Header Component
  const PanelHeader = () => (
    <Box
      sx={{
        background: "linear-gradient(135deg, #424242, #212121)",
        color: "white",
        p: 3,
        position: "relative",
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <IconButton
        onClick={() => setIsOpen(false)}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            transform: "rotate(90deg)",
          },
          transition: theme.transitions.create(
            ["background-color", "transform"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 500,
          mb: 1,
          letterSpacing: "0.0125em",
        }}
      >
        Report an Issue
      </Typography>

      <Typography
        variant="body1"
        sx={{
          opacity: 0.9,
          lineHeight: 1.5,
        }}
      >
        Choose the type of issue you'd like to report
      </Typography>
    </Box>
  );

  // Option Card Component
  const OptionCard = ({
    icon,
    title,
    description,
    onClick,
    color = "primary",
    gradientColors,
  }) => (
    <Card
      component="button"
      onClick={onClick}
      elevation={2}
      sx={{
        width: "100%",
        mb: 2,
        cursor: "pointer",
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        color: "white",
        border: "none",
        textAlign: "left",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
          "& .option-arrow": {
            transform: "translateX(4px)",
          },
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "inherit",
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 500,
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          </Box>

          <ArrowForwardIcon
            className="option-arrow"
            sx={{
              opacity: 0.7,
              ml: 1,
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
              }),
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  // Panel Footer Component
  const PanelFooter = () => (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "grey.50",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Having trouble?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={handleHelp}
          sx={{
            color: "error.main",
            fontWeight: 500,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Contact Support
        </Link>
      </Typography>
    </Box>
  );

  return (
    <>
      {/* Strip Trigger */}
      <TriggerButton />

      {/* Sliding Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : 400,
            maxWidth: "95vw",
          },
        }}
        SlideProps={{
          direction: "left",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <PanelHeader />

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              overflowY: "auto",
            }}
          >
            {/* Incident Option */}
            <OptionCard
              icon={<WarningIcon />}
              title="Raise an Incident"
              description="Report critical system issues or outages that need immediate attention"
              onClick={handleIncident}
              gradientColors={["#d32f2f", "#c62828"]}
            />

            {/* Bug Option */}
            <OptionCard
              icon={<BugReportIcon />}
              title="Report a Bug"
              description="Submit software bugs, glitches, or unexpected behavior"
              onClick={handleBug}
              gradientColors={["#0288d1", "#0277bd"]}
            />
          </Box>

          {/* Footer */}
          <PanelFooter />
        </Box>
      </Drawer>
    </>
  );
};

export default ReportStrip;
