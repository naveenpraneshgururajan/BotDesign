import { ListItem, ListItemText, SvgIcon, Typography } from "@mui/material";
import React from "react";

export const PanelItem = (props) => {
  const { icon, label, value } = props;

  return (
    <ListItem
      style={{
        marginLeft: 25,
        marginTop: 2,
        textAlign: "justify",
        padding: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <SvgIcon
        component={icon}
        style={{ fontSize: 32, marginRight: 15, fontWeight: 300 }}
      ></SvgIcon>
      <ListItemText
        className="itemTitle"
        style={{ width: "90px" }}
        primary={<Typography style={{ fontSize: 20,fontWeight: 550 }}>{label}:</Typography>}
      />
      <ListItemText
        style={{
          width: "200px",
          fontSize: 18,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        primary={<Typography style={{ fontWeight: 400 }}>{value}</Typography>}
      />
    </ListItem>
  );
};

export default PanelItem;
