import React from 'react';
import { Chart } from 'react-google-charts';

const ComparisonPieChart = ({ data }) => {
  // Find data for the "Comprision" site
  const comparisonData = data.find(item => item.site === "Comprision");

  // If no data found, return a message
  if (!comparisonData || !comparisonData.dateWiserating) {
    return <div>No data available for Comprision</div>;
  }

  // Extracting dates and ratings from dateWiserating
  const chartData = [['Date', 'Rating'], ...comparisonData.dateWiserating.map(entry => [entry.dtDate, entry.rating])];
  const sumOfAvg = comparisonData.sumOfAvg || 0;

  return (
    <>
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Rating Distribution for Comprision',
          is3D: true,
          // tooltip: { isHtml: true, trigger: 'selection' }, 
          // tooltip: { isHtml: true},
          pieSliceText: 'value' 
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <p className="card-title d-flex justify-content-center" style={{fontSize:'medium'}}>Total Days Average Rating {sumOfAvg}</p>
    </>
  );
};

export default ComparisonPieChart;
