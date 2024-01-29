import React from "react";
import { Paper } from "@mui/material";
import PanelItem from "../PanelItem";
import {productsPaneldata} from '../data/data'

export const ProductsPanel = (props) => {
  var data = []
  const {scenario} = props
  if(scenario === 1){
       data = productsPaneldata.scenario1
  }else if(scenario === 2){
    data = productsPaneldata.scenario2
  }else if(scenario === 3){
    data = productsPaneldata.scenario3
  }else if(scenario === 4){
    data = productsPaneldata.scenario4
  }else if(scenario === 5){
    data = productsPaneldata.scenario5
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

export default ProductsPanel;
