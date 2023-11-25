import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';


const data = {
    labels: [
      'This Week',
      'This Month',
      'This Year'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        // 'rgb(255, 99, 132)',
        "rgb(32,178,170)",
        // 'rgb(54, 162, 235)',
        "rgb(64, 81, 137)",
        // 'rgb(255, 205, 86)'
        "rgb(184,134,11)"
      ],
      hoverOffset: 4
    }]
  };
  

const DoughnutChart1 =()=> {
      return (
        <div>
          <Doughnut
            data={data}
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
export default DoughnutChart1;