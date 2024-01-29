import React from "react";
import { Paper } from "@mui/material";
import PanelItem from "../PanelItem";

import { ivrPaneldata } from "../data/data";

export const IvrPanel = (props) => {
  var data = [];
  const { scenario } = props;
  if (scenario === 1) {
    data = ivrPaneldata.scenario1;
  } else if (scenario === 2) {
    data = ivrPaneldata.scenario2;
  } else if (scenario === 3) {
    data = ivrPaneldata.scenario3;
  } else if (scenario === 4) {
    data = ivrPaneldata.scenario4;
  } else if (scenario === 5) {
    data = ivrPaneldata.scenario5;
  }
  return (
    <Paper elevation={6} className="panel">
      {data.map((a,index) => {
        return (
          <div key={index}>
          <PanelItem icon={a.icon} label={a.label} value={a.value}></PanelItem>
          </div>
        );
      })}
    </Paper>
  );
};

export default IvrPanel;
