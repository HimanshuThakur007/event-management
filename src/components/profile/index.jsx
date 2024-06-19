import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { avatar02, avatar16 } from "../imagepath";
import useFetch from "../Hooks/useFetch";
import { Base64ImageConverter } from "../event/Base64ImageConverter";
import { showToastError } from "../CustomComp/ReactToast";
import * as TfiIcons from "react-icons/tfi";
import "./style.css";
import InputField from "../CustomComp/InputField";
import ReactLoader from "../CustomComp/ReactLoader";
var userCreateMaster;

const Profile = () => {
  const [image64, setImage64] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var userId = JSON.parse(userData).UserId;
  }
  let api = useFetch();
  const getModifyHandler = async () => {
    let modifyUrl = `/api/LoadUserMasterDetails?Code=${userId}`;
    console.log(modifyUrl, "ooooppppp");
    try {
      setLoading(true)
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        userCreateMaster = listData.userMasterDetails[0];
        // let d = convertToIST(userCreateMaster[0].dob);

        let userDep = listData.userDepartment;
        if (listData.userImgs.length !== 0) {
          let imageObj = listData.userImgs[0];
          var finalImg = imageObj.img;
          // console.log('iiiiiiiiiiiiiiii',finalImg)
        } else {
          finalImg = "";
        }

        setImage64(finalImg);

        setLoading(false)
      } else {
        showToastError("Something Went Wrong in List loading");
        setLoading(false);
      }
    } catch (err) {
      showToastError(err);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getModifyHandler();
  }, []);

  console.log("userCreateMaster:-", userCreateMaster);
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Profile - S&S Enterprises</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {loading ? (
          <ReactLoader loaderClass="position-absolute" loading={loading} />
        ) : null}
      <div className="content container-fluid">
        <div className="crms-title row bg-white">
          <div className="col  p-0">
            <h3 className="page-title m-0">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="feather-user" />
              </span>{" "}
              Employee Profile{" "}
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Employee Profile</li>
            </ul>
          </div>
        </div>
        <div className="page-header pt-3 mb-0">
          <div className="card profile__main" style={{height:"auto",minHeight:'65vh'}}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 d-flex">
                  <div className="col-4 profile__card d-flex justify-content-center">
                    <div className="card_profile mt-2">
                      <div className="card__img">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                          <rect fill="#ffffff" width="540" height="450"></rect>
                          <defs>
                            <linearGradient
                              id="a"
                              gradientUnits="userSpaceOnUse"
                              x1="0"
                              x2="0"
                              y1="0"
                              y2="100%"
                              gradientTransform="rotate(222,648,379)"
                            >
                              <stop offset="0" stop-color="#ffffff"></stop>
                              <stop offset="1" stop-color="#FC726E"></stop>
                            </linearGradient>
                            <pattern
                              patternUnits="userSpaceOnUse"
                              id="b"
                              width="300"
                              height="250"
                              x="0"
                              y="0"
                              viewBox="0 0 1080 900"
                            >
                              <g fill-opacity="0.5">
                                <polygon
                                  fill="#444"
                                  points="90 150 0 300 180 300"
                                ></polygon>
                                <polygon points="90 150 180 0 0 0"></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="270 150 360 0 180 0"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="450 150 360 300 540 300"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="450 150 540 0 360 0"
                                ></polygon>
                                <polygon points="630 150 540 300 720 300"></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="630 150 720 0 540 0"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="810 150 720 300 900 300"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="810 150 900 0 720 0"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="990 150 900 300 1080 300"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="990 150 1080 0 900 0"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="90 450 0 600 180 600"
                                ></polygon>
                                <polygon points="90 450 180 300 0 300"></polygon>
                                <polygon
                                  fill="#666"
                                  points="270 450 180 600 360 600"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="270 450 360 300 180 300"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="450 450 360 600 540 600"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="450 450 540 300 360 300"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="630 450 540 600 720 600"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="630 450 720 300 540 300"
                                ></polygon>
                                <polygon points="810 450 720 600 900 600"></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="810 450 900 300 720 300"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="990 450 900 600 1080 600"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="990 450 1080 300 900 300"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="90 750 0 900 180 900"
                                ></polygon>
                                <polygon points="270 750 180 900 360 900"></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="270 750 360 600 180 600"
                                ></polygon>
                                <polygon points="450 750 540 600 360 600"></polygon>
                                <polygon points="630 750 540 900 720 900"></polygon>
                                <polygon
                                  fill="#444"
                                  points="630 750 720 600 540 600"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="810 750 720 900 900 900"
                                ></polygon>
                                <polygon
                                  fill="#666"
                                  points="810 750 900 600 720 600"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="990 750 900 900 1080 900"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="180 0 90 150 270 150"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="360 0 270 150 450 150"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="540 0 450 150 630 150"
                                ></polygon>
                                <polygon points="900 0 810 150 990 150"></polygon>
                                <polygon
                                  fill="#222"
                                  points="0 300 -90 450 90 450"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="0 300 90 150 -90 150"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="180 300 90 450 270 450"
                                ></polygon>
                                <polygon
                                  fill="#666"
                                  points="180 300 270 150 90 150"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="360 300 270 450 450 450"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="360 300 450 150 270 150"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="540 300 450 450 630 450"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="540 300 630 150 450 150"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="720 300 630 450 810 450"
                                ></polygon>
                                <polygon
                                  fill="#666"
                                  points="720 300 810 150 630 150"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="900 300 810 450 990 450"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="900 300 990 150 810 150"
                                ></polygon>
                                <polygon points="0 600 -90 750 90 750"></polygon>
                                <polygon
                                  fill="#666"
                                  points="0 600 90 450 -90 450"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="180 600 90 750 270 750"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="180 600 270 450 90 450"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="360 600 270 750 450 750"
                                ></polygon>
                                <polygon
                                  fill="#999"
                                  points="360 600 450 450 270 450"
                                ></polygon>
                                <polygon
                                  fill="#666"
                                  points="540 600 630 450 450 450"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="720 600 630 750 810 750"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="900 600 810 750 990 750"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="900 600 990 450 810 450"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="0 900 90 750 -90 750"
                                ></polygon>
                                <polygon
                                  fill="#444"
                                  points="180 900 270 750 90 750"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="360 900 450 750 270 750"
                                ></polygon>
                                <polygon
                                  fill="#AAA"
                                  points="540 900 630 750 450 750"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="720 900 810 750 630 750"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="900 900 990 750 810 750"
                                ></polygon>
                                <polygon
                                  fill="#222"
                                  points="1080 300 990 450 1170 450"
                                ></polygon>
                                <polygon
                                  fill="#FFF"
                                  points="1080 300 1170 150 990 150"
                                ></polygon>
                                <polygon points="1080 600 990 750 1170 750"></polygon>
                                <polygon
                                  fill="#666"
                                  points="1080 600 1170 450 990 450"
                                ></polygon>
                                <polygon
                                  fill="#DDD"
                                  points="1080 900 1170 750 990 750"
                                ></polygon>
                              </g>
                            </pattern>
                          </defs>
                          <rect
                            x="0"
                            y="0"
                            fill="url(#a)"
                            width="100%"
                            height="100%"
                          ></rect>
                          <rect
                            x="0"
                            y="0"
                            fill="url(#b)"
                            width="100%"
                            height="100%"
                          ></rect>
                        </svg>
                      </div>
                      <div className="card__avatar">
                        <Base64ImageConverter
                          style={{
                            objectFit: "contain",
                            height: "100px",
                            width: "100px",
                            borderRadius: "50%",
                          }}
                          base64String={image64}
                        />
                        {/* <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" fill="#ff8475" r="60"></circle><circle cx="64" cy="64" fill="#f85565" opacity=".4" r="48"></circle><path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="#7f3838"></path><path d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" fill="#393c54" opacity=".4"></path><circle cx="89" cy="65" fill="#fbc0aa" r="7"></circle><path d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" fill="#4bc190"></path><path d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z" fill="#356cb6" opacity=".3"></path><path d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z" fill="#356cb6" opacity=".3"></path><path d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" fill="#fff"></path><path d="m64 88.75v9.75" fill="none" stroke="#fbc0aa" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"></path><circle cx="39" cy="65" fill="#fbc0aa" r="7"></circle><path d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" fill="#ffd8c9"></path><path d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" fill="#bc5b57"></path><path d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5" style="fill:none;stroke-linecap:round;stroke:#fff;stroke-miterlimit:10;stroke-width:2;opacity:.1"></path><path d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3" style="fill:none;stroke-linecap:round;stroke:#fff;stroke-miterlimit:10;stroke-width:2;opacity:.1"></path><circle cx="76" cy="62.28" fill="#515570" r="3"></circle><circle cx="52" cy="62.28" fill="#515570" r="3"></circle><ellipse cx="50.42" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse><ellipse cx="77.58" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m64 67v4" stroke="#fbc0aa" stroke-width="4"></path><path d="m55 56h-9.25" opacity=".2" stroke="#515570" stroke-width="2"></path><path d="m82 56h-9.25" opacity=".2" stroke="#515570" stroke-width="2"></path></g><path d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z" fill="#f85565" opacity=".4"></path><path d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" fill="#f85565"></path></svg> */}
                      </div>
                      <div className="card__title">
                        {userCreateMaster && userCreateMaster != undefined
                          ? userCreateMaster.name
                          : ""}
                      </div>
                      <div className="card__subtitle">
                        {userCreateMaster && userCreateMaster != undefined
                          ? userCreateMaster.mobNo
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-12 d-flex">
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Name
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.name
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Mobile No
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.mobNo
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-flex">
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Email
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.email
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              DOB
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.dob
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-flex">
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Site
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.siteName
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Department
                            </label>
                            <div className="col-lg-12">
                              <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.departmentName
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="col-xl-12">
                          <div className="form-group row">
                            <label className="col-lg-12 col-form-label">
                              Address
                            </label>
                            <div className="col-lg-12">
                              <textarea
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                // onChange={props.onChange}
                                value={
                                  userCreateMaster &&
                                  userCreateMaster != undefined
                                    ? userCreateMaster.address
                                    : ""
                                }
                                style={{background:"fixed"}}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
