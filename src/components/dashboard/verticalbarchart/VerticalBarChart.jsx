import React from 'react';
import { Bar } from 'react-chartjs-2';

const VerticalBarChart = (props) => {
//     const datas = props.unHappy.map(obj => obj.sitename);
//   const per = props.unHappy.map(obj => obj.unhappyper);
  // Sample data (percentages)
  const data = {
    labels: props.vlabels,
    datasets: [
      {
        label: 'Percentage',
        data: props.data, // Replace with your percentage values
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        min: 0, // Set minimum value on the x-axis
        max: 100, // Set maximum value on the x-axis
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
      },
      y: {
        min: 0, // Set minimum value on the y-axis
        max: 100, // Set maximum value on the y-axis
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = data.labels[context.dataIndex];
            const value = data.datasets[0].data[context.dataIndex] + '%';
            return `${label}: ${value}`;
          },
        },
      },
    },
  };


  return (
    // <div style={{ height: '400px', width: '600px' }}>
      <Bar data={data} options={options} />
    // </div>
  );
};

export default VerticalBarChart;
