import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { MdOutlinePublish } from "react-icons/md";
import { SiMicrosoftexcel } from 'react-icons/si'
import { avatar11, avatar10 } from "../imagepath";
import SubmitButton from "../CustomComp/SubmitButton";
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput, {
  convert,
  convertDate,
} from "../CustomComp/DateTimeInput";
import useFetch from "../Hooks/useFetch";
import ReviewComp from "./ReviewComp";
import ReactToast from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { Excel } from 'antd-table-saveas-excel';
import InputSearch from "../CustomComp/InputSearch";

const rowSelection = {
  
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
    className: "checkbox-red",
  }),
};

const Reviews = () => {
  let iconStyles = { color: "#10793F", cursor:'pointer'};
  const mergeValue = new Set();

  React.useEffect(() => {
    mergeValue.clear();
  }, []);

  let api = useFetch();
  const DataType = [
    { value: 1, label: "Event" },
    { value: 2, label: "Template" },
  ];
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
    select3: null,
    select4: null
  });
  const [typeCode, setTypeCode] = React.useState(0);
  const [tempCode, setTempCode] = React.useState(0);
  const [enevtCode, setEventCode] = React.useState(0);
  const [siteCode ,setSiteCode] = React.useState(0)
  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date(),
  });
  let sdate = convertDate(dates.date1);
  let edate = convertDate(dates.date2);
  const [templateList, setTemplateList] = React.useState([]);
  const [eventList, setEventList] = React.useState([]);
  const [tableDataList, setTableDataList] = React.useState([]);
  const [siteList, setSiteList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const customStyles = {
    control: base => ({
      ...base,
      height: 45,
      minHeight: 45
    })
  };
  // ===================Event-List========================
  const getEventList = async () => {
    let currData = [];
    let addobj = {label:"All", value:0}
    currData[0]=addobj
    let eventUrl = `/api/LoadEventDetails?Code=0`;
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        // console.log("llllist3", list);
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setEventList(currData);
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
  // ===================Event-List========================
  const getTemplateList = async () => {
    let currData = [];
    let addobj = {label:"All", value:0}
    currData[0]=addobj
    let eventUrl = `/api/LoadTemplateDetails?Code=0`;
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        // console.log("llllist3", list);
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setTemplateList(currData);
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

  const getTableDataList = async () => {
    setTempCode(0);
    setEventCode(0);
    setTableDataList([]);
    let eventUrl = `/api/ReportsQuesWise?Code=${
      tempCode || enevtCode || 0
    }&Type=${typeCode}&Site=${siteCode}&SDate=${sdate}&EDate=${edate}`;
    // console.log("url", eventUrl)
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        console.log("tableData", list);
        setTableDataList(list);

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

// ========================SiteList==========================
const getSiteList = async () => {
  let corrData = [];
  let addobj = {label:"All", value:0}
  corrData[0]=addobj
  let Url = `/api/LoadMasterDetails1?code=0&MasterType=100`;
  try {
    setLoading(true);
    let { res, got } = await api(Url, "GET", "");
    if (res.status == 200) {
      // console.log("depdata", got.data);
      let list = got.data;

      list.forEach((element) => {
        corrData.push({ value: element.code, label: element.name });
      });
      setSiteList(corrData);
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


  React.useEffect(() => {
    getSiteList()
    getEventList();
    getTemplateList();
  }, []);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };
  const [searchText, setSearchText] = React.useState("");
  // -----multiple-Select-----------------------
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);

    {
      selectName == "select1"
        ? setTypeCode(selectedOption.value)
        : selectName == "select2"
        ? setEventCode(selectedOption.value)
        : selectName == "select3"
        ? setTempCode(selectedOption.value)
        : selectName == "select4"
        ? setSiteCode(selectedOption.value)
        : null;
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const columns = [
    {
      title: `${typeCode == 1 ? "Event Name" : "Template Name"}`,
      key: "name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.qName).toLowerCase().includes(value.toLowerCase())||
        String(record.name).toLowerCase().includes(value.toLowerCase())
      },
    },
    // {
    //   title: "Template Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <>{text}</>
    //   ),
    //   // width: '20%',
    //   // render: (text, record) => (
    //   //   <>
    //   //     <a className="avatar"><img alt="" src={record.image} /></a>
    //   //     <a href="#" data-bs-toggle="modal" data-bs-target="#event-customer">{text}</a>
    //   //   </>
    //   // ),
    //   sorter: (a, b) => a.name.length - b.name.length
    // },
    // {
    //   title: "Site Name",
    //   dataIndex: "site",
    //   render: (text, record) => (
    //     <>{text}</>
    //   ),
    // },
    {
      title: "Questions",
      dataIndex: "qName",
      render: (text, record) => <>{text}</>,
    },
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   render: (text, record) => (
    //     <>{text}</>
    //   ),
    // },
    {
      title: "One Stars",
      dataIndex: "rating_1",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Two Stars",
      dataIndex: "rating_2",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Three Stars",
      dataIndex: "rating_3",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Four Stars",
      dataIndex: "rating_4",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Five Stars",
      dataIndex: "rating_5",
      render: (text, record) => <>{text}</>,
    },

    {
      title: "Sucess Percentage",
      dataIndex: "sucPer",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Average Rating",
      dataIndex: "avgPercentage",
      render: (text, record) => <>{text}</>,
    },
  ];

  // ====================export to excel============================
  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet('test')
      .addColumns(columns.filter((column) => column.key !== 'action'))
      .addDataSource(
        tableDataList.map(({ key, action, ...rest }) => rest),
        {
          str2Percent: true,
        }
      )
      .saveAs('Event.xlsx');
  };
  return (
    <div className="page-wrapper">
      <ReactToast />
      <Helmet>
        <title>Customer Review - Event&Management</title>
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
              </span>{" "}
              Qusetion Wise Review
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Qusetion Wise Review</li>
            </ul>
          </div>
        </div>
        {/* Page Header Second */}
        <ReviewComp />
        {/* /-------------Page Header with inputField-----*/}

        <div className="row pt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row pt-2">
             
                  <div className="col-xl-2">
                    <InputSelect
                      labelClass=""
                      selectName="Type"
                      selectClass="col-lg-12"
                      placeholder="Event Type"
                      value={selectedValues.select1}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select1",
                          setSelectedValues
                        )
                      }
                      options={DataType}
                      styles={customStyles}
                    />
                  </div>
                  <div className="col-xl-2">
                    <InputSelect
                      labelClass=""
                      selectName="Site"
                      selectClass="col-lg-12"
                      placeholder="Site List"
                      value={selectedValues.select4||{label:"All", value:0}}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select4",
                          setSelectedValues
                        )
                      }
                      options={siteList}
                      styles={customStyles}
                    />
                  </div>
                  <div className="col-xl-2">
                    {typeCode == 1 ? (
                      <InputSelect
                        labelClass=""
                        selectName="Event"
                        selectClass="col-lg-12"
                        placeholder="event"
                        value={selectedValues.select2||{label:"All", value:0}}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select2",
                            setSelectedValues
                          )
                        }
                        options={eventList}
                        styles={customStyles}
                      />
                    ) : (
                      <InputSelect
                        labelClass=""
                        selectName="Template"
                        selectClass="col-lg-12"
                        placeholder="Template"
                        value={selectedValues.select3||{label:"All", value:0}}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select3",
                            setSelectedValues
                          )
                        }
                        options={templateList}
                        styles={customStyles}
                      />
                    )}
                  </div>
                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="Start Date"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={dates.date1}
                      onChange={(date) => handleDateChange("date1", date)}
                    />
                  </div>
                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="End Date"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={dates.date2}
                      onChange={(date) => handleDateChange("date2", date)}
                    />
                  </div>
                  <div
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
                  </div>
                </div>
                {/* <SubmitButton
                  parentClass="text-center"
                  onClick={getTableDataList}
                  btnName="Load Data"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-0">
              <div className="card-header">
              <div className="col-xl-12 d-flex justify-content-between">
                <h4 className="card-title mb-0">
                  {typeCode == 1
                    ? "Event Question Review Table"
                    : "Template Question Review Table"}
                </h4>
                <span onClick={tableDataList.length > 0 ? handleExportClick:null}><SiMicrosoftexcel size={25} style={iconStyles}/></span>
                </div>
              </div>
              <div className="card-body">
              {/* <div className="col-xl-12 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleExportClick}>Export</button>
                  </div> */}
                <div className="table-responsive">
                <InputSearch search1={setSearchText} search2={setSearchText}/>
                  <Table
                    className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    rowSelection={rowSelection}
                    // className="table"
                    style={{ overflowX: "auto" }}
                    pagination={{
                      total: tableDataList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    columns={columns}
                    dataSource={tableDataList}
                    rowKey={(record) => record.qName}
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

export default Reviews;
