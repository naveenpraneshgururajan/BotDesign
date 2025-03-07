import { useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";

export const Feedback = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/feedback"); // Navigates to the Feedback page
  };

  return (
    <Paper
      elevation={6}
      className="panelLogo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logouttt
      </Button>
    </Paper>
  );
};

export default Feedback;
