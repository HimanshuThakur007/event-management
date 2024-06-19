import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Input } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { SiMicrosoftexcel } from "react-icons/si";
import SubmitButton from "../CustomComp/SubmitButton";
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput, { convertDate } from "../CustomComp/DateTimeInput";
import useFetch from "../Hooks/useFetch";
import ReviewComp from "./ReviewComp";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { Excel } from "antd-table-saveas-excel";
import InputSearch from "../CustomComp/InputSearch";

const PendingReview = () => {
  let api = useFetch();
  const DataType = [
    { value: 1, label: "Event" },
    { value: 2, label: "Template" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 45,
    }),
  };

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
  const [loading, setLoading] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [siteList, setSiteList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
      className: "checkbox-red",
    }),
  };

  //   React.useEffect(() => {
  //     // Set totals on initial render
  //     const newData = [...tableData];
  //     for (let index = 0; index < tableData.length; index++) {
  //     //   setTotal(newData, index);
  //     }
  //     setTableData(newData);
  //   }, []);

  const whatsAppSendHandler = async (e) => {
    e.preventDefault();
    var currData = [];
    selectedRows.forEach((item) => {
      // console.log(item,'iiiii45')
      currData.push({
        CustomerName: item.name,
        MobNo: item.mobNo,
        Msg: item.msg,
        ID: item.id,
      });
    });

    const urlCustomer = "/api/SendWhatsapp1";

    var body = {
      SendCustwhatsappDetails: [...currData],
    };
    console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        console.log("maindata", got);
        // console.log("rrrr$", res);
        if (got.sentStatus == true) {
          showToastMessage("Message Sent SucessFully");
          getTableDataList();
        } else {
          showToastError("Something Went Wrong");
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  const onInputChange = (key, index) => (e) => {
    console.log(index, "indtable");
    const newData = [...tableDataList];
    newData[index][key] = e.target.value;
    setTableDataList(newData);
  };
  const onConfirm = () => {
    console.log("tableData", tableDataList);
  };
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "custName",
      render: (text, record) => <>{text}</>,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.custName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobNo).toLowerCase().includes(value.toLowerCase())
        );
      },

      sorter: (a, b) => a.custName.length - b.custName.length,
    },
    {
      title: "Mobile No",
      dataIndex: "mobNo",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "Site Name",
      dataIndex: "site",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.site.length - b.site.length,
    },
    {
      title: "Template Name",
      dataIndex: "name",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Average Rating",
      dataIndex: "avgRating",
      render: (text, record) => (
        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {text.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "dtDate",
      render: (text, record) => <span>{text}</span>,
      sorter: (a, b) => a.dtDate.length - b.dtDate.length,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      width: "30%",
      render: (text, record) => <span>{text}</span>,
      sorter: (a, b) => a.remark.length - b.remark.length,
    },

    {
      title: "Message",
      dataIndex: "msg",
      width: "40%",
      render: (text, record, index) => {
        let ind = (page - 1) * 10 + index;
        // console.log('msdggg', record.msg)
        return (
          <Input.TextArea
            size="small"
            value={text}
            onChange={onInputChange("msg", ind)}
          />
        );
      },
    },
  ];

  // ===================Event-List========================
  const getEventList = async () => {
    let currData = [];
    let addobj = { label: "All", value: 0 };
    currData[0] = addobj;
    let eventUrl = `/api/LoadEventDetails?Code=0&WI=0&Ucode=${userId}`;;
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

  const getTableDataList = async () => {
    setTempCode(0);
    setEventCode(0);
    setTableDataList([]);
    let eventUrl = `/api/CustomerReviewReport?Code=${
      tempCode || enevtCode || 0
    }&Type=${
      typeCode || 2
    }&Site=${siteCode}&SDate=${sdate}&EDate=${edate}&Rating=3.5&User=${userId}`;
    console.log("url", eventUrl);
    try {
      setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;

        console.log("tableData", got);
        setTableDataList(list);

        // setTemplateList(currData);
        setLoading(false);
        if (got.status == 0) {
          showToastMessage(got.msg);
        }
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

  // ====================export to excel============================
  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns.filter((column) => column.key !== "action"))
      .addDataSource(
        tableDataList.map(({ key, action, ...rest }) => rest),
        {
          str2Percent: true,
        }
      )
      .saveAs("PendingReview.xlsx");
  };

  let iconStyles = { color: "#10793F", cursor: "pointer" };
  return (
    <div className="page-wrapper">
      <ReactToast />
      <Helmet>
        <title>Report - Event&Management</title>
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
              All Pending Review
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">All Pending Review</li>
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
                      value={
                        selectedValues.select1 || {
                          label: "Template",
                          Value: 2,
                        }
                      }
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
                    <InputSelect
                      labelClass=""
                      selectName={typeCode == 1 ? "Event" : "Template"}
                      selectClass="col-lg-12"
                      placeholder="event"
                      value={
                        typeCode == 1
                          ? selectedValues.select2 || { label: "All", value: 0 }
                          : selectedValues.select3 || { label: "All", value: 0 }
                      }
                      onChange={
                        typeCode == 1
                          ? (selectedOption) =>
                              handleSelectChange(
                                selectedOption,
                                "select2",
                                setSelectedValues
                              )
                          : (selectedOption) =>
                              handleSelectChange(
                                selectedOption,
                                "select3",
                                setSelectedValues
                              )
                      }
                      options={typeCode == 1 ? eventList : templateList}
                      styles={customStyles}
                    />
                    {/* {typeCode == 1 ? (
                      <InputSelect
                        labelClass=""
                        selectName="Event"
                        selectClass="col-lg-12"
                        placeholder="event"
                        value={typeCode == 1?
                          selectedValues.select2 || { label: "All", value: 0 }:
                          selectedValues.select3 || { label: "All", value: 0 }
                        }
                        onChange={
                          typeCode == 1?
                          (selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select2",
                            setSelectedValues
                          ):(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "select3",
                            setSelectedValues
                          )
                        }
                        options={typeCode == 1?eventList:templateList}
                        styles={customStyles}
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
                        options={templateList}
                        styles={customStyles}
                      />
                    )} */}
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
                      {typeCode == 1
                        ? "Event Pending Review"
                        : "Template Pending Review"}
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
                {/* SiMicrosoftexcel */}
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
                      onChange(current) {
                        setPage(current);
                      },
                      total: tableDataList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    columns={columns}
                    dataSource={tableDataList}
                    rowKey={(index) => index}
                  />
                </div>
                <div className="col-xl-12 mb-2">
                  <SubmitButton
                    parentClass="text-end"
                    btnName="Send Message"
                    onClick={whatsAppSendHandler}
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

export default PendingReview;
