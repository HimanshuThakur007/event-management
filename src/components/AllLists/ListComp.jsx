import React, { useState, useEffect } from "react";
import ListPage from "./ListPage";
import useFetch from "../Hooks/useFetch";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "antd";
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from "react-icons/fi";

const ListComp = () => {
  var api = useFetch();
  const routeParams = useParams();
  // console.log(routeParams,':--------')
  var history = useHistory();
  const [listData, setListData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getuserCreationList = async () => {
    let modifyUrl = `/api/LoadUserMasterList?ProjType=2`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("dataUserCreation", got.data);
        let list = got.data;

        setListData(list);
        setRowData(columnss);
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
  // -------------------department---------------------------
  // -------------------------userDepartementList--------------------------------
  const getDepartmentList = async () => {
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(department);
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

  // -------------------customerList------------------

  const getList = async () => {
    setLoading(true);
    let listUrl = `/api/LoadCustomerMasterList`;
    try {
      let { res, got } = await api(listUrl, "GET", "");
      if (res.status == 200) {
        // console.log('dataCustomer',got.data)
        let list = got.data;

        setListData(list);
        setRowData(columnCustomerList);
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

  // ------------------purpose---------------------

  const getPurposeList = async () => {
    let Url = `/api/LoadMasterData?MasterType=6`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(Purpose);
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

  // -------------------------Site-------------------------

  const getSiteList = async () => {
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=100`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(Site);
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
  // --------------reviewQue----------------------------------
  const getReviewList = async () => {
    let corrData = [];
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=101`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((element) => {
          corrData.push({
            name: element.name,
            c1: element.c1Name,
            code: element.code,
          });
        });
        setListData(corrData);
        setRowData(review);
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
  // --------------MasterGroup mt-102----------------------------------
  const getMasterGroupList = async () => {
    let Url = `/api/LoadMasterDetails1?code=0&MasterType=102`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(mastergrp);
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

  // -------------------------Event-Type-------------------------

  const getEventTypeList = async () => {
    let Url = `/api/LoadMasterData?MasterType=18`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(EvtType);
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

  // -------------------------Event-Status-------------------------

  const getEventStatusList = async () => {
    let Url = `/api/LoadMasterData?MasterType=19`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(EvtStatus);
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

  // ------------------UserTypoe---------------------

  const getUserTypeList = async () => {
    let Url = `/api/LoadMasterData?MasterType=17`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;

        setListData(list);
        setRowData(usertype);
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

  const Site = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "s1",
      sorter: (a, b) => a.s1.length - b.s1.length,
    },
    {
      title: "Contact Person",
      dataIndex: "s4",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.s4.length - b.s4.length,
    },
    {
      title: "Address",
      dataIndex: "s2",
      sorter: (a, b) => a.s2.length - b.s2.length,
    },
    {
      title: "Mobile",
      dataIndex: "s3",
      sorter: (a, b) => a.s3.length - b.s3.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];

  // --------------event-type-List-------------------------
  const EvtType = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];
  // --------------event-Status-List-------------------------
  const EvtStatus = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];
  // --------------MasterGroup-List-------------------------
  const mastergrp = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];

  // --------------purposeList-------------------------
  const Purpose = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];
  // --------------ReviewQueList-------------------------
  const review = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Questions",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Type",
      dataIndex: "c1",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.c1.length - b.c1.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];

  // --------------userTypeList-------------------------
  const usertype = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];

  const columnCustomerList = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: "Mobile No.",
      dataIndex: "mobNo",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Architect MobileNo",
      dataIndex: "archMobNo",
      sorter: (a, b) => a.archMobNo.length - b.archMobNo.length,
    },
    {
      title: "GST No",
      dataIndex: "gstNo",
      sorter: (a, b) => a.gstNo.length - b.gstNo.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 100,
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];

  //  -------------------create userList rowdata-------------------------------
  const columnss = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobNo).toLowerCase().includes(value.toLowerCase())
        );
      },
      // sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <>
          <a href="#" className="avatar">
            <img alt="" src={record.img} />
          </a>
          <a>{text}</a>
        </>
      ),
    },
    // {
    //   title: 'Password',
    //   dataIndex: 'pwd',
    //   sorter: (a, b) => a.pwd.length - b.pwd.length,
    // },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "MobileNo",
      dataIndex: "mobNo",
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "WhatsApp",
      dataIndex: "wNo",
      sorter: (a, b) => a.wNo.length - b.wNo.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },

    {
      title: "Department",
      dataIndex: "departmentName",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
    },
    {
      title: "Site",
      dataIndex: "siteName",
      // render: (text, record) => (
      //   <span className="badge" style={{ background: getRandomColor() }}>{text}</span>
      // ),
      sorter: (a, b) => a.siteName.length - b.siteName.length,
    },
    {
      title: "Type",
      dataIndex: "utName",
      sorter: (a, b) => a.utName.length - b.utName.length,
    },
    {
      title: "Active",
      dataIndex: "activeName",
      sorter: (a, b) => a.activeName.length - b.activeName.length,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      sorter: (a, b) => a.dob.length - b.dob.length,
    },
    // {
    //   title: "Image",
    //   dataIndex: "imagePath",
    //   // render:  (r) => <img src={`${r.imagePath}`} />
    //   render: (text, record) => {
    //     return (
    //      <div>
    //      <img src={record.imagePath}  style={{ width: "100%" }}/></div>)}
    //   // sorter: (a, b) => a.imagePath.length - b.imagePath.length,
    // },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 100,
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
    // {
    //   title: "Actions",
    //   dataIndex: "status",
    //   render: (text, record) => (
    //     <div className="dropdown dropdown-action">
    //       <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <a className="dropdown-item" onClick={()=>onRowClick(record)}>Edit</a>
    //         <a className="dropdown-item" onClick={()=>handleDelete(record.code)}>Delete</a>

    //       </div>
    //     </div>
    //   ),

    // },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Button onClick={() => onRowClick(record)}>Edit</Button>
    //   ),

    // },
  ];

  //  -------------------create DepartmentList rowdata-------------------------------
  const department = [
    {
      title: "SrNo",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.monNo).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a>
            <span
              className="person-circle-a person-circle"
              style={{ background: getRandomColor() }}
            >
              {text.charAt(0)}
            </span>
          </a>
          <a>{text} </a>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    // {
    //   title: 'UserName',
    //   dataIndex: 'username',
    //   sorter: (a, b) => a.username.length - b.username.length,
    // },
    {
      title: "Mobile No",
      dataIndex: "monNo",
      sorter: (a, b) => a.monNo.length - b.monNo.length,
    },
    {
      title: "Company Code",
      dataIndex: "compCode",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),

      sorter: (a, b) => a.compCode.length - b.compCode.length,
    },
    // {
    //   title: 'Segment',
    //   dataIndex: 'segment',
    //   sorter: (a, b) => a.compCode.length - b.compCode.length,
    // },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Edit
          </a>
          <a className="me-1 btn btn-sm bg-danger-light">
            <FiTrash2 className="feather-trash-2 me-1" /> Delete
          </a>
        </div>
      ),
    },
  ];
  const onRowClick = (record) => {
    // console.log('recored', record)
    switch (routeParams.id) {
      case "4":
        history.push({
          pathname: "/add_user",
          state: { code: record.code },
        });
        break;
      case "3":
        history.push({
          pathname: "/site_creation",
          state: { code: record.code },
        });
        break;
      case "2":
        history.push({ pathname: "/department", state: { code: record.code } });
        break;
      case "5":
        history.push({
          pathname: "/customer_master",
          state: { code: record.code },
        });
        break;
      case "6":
        history.push({ pathname: "/purpose", state: { code: record.code } });
        break;
      case "1":
        history.push({ pathname: "/user_type", state: { code: record.code } });
        break;
      case "8":
        history.push({ pathname: "/event_type", state: { code: record.code } });
        break;
      case "9":
        history.push({
          pathname: "/event_status",
          state: { code: record.code },
        });
        break;
      case "10":
        history.push({ pathname: "/review_que", state: { code: record.code } });
        break;
      case "11":
        history.push({ pathname: "/master_grp", state: { code: record.code } });
        break;

      default:
    }
  };

  useEffect(() => {
    switch (routeParams.id) {
      case "4":
        getuserCreationList();
        break;
      case "2":
        getDepartmentList();
        break;
      case "3":
        getSiteList();
        break;
      case "5":
        getList();
        break;
      case "6":
        getPurposeList();
        break;
      case "1":
        getUserTypeList();
        break;
      case "8":
        getEventTypeList();
        break;
      case "9":
        getEventStatusList();
        break;
      case "10":
        getReviewList();
        break;
      case "11":
        getMasterGroupList();
        break;
      default:
    }
  }, [routeParams.id, searchText]);

  return (
    <>
      <ListPage
        loading={loading}
        columns={rowData}
        data={listData}
        HelmetTitle={`${
          routeParams.id == 1
            ? "UserType List-Event&Management"
            : routeParams.id == 2
            ? "Department List-Event&Management"
            : routeParams.id == 3
            ? "Site List-Event&Management"
            : routeParams.id == 4
            ? "User List-Event&Management"
            : routeParams.id == 5
            ? "Customer List-Event&Management"
            : routeParams.id == 6
            ? "Purpose List-Event&Management"
            : routeParams.id == 8
            ? "Event Type List-Event&Management"
            : routeParams.id == 9
            ? "Event Status list-Event&Management"
            : routeParams.id == 10
            ? "Question Review List-Event&Management"
            : routeParams.id == 11
            ? "Master Group List-Event&Management"
            : "List-Event&Management"
        }`}
        subHeader={`${
          routeParams.id == 1
            ? "UserType List"
            : routeParams.id == 2
            ? "Department List"
            : routeParams.id == 3
            ? "Site List"
            : routeParams.id == 4
            ? "User List"
            : routeParams.id == 5
            ? "Customer List"
            : routeParams.id == 6
            ? "Purpose List"
            : routeParams.id == 8
            ? "Event Type List"
            : routeParams.id == 9
            ? "Event Status list"
            : routeParams.id == 10
            ? "Question Review List"
            : routeParams.id == 11
            ? "Master Group List"
            : "List"
        }`}
        disableHeader="List"
        defaultHead="List DataTable"
        rowKey="code"
        onRowClick={onRowClick}
        routeParams={routeParams}
        setSearchText={setSearchText}
      />
    </>
  );
};

export default ListComp;
