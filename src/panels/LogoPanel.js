import { useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";

export const LogoPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open("https://localhost:3000/feedback", "_blank"); // Opens /feedback in a new tab
  };

  return (
    <Paper
      elevation={6}
      className="panelLogo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Paper>
  );
};

export default LogoPanel;
