import { useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";

export const LogoPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open("https://localhost:3000/feedback", "_blank"); // Opens /feedback in a new tab
  };

  const handleLogout2 = () => {
    window.open("https://localhost:3000/feedback2", "_blank"); // Opens /feedback in a new tab
  };
  return (
    <Paper
      elevation={6}
      className="panelLogo"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="contained" color="success" onClick={handleLogout}>
        Logout
      </Button>

      <Button variant="contained" color="success" onClick={handleLogout2}>
        Logout2
      </Button>
    </Paper>
  );
};

export default LogoPanel;
