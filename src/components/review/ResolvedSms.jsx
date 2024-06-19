import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { SiMicrosoftexcel } from "react-icons/si";
import SubmitButton from "../CustomComp/SubmitButton";
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput, {
  convertDate,
} from "../CustomComp/DateTimeInput";
import useFetch from "../Hooks/useFetch";
import ReviewComp from "./ReviewComp";
import ReactToast, { showToastMessage } from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { Excel } from "antd-table-saveas-excel";
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

const ResolvedSms = () => {
  let api = useFetch();
  const DataType = [
    { value: 1, label: "Event" },
    { value: 2, label: "Template" },
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
  const [templateList, setTemplateList] = React.useState([]);
  const [eventList, setEventList] = React.useState([]);
  const [tableDataList, setTableDataList] = React.useState([]);
  const [siteList, setSiteList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId
  } 

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 45,
    }),
  };
  // ===================Event-List========================
  const getEventList = async () => {
    let currData = [];
    let addobj = { label: "All", value: 0 };
    currData[0] = addobj;
    let eventUrl = `/api/LoadEventDetails?Code=0&WI=0&Ucode=${userId}`;
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
  // ===================Event-List========================
  const getTemplateList = async () => {
    let currData = [];
    let addobj = { label: "All", value: 0 };
    currData[0] = addobj;
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

  // ========================SiteList==========================
  const getSiteList = async () => {
    let corrData = [];
    let addobj = { label: "All", value: 0 };
    corrData[0] = addobj;
    let Url = `/api/LoadReportingSites?User=${userId}`;
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

  const getTableDataList = async () => {
    setTempCode(0);
    setEventCode(0);
    setTableDataList([]);
    let eventUrl = `/api/WhatsappMsgReport?Code=${
      tempCode || enevtCode || 0
    }&Type=${typeCode}&Site=${siteCode}&SDate=${sdate}&EDate=${edate}&User=${userId}`;
    // console.log("url", eventUrl)
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        if(list.length == 0){
          showToastMessage('No Record Found')
        }
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

  React.useEffect(() => {
    getEventList();
    getTemplateList();
    getSiteList();
  }, []);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  // ----------------------multiple-Select-----------------------
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);

    // }
    if (selectName === "select1") {
      setTypeCode(selectedOption.value);
    } else if (selectName === "select2") {
      setEventCode(selectedOption.value);
    } else if (selectName === "select3") {
      setTempCode(selectedOption.value);
    } else if (selectName === "select4") {
      setSiteCode(selectedOption.value);
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // ====================columns Name for Data==================================

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "custName",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.custName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobNo).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => <span className="text-primary">{text}</span>,
      sorter: (a, b) => a.custName.length - b.custName.length,
    },
    {
        title: "Mobile",
        dataIndex: "mobNo",
        render: (text, record) => <>{text}</>,
      },
    {
        title: "Feedback Date",
        dataIndex: "feedbackDate",
        render: (text, record) => <>{text}</>,
      },
    {
      title: "Average Rating",
      dataIndex: "avgRating",
      render: (text, record) => <span className="text-primary">{text}</span>,
      sorter: (a, b) => a.custName.length - b.custName.length,
    },
    {
      title: `${typeCode == 1 ? "Event" : "Template"}`,
      dataIndex: "name",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },

   
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <>{text}</>,
    },

    {
      title: "Resolved Message",
      dataIndex: "msg",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Message Sent Date",
      dataIndex: "msgSentDate",
      render: (text, record) => <>{text}</>,
    },
  ];
  let iconStyles = { color: "#10793F", cursor: "pointer" };
  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableDataList, {
        str2Percent: true,
      })
      .saveAs("ContactReview.xlsx");
  };

  return (
    <div className="page-wrapper">
      <ReactToast />
      <Helmet>
        <title>Review- Event&Management</title>
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
              Resolved Sms
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Resolved Sms</li>
            </ul>
          </div>
        </div>
        {/* Page Header Second */}
        {/* <ReviewComp /> */}
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
                      styles={customStyles}
                      options={DataType}
                    />
                  </div>
                  <div className="col-xl-2">
                    <InputSelect
                      labelClass=""
                      selectName="Site"
                      selectClass="col-lg-12"
                      placeholder="Site List"
                      value={
                        selectedValues.select4 || { label: "All", value: 0 }
                      }
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
                        value={
                          selectedValues.select2 || { label: "All", value: 0 }
                        }
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select2",
                            setSelectedValues
                          )
                        }
                        styles={customStyles}
                        options={eventList}
                      />
                    ) : (
                      <InputSelect
                        labelClass=""
                        selectName="Template"
                        selectClass="col-lg-12"
                        placeholder="Template"
                        value={
                          selectedValues.select3 || { label: "All", value: 0 }
                        }
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select3",
                            setSelectedValues
                          )
                        }
                        styles={customStyles}
                        options={templateList}
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
                  <h4 className="card-title d-flex mb-0">
                    <span className="mt-1">
                      {typeCode == 1 ? "Event Contacts" : "Template Contacts"}
                    </span>
                    <span className="ml-5">
                      <InputSearch
                        search1={setSearchText}
                        search2={setSearchText}
                      />
                    </span>
                  </h4>
                  <span
                    onClick={
                      tableDataList.length > 0 ? handleExportClick : null
                    }
                  >
                    <SiMicrosoftexcel size={25} style={iconStyles} />
                  </span>
                </div>
              </div>
              <div className="card-body">
                {/* <div className="col-xl-12 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleExportClick}>Export</button>
                  </div> */}
                <div className="table-responsive">
                  {/* <InputSearch search1={setSearchText} search2={setSearchText}/> */}
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

export default ResolvedSms;
