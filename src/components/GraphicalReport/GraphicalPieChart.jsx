import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';

const GraphicalChart =(props)=> {
    const state = {
        labels: [props.lbl1, props.lbl2],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              props.bg1,
              props.bg2
            
            ],
            // hoverBackgroundColor: [
            // '#9a55ff',
            // '#fe7096'
            // ],
            data: [props.data1,props.data2]
          }
        ]
      }
    // const state = {
    //     labels: ['Past', 'Upcoming'],
    //     datasets: [
    //       {
    //         label: 'Rainfall',
    //         backgroundColor: [
    //           '#9a55ff',
    //           '#ff4d7c'
            
    //         ],
    //         // hoverBackgroundColor: [
    //         // '#9a55ff',
    //         // '#fe7096'
    //         // ],
    //         data: [2478,5267]
    //       }
    //     ]
    //   }
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
                position:'bottom'
              }
            }}
          />
          </div>
          );
        }
export default GraphicalChart;