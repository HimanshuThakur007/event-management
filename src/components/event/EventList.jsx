import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Input, Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { useHistory } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Excel } from "antd-table-saveas-excel";
import { SiMicrosoftexcel } from "react-icons/si";
import InputSearch from "../CustomComp/InputSearch";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
    className: "checkbox-red",
  }),
};

const EventList = () => {
  let api = useFetch();

  let history = useHistory();
  const [eventList, setEventList] = React.useState([]);

  const navigateHandle = () => {
    history.push("/event-add");
  };
  const onRowClick = (record) => {
    // console.log(record)
    history.push({
      pathname: "/event-add",
      state: { code: record.code },
    });
  };

  const getEventList = async () => {
    let eventUrl = `/api/LoadEventDetails?Code=0`;
    try {
      // setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        setEventList(list);
        // console.log('llllist43', list)
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  React.useEffect(() => {
    getEventList();
  }, []);
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // const handleExportClick = () => {
  //   const excel = new Excel();

  //   // Create an Excel sheet and add columns first
  //   excel
  //     .addSheet('test')
  //     .addColumns(columns.filter((column) => column.key !== 'action'))
  //     .addDataSource(
  //       eventList.map(({ key, action, ...rest }) => rest),
  //       {
  //         str2Percent: true,
  //       }
  //     )
  //     .saveAs('Event.xlsx');
  // };

  const [searchText, setSearchText] = React.useState("");

  const columns = [
    // {
    //   title: "ID No",
    //   dataIndex: "code",
    //   render: (text, record) => (
    //     <>{text}</>
    //   ),
    //   sorter: (a, b) => a.id.length - b.id.length
    // },
    {
      title: "Event Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
    },
    {
      title: "Event Details",
      dataIndex: "det",
      render: (text, record) => (
        <span style={{ color: "orange", text: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Time",
      dataIndex: "eTime",
      render: (text, record) => <>{text}</>,
    },
    {
      title: "Date",
      dataIndex: "eDate",
      render: (text, record) => <>{text}</>,
      // sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Location",
      dataIndex: "eAdd",
      render: (text, record) => <span style={{ color: "red" }}>{text}</span>,
      // sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="dropdown dropdown-action">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => onRowClick(record)}>
              Edit
            </a>
            <a className="dropdown-item" href="#">
              Delete
            </a>
          </div>
        </div>
      ),
      // sorter: (a, b) => a.action.length - b.action.length,
    },
  ];

  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns.filter((column) => column.key !== "action"))
      .addDataSource(
        eventList.map(({ key, action, ...rest }) => rest),
        {
          str2Percent: true,
        }
      )
      .saveAs("Event.xlsx");
  };
  let iconStyles = { color: "#10793F", cursor: "pointer" };

  const [visibleColumns, setVisibleColumns] = React.useState(
    columns.map((column) => column.dataIndex)
  );
  const columnTitleMapping = {
    name: "Event Name",
    det: "Event Details",
    eTime: "Time",
    eDate: "Date",
    eAdd: "Location",
  };

  const filteredData = eventList.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => visibleColumns.includes(key))
    )
  );

  // const handleExportClick = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   XLSX.writeFile(workbook, 'ExportedData.xlsx');
  // };

  // const handleExportClick = () => {
  //   // Create custom titles for the header row
  //   const customHeader = columns
  //     .filter((column) => visibleColumns.includes(column.dataIndex))
  //     .map((column) => columnTitleMapping[column.dataIndex]);

  //   const worksheet = XLSX.utils.json_to_sheet(filteredData, {
  //     header: customHeader,
  //   });

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   XLSX.writeFile(workbook, 'ExportedData.xlsx');
  // };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Event - Event&Management</title>
        <meta name="description" content="Event Page" />
      </Helmet>
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="crms-title row bg-white">
          <div className="col  p-0">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fa fa-object-group" aria-hidden="true" />
              </span>{" "}
              Events List{" "}
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Event</li>
            </ul>
          </div>
        </div>

        <div className="page-header pt-3 mb-3 ">
          <div className="row">
            <div className="col text-end">
              {/* <ul className="list-inline-item pl-0">
                                <li className="list-inline-item"> */}
              <button
                onClick={navigateHandle}
                className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded"
              >
                Create Event
              </button>
              {/* </li>
                            </ul> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-0">
              <div className="card-header">
                <div className="col-xl-12 d-flex justify-content-between">
                  <h4 className="card-title mb-0">Event List</h4>
                  <span
                    onClick={eventList.length > 0 ? handleExportClick : null}
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
                  <div className="">
                  <InputSearch search1={setSearchText} search2={setSearchText}/>
                  </div>
                  <Table
                    className="table"
                    rowSelection={rowSelection}
                    // className="table"
                    style={{ overflowX: "auto" }}
                    pagination={{
                      total: eventList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    columns={columns}
                    dataSource={eventList}
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

export default EventList;
