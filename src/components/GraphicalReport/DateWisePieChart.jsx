import React from 'react';
import { Chart } from 'react-google-charts';

const DateWisePieChart = ({ site, dateWiserating,avg }) => {
  // Construct chart data with all dates from dateWiserating
  const chartData = [['Date', 'Rating'], ...dateWiserating.map(entry => [entry.dtDate, entry.rating || 0])];

  // Check if any ratings are zero
  const zeroRatings = dateWiserating.filter(entry => entry.rating === 0);


  return (
    <div>
      <h5 className="card-title d-flex justify-content-center" style={{textDecoration:'underline'}}>Site: {site}</h5>
      {/* {zeroRatings.length > 0 &&
        <div className="alert alert-warning" role="alert">
          {zeroRatings.map((entry, index) => (
            <p key={index}>On {entry.dtDate}, rating is 0.</p>
          ))}
        </div>
      } */}
      {/* {zeroRatings.length !== dateWiserating.length &&  */}
        <Chart
          width={'100%'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: 'Date Wise Ratings',
            is3D: true,
            pieSliceText: 'value'
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      {/* } */}
      <p className="card-title d-flex justify-content-center" style={{fontSize:'medium'}}>Total Days Average Rating {avg}</p>
    </div>
  );
};

export default DateWisePieChart;
