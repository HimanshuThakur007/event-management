import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';





const PieChart =(props)=> {
  const happy = props.overAll.map(obj => obj.happyper);
  const unhappy = props.overAll.map(obj => obj.unhappyper);
  // console.log(per)
  // if(props.overAll != undefined){
  // var d =props.overAll[0].happyper
  // var happy = d.happyper
  // }
  // console.log(d)
  const state = {
    labels: ['Happy %', 'Need Improvement %'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#9a55ff',
          '#ff4d7c'
        
        ],
        // hoverBackgroundColor: [
        // '#9a55ff',
        // '#fe7096'
        // ],
        data: [happy,unhappy]
      }
    ]
  }
      return (
        <div>
          <Pie
            data={state}
            options={{
              title:{
                display:true,
                fontSize:20
              },
              legend:{
                display:true,
                position:'top'
              }
            }}
          />
          </div>
          );
        }
export default PieChart;