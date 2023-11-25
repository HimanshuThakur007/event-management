import React from "react";
import {Bar} from 'react-chartjs-2';




const BarChart =(props)=> {
  // let data = props.unHappy
  const data = props.Happy.map(obj => obj.happyper);
  const per = props.Happy.map(obj => obj.sitename);
  console.log(data,'unhappy')
  const state = {
    labels: data,
    datasets: [
      {
        label: 'Total Income',
        backgroundColor: '#9a55ff',
        borderWidth: 1,
        data: per
      },
      // {
      //   label: 'Total Outcome',
      //   backgroundColor: '#da8cff',
      //   borderWidth: 1,
      //   data: [90, 65, 40, 65, 40, 65, 90]
      // }
    ]
    }
      return (
        <div>
           <Bar
              data={state}
              options={{
                responsive: true,
                legend: {
                    display: false,
                },
              }}
            />
          </div>
          );
        }
export default BarChart;