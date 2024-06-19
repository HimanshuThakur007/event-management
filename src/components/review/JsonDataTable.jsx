import React,{useEffect} from 'react';
import { Table,Button  } from 'antd';
import { itemRender, onShowSizeChange } from "../paginationfunction";
import * as XLSX from 'xlsx';

const JsonDataTable = ({ jsonData, setColumns }) => {
  // If there is no data, return null
  if (jsonData.length === 0) {
    return null; // or return a placeholder message
  }

  // Parse JSON data
  const data = jsonData.map(item => ({
    site: item.site,
    ...item.dateWiserating.reduce((acc, curr) => {
      acc[curr.dtDate] = curr.rating;
      return acc;
    }, {}),
    sumOfAvg: item.sumOfAvg,
  }));

  // Extract all unique dates
  const dates = jsonData.reduce((acc, curr) => {
    curr.dateWiserating.forEach(dateObj => {
      if (!acc.includes(dateObj.dtDate)) {
        acc.push(dateObj.dtDate);
      }
    });
    return acc;
  }, []);

  // Columns configuration
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
    },
    ...jsonData.map(item => ({
      title: item.site,
      dataIndex: item.site,
      // Custom footer for each site column
      footer: () => sumOfAvgs[item.site], 
      render: (text, record) => {
        if (record.key === 'sumOfAvgs') {
          return <strong>{text}</strong>;
        }
        return text;
      },
    })),
  ];
 
//   useEffect(()=>{
//     setColumns(columns)
//   },[])


  // Transform data into table format
  const tableData = dates.map(date => {
    const rowData = {
      key: date,
      date,
    };

    jsonData.forEach(siteData => {
      rowData[siteData.site] = siteData.dateWiserating.find(d => d.dtDate === date)?.rating || 0;
    });

    return rowData;
  });

  // Calculate sumOfAvg for each site
  const sumOfAvgs = jsonData.reduce((acc, curr) => {
    acc[curr.site] = curr.sumOfAvg;
    return acc;
  }, {});

  // Add sumOfAvg for each site to the last row of the table
  const lastRow = {
    key: 'sumOfAvgs',
    date: <strong>Average Sum</strong>,
  };
  jsonData.forEach(siteData => {
    lastRow[siteData.site] = sumOfAvgs[siteData.site];
  });
  tableData.push(lastRow);

//   const handleExportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(tableData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "table_data.xlsx");
//   };

const handleExportToExcel = () => {
    // Remove the 'key' property from all rows except 'sumOfAvgs'
    const tableDataWithoutKeys = tableData.map(row => {
      const { key, ...rest } = row;
      return key === 'sumOfAvgs' ? { ...row } : rest;
    });
  
    // Convert tableData to Excel worksheet
    const ws = XLSX.utils.json_to_sheet(tableDataWithoutKeys);
  
    // Apply style to the header
    const headerStyle = {
      fill: { fgColor: { rgb: "00FF00" } }, // Green background color
      font: { bold: true }, // Bold font
    };
    const range = XLSX.utils.decode_range(ws['!ref']); // Decode the range of the worksheet
    for (let i = range.s.c; i <= range.e.c; ++i) {
      const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: i }); // Get cell address
      ws[headerCell].s = headerStyle; // Apply header style
    }
  
    // Create Excel workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Save workbook to file
    XLSX.writeFile(wb, "comprison_report.xlsx");
  };

  
  
  
  
  
  return (
    <>
    <Button onClick={handleExportToExcel} type="primary" style={{ marginBottom: '10px' }}>
    Export to Excel
  </Button>
    <Table
      className='table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer'
      columns={columns}
      dataSource={tableData}
      pagination={{
        total: tableData.length,
        showTotal: (total, range) =>
          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
        itemRender: itemRender,
      }}
      rowKey={(index) => index + 1}
    />
    </>
  );
};

export default JsonDataTable;
