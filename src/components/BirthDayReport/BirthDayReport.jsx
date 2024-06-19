import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SubmitButton from "../CustomComp/SubmitButton";
import DateTimeInput, {
  convertDate,
} from "../CustomComp/DateTimeInput";
import useFetch from "../Hooks/useFetch";
import ReactToast, {
  showToastError,
  showToastMessage,
} from "../CustomComp/ReactToast";
import ReactLoader from "../CustomComp/ReactLoader";
import { SiMicrosoftexcel } from "react-icons/si";
import InputSearch from "../CustomComp/InputSearch";
import { Excel } from "antd-table-saveas-excel";

const BirthDayReport = () => {
  const mergeValue = new Set();

  React.useEffect(() => {
    mergeValue.clear();
  }, []);
  let api = useFetch();

  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date(),
  });
  let sdate = convertDate(dates.date1);
  let edate = convertDate(dates.date2);
  const [tableDataList, setTableDataList] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
 
  const getTableDataList = async () => {
    let eventUrl = `/api/CustomerBirthdayReport?SDate=${sdate}&EDate=${edate}`;
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
  React.useEffect(() => {
    getTableDataList();
  }, [dates.date1, dates.date2]);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
      className: "checkbox-red",
    }),
  };

  //   ================whatsApp Send===========================================
  const whatsAppSendHandler = async (e) => {
    e.preventDefault();
    var currData = [];
    selectedRows.forEach((item) => {
      currData.push({ CustomerName: item.name, MobNo: item.mobno, Rate: 0 });
    });
    const urlCustomer = "/api/SendWhatsapp";
    var body = {
      WhatsappType: 2,
      SendWhatsappList: [...currData],
    };
    // console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        console.log("maindata", got);
        // console.log("rrrr$", res);
        showToastMessage(got.errorMsg);
        getTableDataList()
        setSelectedRows([])
        setLoading(false);
      } else {
        setLoading(false);
        showToastError(got.errorMsg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobno).toLowerCase().includes(value.toLowerCase())||
          String(record.eMail).toLowerCase().includes(value.toLowerCase())||
          String(record.site).toLowerCase().includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Mobile",
      dataIndex: "mobno",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Email",
      dataIndex: "eMail",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Site",
      dataIndex: "site",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Delivered Status",
      dataIndex: "status",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
    },
  ];

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
      .saveAs("Event.xlsx");
  };
  let iconStyles = { color: "#10793F", cursor: "pointer" };
  return (
    <div className="page-wrapper">
      <ReactToast />
      <Helmet>
        <title>Customer BDay - EventManagement</title>
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
              Customer Birthday Report
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Customer Birthday</li>
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
                  <div className="col-xl-5">
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
                  <div className="col-xl-5">
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
              {/* <div className="card-header">
                <h4 className="card-title mb-0">Customer BirthDay Data</h4>
              </div> */}
              <div className="card-header">
                <div className="col-xl-12 d-flex justify-content-between">
                  <h4 className="card-title d-flex mb-0">
                    <span className="mt-1">Customer Birthday Data</span>
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
                <div className="table-responsive">
                  <Table
                    className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    rowSelection={rowSelection}
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
                    rowKey={(record,index) => index}
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

export default BirthDayReport;
