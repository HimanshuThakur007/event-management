import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { MdOutlinePublish } from 'react-icons/md'
import { SiMicrosoftexcel } from 'react-icons/si'
import { avatar11, avatar10 } from "../imagepath"
import SubmitButton from '../CustomComp/SubmitButton'
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput, { convert, convertDate } from "../CustomComp/DateTimeInput";
import useFetch from "../Hooks/useFetch";
// import ReviewComp from "./ReviewComp";
import ReactToast from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { Excel } from "antd-table-saveas-excel";
import InputSearch from "../CustomComp/InputSearch";


const Contacts = () => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
      className: "checkbox-red"
    })
  };
  let api=useFetch();
   var date = new Date(),
    mnth = ("0" + date.getMonth()).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  let updatedData = [date.getFullYear(), mnth, day].join("/");
    const [dates, setDates] = React.useState({
    date1: new Date(updatedData),
    date2: new Date()
  });

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
    
};
  const [typeCode ,setTypeCode] = React.useState(0)
  const [searchText, setSearchText] = React.useState("");
  const [tableDataList, setTableDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  
 
  let iconStyles = { color: "#10793F", cursor:'pointer'};
   
 
  // ===================Event-List========================
  let fdate = convertDate(dates.date1);
  let tdate = convertDate(dates.date2);

  const getTableDataList = async () => {
 
    let eventUrl = `/api/EventCustomerList?FDate=${fdate}&EDate=${tdate}`;
    console.log("url", eventUrl)
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        console.log("tableData", list);
        setTableDataList(list);
        // tableData = list

        // setTemplateList(currData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  React.useEffect(()=>{
    getTableDataList()
  },[fdate,tdate])

  
  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableDataList, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };


// ======================Random Color Gnerate==============================
 
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // ====================columns Name for Data==================================

  const columns = [
   
    {
      title: "Name" ,
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase())||
         String(record.mobNo).toLowerCase().includes(value.toLowerCase())||
         String(record.email).toLowerCase().includes(value.toLowerCase())
      },
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>{text}</span>
      ),
      sorter: (a, b) => a.name.length - b.name.length
    },
  
   
    {
      title: "Mobile",
      dataIndex: "mobNo",
      render: (text, record) => (
        <span className="" style={{color:"orange"}}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (
        <>{text}</>
      ),
    },
    {
      title: "Site",
      dataIndex: "site",
      render: (text, record) => (
        <>{text}</>
      ),
    },
  
  ];



  return (
    <div className="page-wrapper">
       <ReactToast/>
      <Helmet>
        <title>Contacts- EventManagement</title>
        <meta name="description" content="Review page" />
      </Helmet>
      <div className="content container-fluid">
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
        {/* Page Header */}
        <div className="crms-title row bg-white mb-0">
          <div className="col p-0">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fa fa-object-group" aria-hidden="true" />
              </span>Contacts
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
              <li className="breadcrumb-item active">Contacts</li>
            </ul>
          </div>
        </div>
        {/* Page Header Second */}
        {/* <ReviewComp/> */}
         {/* /-------------Page Header with inputField-----*/}
         <div className="row pt-4">
            <div className="col-md-12">
              <div className="card">
            
                <div className="card-body">
                  <div className="row pt-2">
                 
                    <div className="col-xl-6">
                    <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="Start Date"
                        // datestar="*"
                        dateFormat="dd/MM/yyyy"
                        selected={dates.date1}
                        onChange={(date) =>
                          handleDateChange("date1", date)
                        }
                      />
                    </div>
                    <div className="col-xl-6">
                    
                    <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="End Date"
                        // datestar="*"
                        dateFormat="dd/MM/yyyy"
                        selected={dates.date2}
                        onChange={(date) =>
                          handleDateChange("date2", date)
                        }
                      />
                    </div>
                    {/* <div
                    className="col-xl-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="mt-4">
                      <SubmitButton
                        parentClass="text-center"
                        onClick={getTableDataList}
                        btnName="Load Data"
                      />
                    </div>
                  </div> */}
                  </div>
               
                </div>
              </div>
            </div>
          </div>
         
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-0">
            <div className="card-header">
            <div className="col-xl-12 d-flex justify-content-between">
                <h4 className="card-title d-flex mb-0">
                  <span className="mt-1">

                  Contacts
                  </span>
                  <span className="ml-2">
                  <InputSearch search1={setSearchText} search2={setSearchText}/>
                  </span>
                  </h4>
                <span onClick={handleExportClick}><SiMicrosoftexcel size={25} style={iconStyles}/></span>
                </div>
              </div>
              <div className="card-body">
                {/* <div className="col-xl-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleExportClick}>Export</button>
              </div> */}
                <div className="table-responsive">
               
                  <Table className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    rowSelection={rowSelection}
                    // className="table"
                    style={{ overflowX: "auto" }}
                    pagination={{
                      total: tableDataList.length,
                      showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                    }}
                    columns={columns}
                    dataSource={tableDataList}
                    rowKey={(record) => record.code}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Contacts;
