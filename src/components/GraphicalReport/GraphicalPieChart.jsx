import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "react-google-charts";

const GraphicalChart = (props) => {
  const data = [
    [props.lbl1, props.lbl2],
    [props.lbl1, props.data1],
    [props.lbl2, props.data2],
  ];
  const options = {
    is3D: true,
    colors: [props.bg1, props.bg2],
    title: {
      display: true,
      text: "Rainfall",
      fontSize: 20,
    },
    legend: {
      position: "bottom",
    },
  };
  // const state = {
  //     labels: [props.lbl1, props.lbl2],
  //     datasets: [
  //       {
  //         label: 'Rainfall',
  //         backgroundColor: [
  //           props.bg1,
  //           props.bg2

  //         ],

  //         data: [props.data1,props.data2]
  //       }
  //     ]
  //   }
  let width = "100%";
  let height = "400px";
  if (window.innerWidth <= 768) { // Adjust based on your specific breakpoint
    width = "100%"; // Set width for smaller screens
    height = "600px"; // Set height for smaller screens
  }

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={width}
        height={height}
      />
      {/* <Pie
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
          /> */}
    </div>
  );
};
export default GraphicalChart;
