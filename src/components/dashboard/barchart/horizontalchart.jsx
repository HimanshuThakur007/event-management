import React from "react";
import {HorizontalBar} from 'react-chartjs-2';




const HorizontalBarChart =(props)=> {
  const data = props.Happy.map(obj => obj.happyper);
  const per = props.Happy.map(obj => obj.sitename)
  const state = {
    labels: data,
    datasets: [
      {
        backgroundColor: [
          '#fe7096',
          '#9a55ff',
          '#3cba9f',
          '#e8c3b9',
          '#9a55ff'
        ],
        borderWidth: 2,
        label : 'sree',
        data: per
      }
    ]
  }
      return (
        <div>
           <HorizontalBar
              data={state}          
              options={{
                legend:{
                  display:false,
                }
              }}
            />
          </div>
          );
        }
export default HorizontalBarChart;          