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
        "rgb(41, 156, 219)",
        // 'rgb(54, 162, 235)',
        'rgb(240, 101, 72)',
        "rgb(247, 184, 75)"
        // 'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  

const DoughnutChart =()=> {
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
export default DoughnutChart;