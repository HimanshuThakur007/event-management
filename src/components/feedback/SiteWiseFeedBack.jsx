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
// import ReviewComp from "./ReviewComp";
import ReactToast from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { Excel } from "antd-table-saveas-excel";
import InputSearch from "../CustomComp/InputSearch";

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   getCheckboxProps: record => ({
//     disabled: record.name === "Disabled User", // Column configuration not to be checked
//     name: record.name,
//     className: "checkbox-red"
//   })
// };

const SiteWiseFeedBack = () => {
  let iconStyles = { color: "#10793F", cursor:'pointer'};
  let api = useFetch();
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
 
  const [searchText, setSearchText] = React.useState("");

  const DataType = [
    { value: 1, label: "Event" },
    { value: 2, label: "Template" },
  ];
  var headerArr = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Customer",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.mobNo).toLowerCase().includes(value.toLowerCase())||
        String(record.name).toLowerCase().includes(value.toLowerCase())
      },
      render: (text, record) => <span className="text-primary">{text}</span>,
    },
    {
      title: "Mobile",
      dataIndex: "mobNo",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Added On",
      dataIndex: "date",
      render: (text, record) => <span className="text-success">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "site",
      sorter: (a, b) => a.site.length - b.site.length,
    },
    {
      title: "Type",
      dataIndex: "template",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
    },

    {
      title: "Comments",
      dataIndex: "remark",
      render: (text, record) => <span style={{ color: "black" }}>{text}</span>,
    },
    { title: "Average Rating", dataIndex: "avgrating", align: "center",  render: (text, record) => <span >{text.toFixed(1)}</span>, },
    { title: "Resolved SMS", dataIndex: "msg" },
  ];
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
    select3: null,
    select4: null,
  });
  const [typeCode, setTypeCode] = React.useState(0);
  const [tempCode, setTempCode] = React.useState(0);
  const [enevtCode, setEventCode] = React.useState(0);
  const [siteCode, setSiteCode] = React.useState(0);
  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date(),
  });
  let sdate = convertDate(dates.date1);
  let edate = convertDate(dates.date2);
  const [siteList, setSiteList] = React.useState([]);
  const [templateList, setTemplateList] = React.useState([]);
  const [eventList, setEventList] = React.useState([]);
  const [tableDataList, setTableDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  
  // ===================Event-List========================
  const getEventList = async () => {
    let currData = [];
    let addobj = {label:"All", value:0}
    currData[0]=addobj
    let eventUrl = `/api/LoadEventDetails?Code=0`;
    try {
      setLoading(true);
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
  // ===================Template-List========================
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
  const [columns, setColumns] = React.useState([]);
  const getTableDataList = async () => {
    // let eventUrl = `/api/ETQuesList?Code=1&Type=1`;
    let eventUrl = `/api/ETQuesList?Code=${
      tempCode || enevtCode || 0
    }&Type=${typeCode}&Site=${siteCode}`;

    console.log("url question", eventUrl);
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        list.forEach((items, ind) => {
          // headerArr.push({title:items.question, dataIndex : `q${ind + 1}`})
          headerArr.splice(7, 0, {
            title: items.question,
            dataIndex: `q${ind + 1}`,
            align: "center",
            render: (text, render) => (
              <span className="" style={{color:"blue"}}>{text}</span>
            ),
          });
        });
        setColumns(headerArr);

        console.log("tableData", headerArr);

        await getMainTableDataList();

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

  const getMainTableDataList = async () => {
    // let eventUrl = `/api/SiteWiseFeedBack?Code=1&Type=1&dt1=2023-01-01&dt2=2023-12-01`;
    let eventUrl = `/api/SiteWiseFeedBack?Code=${
      tempCode || enevtCode || 0
    }&Type=${typeCode}&Site=${siteCode}&dt1=${sdate}&dt2=${edate}`;
    console.log("url", eventUrl);
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let details = got.data;
        console.log("details", details);
        setTableDataList(details);

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
    getSiteList();
    getEventList();
    getTemplateList();
  }, []);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

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

  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableDataList, {
        str2Percent: true
      })
      .saveAs("FeedBack.xlsx");
  };


  return (
    <div className="page-wrapper">
      <ReactToast />
      <Helmet>
        <title>FeedBack- Event&Management</title>
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
              </span>
              Site Wise FeedBack
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">FeedBack</li>
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
                      />
                    )}
                  </div>
                  <div className="col-xl-2">
                    <InputSelect
                      labelClass=""
                      selectName="Site"
                      selectClass="col-lg-12"
                      placeholder="Site"
                      value={selectedValues.select4 ||{label:"All", value:0}}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select4",
                          setSelectedValues
                        )
                      }
                      options={siteList}
                      // styles={customStyles}
                    />
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
                  {/* <div className="col-xl-3">
                      
                    </div> */}
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
                  {typeCode == 1 ? "Event Contacts" : "Template Contacts"}
                </h4>
                <span onClick={handleExportClick}><SiMicrosoftexcel size={25} style={iconStyles}/></span>
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
                    // rowSelection={rowSelection}
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
                    rowKey={(record) => record.qCode}
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

export default SiteWiseFeedBack;
