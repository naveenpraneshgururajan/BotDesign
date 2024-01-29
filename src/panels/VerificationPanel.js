import React from "react";
import { Paper } from "@mui/material";
import PanelItem from "../PanelItem";
import {verificationPaneldata} from '../data/data'

export const VerificationPanel = (props) => {
    const {scenario} = props
    var data = [];
    if(scenario === 1){
         data = verificationPaneldata.scenario1
    } else if(scenario ===2){
        data = verificationPaneldata.scenario2
    }else if(scenario ===3){
        data = verificationPaneldata.scenario3
    }else if(scenario ===4){
        data = verificationPaneldata.scenario4
    }else if(scenario ===5){
        data = verificationPaneldata.scenario5
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

export default VerificationPanel;
