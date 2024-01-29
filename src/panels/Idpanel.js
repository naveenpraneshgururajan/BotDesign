import React from "react";
import { Paper } from "@mui/material";
import PanelItem from "../PanelItem";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
import {idPaneldata} from '../data/data'


export const Idpanel = (props) => {
  var data = []
  const {scenario} = props
  if(scenario === 1){
       data = idPaneldata.scenario1
  }else if(scenario ===2){
    data = idPaneldata.scenario2
  }else if(scenario ===3){
    data = idPaneldata.scenario3
  }else if(scenario ===4){
    data = idPaneldata.scenario4
  }else if(scenario ===5){
    data = idPaneldata.scenario5
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

export default Idpanel;
