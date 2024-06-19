import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GraphicalChart from "./GraphicalPieChart";
import GraphCard from "./GraphCard";
import SubmitButton from "../CustomComp/SubmitButton";
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput from "../CustomComp/DateTimeInput";
import ReactLoader from "../CustomComp/ReactLoader";
import { Margin, usePDF } from "react-to-pdf";
import {BsFiletypePdf,BsFileEarmarkPdfFill} from 'react-icons/bs'
import GraphNav from "./GraphNav";
import PieChart from './CpmparisonChart'
import DateWisePieChart from "./DateWisePieChart";
// import {BsFileEarmarkPdfFill} from 'react-icons/bs'


const ComparisonGraph = (props) => {
  const { toPDF, targetRef } = usePDF({
    filename: "comparisongraphicalReport.pdf",
    page: { margin: Margin.MEDIUM }
  });
  const customStyles = {
    control: (base) => ({
      ...base,
      // height: 45,
      minHeight: 45,
    }),
  };
  let iconStyles = { color: "red", cursor:'pointer'};
 
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>GraphicalReport- Event&Management</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}

      <div className="content container-fluid">
        <div className="crms-title row bg-white mb-4">
          <div className="col">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fas fa-table"></i>
              </span>{" "}
              <span>Comparison Graphical Report</span>
            </h3>
          </div>
          <div className="col text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Graphical Report</li>
            </ul>
          </div>
        </div>
        {/* <GraphNav /> */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row pt-2">
                  <div className="col-xl-3">
                    <InputSelect
                      labelClass=""
                      selectName="Site"
                      selectClass="col-lg-12"
                      placeholder="Site"
                      isMulti
                      value={props.selectedValues.select1}
                      onChange={(selectedOption) =>
                        props.handleSelectChange(
                          selectedOption,
                          "select1",
                          props.setSelectedValues
                        )
                      }
                      options={props.siteList}
                      styles={customStyles}
                    />
                  </div>

                  <div className="col-xl-3">
                    <InputSelect
                      labelClass=""
                      selectName="Template"
                      selectClass="col-lg-12"
                      placeholder="Template"
                      value={
                        props.selectedValues.select2 || {
                          label: "All",
                          value: 0,
                        }
                      }
                      onChange={(selectedOption) =>
                        props.handleSelectChange(
                          selectedOption,
                          "select2",
                          props.setSelectedValues
                        )
                      }
                      options={props.templateList}
                      styles={customStyles}
                    />
                  </div>

                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="From"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={props.dates.date1}
                      onChange={(date) => props.handleDateChange("date1", date)}
                    />
                  </div>
                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="To"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={props.dates.date2}
                      onChange={(date) => props.handleDateChange("date2", date)}
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
                        onClick={props.ComparisonGraficReport}
                        btnName="Load Data"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.comparisonGraph.length > 0 ?(
        <div className="col-12 d-flex justify-content-end">
        <span onClick={toPDF}><BsFileEarmarkPdfFill size={30} style={iconStyles}/></span>
        </div>):''}
        <div ref={targetRef}>
          <div className="row graphs mt-3">
            <div className="col-md-12">
              <div className="card h-100">
                <div className="card-body">
                <h5 className="card-title d-flex justify-content-center">Comparison Report</h5>
                <p className="card-title d-flex justify-content-center" style={{fontSize:'medium'}}>
        {`${props.sdate} to ${props.edate}`}
      </p>
                  <PieChart data={props.comparisonGraph} />
                </div>
              </div>
            </div>
          </div>

          <div className="row graphs mt-2">
            <div className="col-md-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="col-12 d-flex flex-wrap">
                    {props.comparisonGraph.map((item,index) => {
                      if (item.site === "Comprision") {
                        return null;
                    }
                      return (
                        <div className="col-lg-6 col-12 mb-4" key={index}>
                          <DateWisePieChart
                            key={item.site}
                            site={item.site}
                            dateWiserating={item.dateWiserating}
                            avg={item.sumOfAvg}
                          />
                          <hr/>
                        </div>
                      );
                    })}
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

export default ComparisonGraph;
