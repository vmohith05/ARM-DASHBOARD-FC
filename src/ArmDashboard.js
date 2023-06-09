import { React, useEffect, useState, useRef } from "react";
import Axios from "axios";
import Spinner from "./Spinner";
import mainLogo from "./azureIcon.png";
import ModalPopUpBuilder from "./components/ModalPopUpBuilder";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import convertJsonToExcel from "./utils/JsonToExcel";
import jsonConverter from "./utils/DataToJson";
import "./arm.css";
import ArmForm from "./components/ArmForm";
import { Input, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import convertBytes from "./utils/memoryConverter";
import { Select } from "antd";
import osVersionList from "./utils/OsVersionList";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import TableBuiilder from "./components/TableBuilder";
import StackTable from "./components/stackTable";
import { Card, Col, Row } from "antd";
import RadioButtonBuilder from "./components/RadioButtonBuilder";
import d_report from "./components/Cloud_Discovery";
import Cloud_R from "./components/Costing";
import device_report from "./components/stackTable";
import Link from "antd/es/typography/Link";
import CustomModalForm from "./components/CustomModalForm";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DeviceTableBuilder from "./components/CIO_Dashboard";
import { Document, Page } from 'react-pdf';
import ReactPrint from "./components/ReactPrint";
import { useReactToPrint } from 'react-to-print';
import Cloud_Discovery_Report from "./components/CIO_CloudDiscovery";
import Migration_Report from "./components/Cloud_Migration";


const ArmDashboard = () => {
  const [assetList, setAssetList] = useState("");
  const [searchResult, setSearchResultData] = useState("");
  const [stackResult, setStackResult] = useState("");
  const [preetyData, setPrettyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const [stackID, setStackID] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [keyAttribute, setKeyAttribute] = useState([]);
  const [fieldVal, setFieldVal] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [nickName, setNickName] = useState("");
  const [networkSecurityGroupName, setNetworkSecurityGrpName] = useState("");
  const [storageAccountName, setStorageAccountName] = useState("");
  const [virtualNetworkName, setVirtualNetworkName] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);
  const [osVersion, setOsVersion] = useState([]);
  const [armformdata, setArmRightForm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showProgress, setShowProgress] = useState("none");
  const [sucessRate, setBarSucessRate] = useState(20);
  const [progressStatus, setProgressStatus] = useState("active");
  const [operatingSystemVersion, setOperatingSystemVersion] = useState("");
  const [btnEnable, setDownloadTemplateBtnEnabled] = useState(false);
  const [checkedValue, setRadioValue] = useState(1);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [isDisable, setDisable] = useState(true);
  const [iaasPrice, setIaaSprice] = useState([]);
  const [assetDetailWithPrice, setAssetDetailWithIaasPrice] = useState("");
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);
  const [providerOptionList, setProvidersList] = useState("");
  const [piec, setPiec] =useState("");
  const [Devices, setDevices] = useState("");
  const [cloud_r, setCloud_r] = useState("");
  const [Stack_device_report, setDeviceReport] = useState("");
  const [tagsData, setTagData] = useState("");
  const [summery, setSummery] = useState("");
  const [CloudReport, setCloudReport] = useState("");
  const [Device_Data, setDevice_Data] = useState("");
  const [MigrationReport, setMigrationReport] = useState("");


  const API_KEY = process.env.REACT_APP_API_KEY;

  const componentRef = useRef();
  const componentCloudRef = useRef();
  const componentStackRef = useRef();
  const componentMigrationRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCloudPrint = useReactToPrint({
    content: ()=> componentCloudRef.current
  })

  const handleStackPrint = useReactToPrint({
    content: ()=> componentStackRef.current
  })
  const handleMigrationPrint = useReactToPrint({
    content: ()=> componentMigrationRef.current
  })
 

  // const providerOptionList = [
  //   { value: "2", label: "Azure US Zone" },
  //   { value: "1", label: "Azure India Zone" },
  //   { value: "4", label: "Azure India Zone" },
  //   { value: "disabled", label: "Disabled", disabled: true },
  // ];

  /*inline styles */

  const centred = {
    height: "50px",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    zIndex: 10,
  };

  const getData = async () => {
    const response = await Axios.get(
      `${API_KEY}/getAssetDetails?deviceid=${deviceID}`
    );
    //setAccess(response.data[0]);
    const output = JSON.parse(response.data.body);
    const formatedData = JSON.stringify(output, null, "\t");
    //  console.log("flexera asset data fetch async call ====>",JSON.parse(formatedData))
    const parsedData = JSON.parse(formatedData);
    // console.log("strigify data", parsedData);
    // console.log("user access data: ",parsedData.assets[0]);
    setLoading(false);
    setAssetList(parsedData);
    const arrKey = [];
    assetList.assets &&
      Object.entries(assetList.assets[0].data).map((item) =>
        arrKey.push(item[0])
      );
    setKeyAttribute(arrKey);
    const arrVal = [];
    assetList.assets &&
      Object.entries(assetList.assets[0].data).map((item) =>
        arrVal.push(item[1])
      );
    setFieldVal(arrVal);
    //setOperatingSystemVersion(assetList.assets[0].data.os_version);
    // console.log("test json data before format====> ", jsonData)
    // const myJSON = {ans: 42};
    // const formatter = new JSONFormatter(assetList);
    // document.body.appendChild(formatter.render());
  };

  const getProvidersList = async ()=> {
    console.log(API_KEY);
    const response = await Axios.get(`${API_KEY}/providers`);
    setProvidersList(response.data.providers);
    //console.log(`list of providers ${JSON.stringify(response, null, " ")}`)
  }

  const getAssetDataByStack = async (selectedStackId) => {
    setLoading(true);
    const res = await Axios.get(
      `${API_KEY}/getAssetDetailsByStackId?stackid=${selectedStackId}`
    );

    const tagres = await Axios.get(
      `${API_KEY}/getTagsByStackId?stackid=${11820168430127}`
    );
    const tagoutput = JSON.parse(tagres.data.body);
    const tagFormatedData = JSON.stringify(tagoutput, null, "\t");
    const tagParsedData = JSON.parse(tagFormatedData);
    setTagData(tagParsedData.tags);

    //setAccess(response.data[0]);
    const output = JSON.parse(res.data.body);
    const formatedData = JSON.stringify(output, null, "\t");
    //  console.log("flexera asset data fetch async call ====>",JSON.parse(formatedData))
    const parsedData = JSON.parse(formatedData);
    // console.log("strigify data", parsedData);
    console.log("user access data for selected stack id select ===> &&&&&&: ", selectedProvider);

    // if(checkedValue === 2) {
      const filter = {
        filter_by: "stack",
        filter_ids: checkedValue === 1 ? [parseInt(selectedStackId)] : [parseInt(searchKey)],
        providerids:  [...selectedProvider],
      };
      setLoading(true);
      const response = await fetch(`${API_KEY}/getIaaSprice`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters: filter }),
      });
      const priceDetail = await response.json();
  
      setIaaSprice(priceDetail);
      // console.log("Inventroy pricing detail data: ", iaasPrice.inventroyList);
      // console.log("usage iaas pricing detail data: ", iaasPrice.usageList);
      const inventoryArr = priceDetail.inventroyList;
      const usageArr = priceDetail.usageList;
      // const inventoryArr = [];
      const allStackSearchResult =

        parsedData.assets &&

        parsedData.assets.map((ele, i) => ({

          ...ele,

          provider_name: (inventoryArr && inventoryArr[i].provider_name ? inventoryArr[i].provider_name : "N/A"),

          inventroy_cpu_hz: (inventoryArr && inventoryArr[i].cpu_hz ? inventoryArr[i].cpu_hz: "N/A"),

          usage_cpu_hz: (usageArr && usageArr[i].cpu_hz ? usageArr[i].cpu_hz : "N/A"),

          inventroy_instance_cost_hour: (inventoryArr && inventoryArr[i].instance_cost_hour ? inventoryArr[i].instance_cost_hour: "N/A"),

          usage_instance_cost_hour: (usageArr && usageArr[i].instance_cost_hour ? usageArr[i].instance_cost_hour: "N/A"),

          inventory_instance_name: (inventoryArr && inventoryArr[i].instance_name ? inventoryArr[i].instance_name: "N/A"),

          usage_instance_name: (usageArr && usageArr[i].instance_name ? usageArr[i].instance_name : "N/A"),

          inventory_instance_class: (inventoryArr && inventoryArr[i].instance_class ? inventoryArr[i].instance_class: "N/A"),

          usage_instance_class: (usageArr && usageArr[i].instance_class ? usageArr[i].instance_class: "N/A"),

          inventory_network_io_cost_hour: (inventoryArr && inventoryArr[i].network_io_cost_hour ? inventoryArr[i].network_io_cost_hour: "N/A"),

          usage_network_io_cost_hour: (usageArr && usageArr[i].network_io_cost_hour ? usageArr[i].network_io_cost_hour: "N/A"),

          inventory_storage_cost_hour: (inventoryArr && inventoryArr[i].storage_cost_hour ? inventoryArr[i].storage_cost_hour: "N/A"),

          usage_storage_cost_hour: (usageArr && usageArr[i].storage_cost_hour ? usageArr[i].storage_cost_hour: "N/A"),

          inventory_total_cost_hour: (inventoryArr && inventoryArr[i].total_cost_hour ? inventoryArr[i].total_cost_hour:"N/A"),

          usage_total_cost_hour: (usageArr && usageArr[i].total_cost_hour ? usageArr[i].total_cost_hour: "N/A"),

          inventory_instance_specialization : (inventoryArr && inventoryArr[i].instance_specialization ? inventoryArr[i].instance_specialization: "N/A"),

          usage_instance_specialization : (usageArr && usageArr[i].instance_specialization ? usageArr[i].instance_specialization: "N/A"),

          inventory_network_io_in_bytes_per_sec_avg : (inventoryArr && inventoryArr[i].network_io_in_bytes_per_sec_avg ? inventoryArr[i].network_io_in_bytes_per_sec_avg: "N/A"),

          usage_network_io_in_bytes_per_sec_avg : (usageArr && usageArr[i].network_io_in_bytes_per_sec_avg ? usageArr[i].network_io_in_bytes_per_sec_avg: "N/A"),

          inventory_network_io_out_bytes_per_sec_avg : (inventoryArr && inventoryArr[i].network_io_out_bytes_per_sec_avg ? inventoryArr[i].network_io_out_bytes_per_sec_avg: "N/A"),

          usage_network_io_out_bytes_per_sec_avg : (usageArr && usageArr[i].network_io_out_bytes_per_sec_avg ? usageArr[i].network_io_out_bytes_per_sec_avg: "N/A"),

          inventory_storage_bytes : (inventoryArr && inventoryArr[i].storage_bytes ? inventoryArr[i].storage_bytes: "N/A"),

          usage_storage_bytes : (usageArr && usageArr[i].storage_bytes ? usageArr[i].storage_bytes: "N/A"),

          inventory_storage_cost_hour : (inventoryArr && inventoryArr[i].storage_cost_hour ? inventoryArr[i].storage_cost_hour: "N/A"),

          usage_storage_cost_hour : (usageArr && usageArr[i].storage_cost_hour ? usageArr[i].storage_cost_hour: "N/A"),

          inventory_storage_io_cost_hour : (inventoryArr && inventoryArr[i].storage_io_cost_hour ? inventoryArr[i].storage_io_cost_hour: "N/A"),

          usage_storage_io_cost_hour : (usageArr && usageArr[i].storage_io_cost_hour ? usageArr[i].storage_io_cost_hour: "N/A"),

          inventory_storage_io_hour_avg : (inventoryArr && inventoryArr[i].storage_io_hour_avg ? inventoryArr[i].storage_io_hour_avg: "N/A"),

          usage_storage_io_hour_avg : (usageArr && usageArr[i].storage_io_hour_avg ? usageArr[i].storage_io_hour_avg: "N/A")
        }));
      // iaasPrice && iaasPrice.map((item, index)=> {
      //   inventoryArr.push(item[index].cpu_hz)
      // })
  
      console.log(
        `asset detail with price ${JSON.stringify(
          allStackSearchResult,
          null,
          " "
        )}`
      );
      setAssetDetailWithIaasPrice(allStackSearchResult);
      setLoading(false);
      // setSearchResultData(parsedData);
      // setSearchKey("");
    //}

    setLoading(false);
    setStackResult(parsedData);
  };


  const getAllAssetData = async () => {
    setLoading(true);
    const response = await Axios.get(
      `${API_KEY}/getAssetDetailBySerach?searchkey= ${searchKey}`
    );
    const res = await JSON.parse(response.data.body);
    const formatedData = JSON.stringify(res, null, "\t");
    const parsedData = JSON.parse(formatedData);
    console.log("all asset detail data: ", parsedData.assets);
    // getIaaSpricingByStackIdAndProviderId();
    setLoading(false);
    setSearchResultData(parsedData);
    setSearchKey("");
    setSelectedProvider("");
  };


  const handleGlobalSearch = async () => {
    setAssetDetailWithIaasPrice("");
    setLoading(true);
    checkedValue === 1 ? getAllAssetData() : getAssetDataByStack(searchKey);

  };



  const startCio= async()=>
  {
    const response = await Axios.get(
      `${API_KEY}/getSummeryByProviderId?providerId=${selectedProvider}`
    );
    const res = await JSON.parse(response.data.body);
    const formatedData = JSON.stringify(res, null, "\t");
    const parsedData = JSON.parse(formatedData);
    console.log("all asset detail data: ", parsedData.assets);
    if(!(assetDetailWithPrice === "")){
      setPiec(d_report(assetDetailWithPrice, tagsData, parsedData.assets, componentRef));
      setCloud_r(null);
      setDeviceReport(null);
      setMigrationReport(null);
    }
  }
  function startCosting()
  {
    if(!(assetDetailWithPrice === ""))
    {
      setCloud_r(Cloud_R(assetDetailWithPrice, tagsData, componentCloudRef));
      setPiec(null);
      setDeviceReport(null);
      setMigrationReport(null);
    }
  }
  function StartTable()
  {
    if(!(assetDetailWithPrice === ""))
    {
      setDeviceReport(device_report(assetDetailWithPrice, componentStackRef));
      setPiec(null);
      setCloud_r(null);
      setMigrationReport(null);
    }
  }
  function StartMigration()
  {
    if(!(assetDetailWithPrice === ""))
    {
      setMigrationReport(Migration_Report(assetDetailWithPrice, componentMigrationRef));
      setPiec(null);
      setCloud_r(null);
      setDeviceReport(null);
    }
  }
  const DeviceDetails = async() =>{
    const response = await fetch("http://localhost:3000/fetch");
    let d = await response.json().catch((e) => {
      console.warn("invalid json res : ", e);
      return null;
    });

    console.log(" d : ", d);
    // try{
    //   console.log(" type of res : ", typeof(response.data))
    // const res = await JSON.parse(response.data);
    // }
    // catch (error){
    //   console.log(error);
    // }
    //const formatedData = JSON.stringify(d, null, "\t");
    setDevice_Data(d);
    setDevices(DeviceTableBuilder(d));
  }

  const Cloud_Report = async() =>{
    const response = await fetch("http://localhost:3000/fetch");
    let d = await response.json().catch((e) => {
      console.warn("invalid json res : ", e);
      return null;
    });
    console.log(" d : ", d);
    setDevice_Data(d);
    setCloudReport(Cloud_Discovery_Report(d));
  }

  useEffect(() =>{
    if(assetDetailWithPrice)
    setDisable(false);
    console.log(assetDetailWithPrice);
  },[assetDetailWithPrice])

  const handleConverter = () => {
    // convertJsonToExcel(assetList.assets);
    setCount(count + 1);
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    jsonConverter(assetList.assets, `assetList${time}`);
    alert("report generated");
  };


  const handleStackCardClick = (stackCardId) => {
    console.log(`inside handle card click ====> ${stackCardId}`);
    getAssetDataByStack(stackCardId);
  };

  const handleGlobalChange = (event) => {
    setStackResult("");
    setSearchResultData("");
    setAssetDetailWithIaasPrice("");
    if(event.target.value) {
      getProvidersList();
    }
    console.log(`get provider list ${providerOptionList}`)
    setSearchKey(event.target.value);
    
  };

  const handleRadioChange = (e) => {
    setStackResult("");
    setAssetDetailWithIaasPrice("");
    setSearchResultData("");
    setSearchKey(""); // clear input field on radio btn toggle
    setSelectedProvider("");
    setIsBtnDisable(true);
    setRadioValue(e.target.value);
  };

  const handleProviderChange = (value) => {
    setSelectedProvider("");
    setSubmitBtnDisable(true);
    console.log(`provider selected  ${value}`);
    // if (searchKey && selectedProvider) {
    //   setSubmitBtnDisable(false);
    // }
    setSelectedProvider((prev)=>[...prev,...value])
  };

//   useEffect(()=> {
// getProvidersList()
//   },[])

  // dashboard lolading....
  return (
    <div className="main">
      <div className="dashboard">
        {/* <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            boxShadow: "2px -1px 4px 1px rgb(0 0 0 / 20%)",
            backgroundColor: "#f2f2f2",
          }}
        >
          <img
            style={{ width: "50px", height: "50px" }}
            src={mainLogo}
            alt="fireSpot"
          />
          <h3 style={{ color: "orange" }}>Optum Cloud Readiness</h3>
          <Button className="Device_details"
                  type="primary"
                  disabled={false}
                  onClick={DeviceDetails}
                  style={{ marginLeft: "5%", border: "2px solid #e9e9e9", width: "8rem", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px", backgroundColor:"#66b3ff"}}
              >CIO_Dashboard</Button>
          <Button className="CIO_Cloud_Discovery"
                  type="primary"
                  disabled={false}
                  onClick={Cloud_Report}
                  style={{ marginLeft: "2%", border: "2px solid #e9e9e9", width: "11rem", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px",backgroundColor:"#66b3ff" }}
              >CIO_Cloud_Discovery</Button>




        </div> */}
        <div style={centred}>
          <div
            className="progress-bar"
            style={{
              display: showProgress,
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <Progress
              type="circle"
              // width={90}
              percent={sucessRate}
              status={progressStatus}
            />
          </div>
        </div>

        <h4
          style={{
            //display: "flex",
            //justifyContent: "center",
            color: "#05b105",
          }}
        >
          {assetList.returnStatusDetail}
        </h4>
        <div
          //style={{ display: "flex", justifyContent: "space-evenly" }}
          className="main-header"
        >
          <div
            className="sub-heading"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <div>Enter HostName, IP, Application Name to get Asset List</div> */}
            <RadioButtonBuilder
              value={checkedValue}
              handleRadioChange={handleRadioChange}
            />
          </div>
          <div
            className="asset-type"
            style={{
              display: "flex",
              justifyContent: "center",
              // marginRight: "1rem",
            }}
          >
            {/* <div className="input-field">
              <span style={{ padding: "1rem" }}>
                Get Asset Data By DeviceID
              </span>
              <Input
                style={{
                  border: "2px solid orange",
                  width: "300px",
                  padding: "0.5rem",
                  borderRadius: "3px",
                }}
                name="deviceid"
                value={deviceID}
                placeholder="Get Asset Data By DeviceID"
                onChange={(event) => setDeviceID(event.target.value)}
              ></Input>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "1rem",
                padding: "1%",
              }}
              className="template-btn"
            >
              <Button
                type="primary"
                style={{ marginLeft: "8px" }}
                name="create_template"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              {assetList.assets && (
                <div className="btn-report">
                  <Space wrap>
                    <Button
                      type="primary"
                      style={{ marginLeft: "8px" }}
                      onClick={handleConverter}
                      icon={<DownloadOutlined />}
                      // size={size}
                    ></Button>
                  </Space>
                </div>
              )}
            </div> */}
          </div>

          {/* assetlist for stack handler */}

          <div
            className="asset-type"
            style={{
              display: "flex",
              justifyContent: "center",
              // marginTop: "1%",
            }}
          >
            <div className="input-field">
              <Input
                style={{
                  margin: 0,
                }}
                name="search"
                value={searchKey}
                placeholder={
                  checkedValue === 1 ? "Enter hostName" : "Enter Stack ID"
                }
                onChange={handleGlobalChange}
                //onChange={(event) => setSearchKey(event.target.value)}
              ></Input>
            </div>

            {/* provider selection for searchBy stackId section */}

            {checkedValue !== 1 && (
              <div className="provider_select">
                <Select
                  mode="multiple"
                  allowClear
                  // required={true}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select atleast one provider",
                  //   },
                  // ]}
                  style={{ width: "100%", margin: 0 }}
                  maxTagCount="responsive"
                  placeholder="Please select Providers"
                 // defaultValue={[]}
                  onChange={handleProviderChange}
                  >
                  {providerOptionList && providerOptionList.map((list, index)=>{
                    return <Select.Option key = {list.providerid} value = {list.providerid}>{list.provider_name}</Select.Option> 
                  })}
           
                  </Select>
              </div>
            )}

            {/* main dashboard button section starts here */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "1rem",
                //padding: "1%",
              }}
              className="template-btn"
            >
              <Button
                type="primary"
                disabled={!searchKey}
                style={{ marginLeft: "4em" }}
                name="create_template"
                onClick={handleGlobalSearch}
              >
                Submit
              </Button>
              <Button className="cio_button"
                  type="primary"
                  disabled={isDisable}
                  onClick={startCio}
                  style={{ marginLeft: "2%", border: "2px solid #e9e9e9", width: "60%", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px" }}
                  >Infra Details</Button>

              <Button className="costing_button"
                  type="primary"
                  disabled={isDisable}
                  onClick={startCosting}
                  style={{ marginLeft: "2%", border: "2px solid #e9e9e9", width: "60%", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px" }}
              >Cloud_Recommendations</Button>

              <Button className="details_button"
                  type="primary"
                  disabled={isDisable}
                  onClick={StartTable}
                  style={{ marginLeft: "2%", border: "2px solid #e9e9e9", width: "60%", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px" }}
              >Stack_details</Button>

              <Button className="Migration_button"
                  type="primary"
                  disabled={isDisable}
                  onClick={StartMigration}
                  style={{ marginLeft: "1%", border: "2px solid #e9e9e9", width: "60%", paddingTop:"4px",paddingBottom: "4px", fontFamily: "initial", fontSize:"15px" }}
              >Migration_Recommandations</Button>
            
            

              {assetList.assets && (
                <div className="btn-report">
                  <Space wrap>
                    <Button
                      type="primary"
                      style={{ marginLeft: "8px" }}
                      onClick={handleConverter}
                      icon={<DownloadOutlined />}
                      // size={size}
                    ></Button>
                  </Space>
                </div>
              )}
            </div>
            {/* main dashboard button section end here */}
          </div>
        </div>
      </div>
      {loading === true ? (
        <Spinner load={loading} />
      ) : (
        searchResult.assets &&
        searchResult.assets[0].stacks && (
          <div className="content">
                   {searchResult.assets && searchResult.assets[0].stacks && (
              // <div className="provider_select">
              //   <Select
              //     mode="multiple"
              //     allowClear
              //     required={true}
              //     rules={[
              //       {
              //         required: true,
              //         message: "Please select atleast one provider",
              //       },
              //     ]}
              //     style={{ width: "100%", margin: 0 }}
              //     placeholder="Please select Providers"
              //     defaultValue={[]}
              //     onChange={handleHostProviderChange}
              //     options={providerOptionList}
              //     maxTagCount="responsive"
              //   />
              // </div>

                      

         
              <div className="provider_select">
                <Select
                  mode="multiple"
                  allowClear
                  // required={true}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select atleast one provider",
                  //   },
                  // ]}
                  style={{ width: "100%", margin: 0 }}
                  maxTagCount="responsive"
                  placeholder="Please select Providers"
                 // defaultValue={[]}
                  onChange={handleProviderChange}
                  >
                  {providerOptionList && providerOptionList.map((list, index)=>{
                    return <Select.Option key = {list.providerid} value = {list.providerid}>{list.provider_name}</Select.Option> 
                  })}
           
                  </Select>
              </div>
         

              
            )}
            <div
              className="stack-cards"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {searchResult.assets &&
                searchResult.assets[0].stacks &&
                searchResult.assets[0].stacks.map((stack) => (
                  <ul
                    className="stackList-class"
                    onClick={() => handleStackCardClick(stack.stackid)}
                    key={stack.stackid}
                  >
                    <li>
                      <b>StackID:</b>
                      <span>{stack.stackid}_{stack.stack_name}</span>
                    </li>
                    {/* <li>
                      <b>Stack Name:</b>
                      <span>{stack.stack_name}</span>
                    </li> */}
                  </ul>
                ))}
            </div>
          </div>
        )
      )}

    
                {!assetDetailWithPrice && <div className="device-list-table list_table">
                  {stackResult && stackResult.assets && (
                    <TableBuiilder assetData={stackResult.assets} />
                  )}
                </div>}
              

   {/* display result for stack id alone */}      

      {assetDetailWithPrice&& (
        <div className="device-list-table listTable">
          {assetDetailWithPrice && (
            <TableBuiilder assetData={assetDetailWithPrice} />
          )}
        </div>
        
      )}

      <div>{piec}</div>
      {piec && <Button
                type="primary"
                style={{ marginLeft: "30%", marginTop: '1.8rem' }}
                name="report"
                onClick={handlePrint}
              >
                Download Report
              </Button>} 

      <div>{cloud_r}</div>
      {cloud_r && <Button
                type="primary"
                style={{ marginLeft: "30%", marginTop: '1.8rem' }}
                name="report"
                onClick={handleCloudPrint}
              >
                Download Report
              </Button>} 

      <div>{Stack_device_report}</div>
      {Stack_device_report && <Button
                type="primary"
                style={{ marginLeft: "30%", marginTop: '1.8rem' }}
                name="report"
                onClick={handleStackPrint}
              >
                Download Report
              </Button>}

      <div>{MigrationReport}</div>
      {MigrationReport && <Button
                type="primary"
                style={{ marginLeft: "30%", marginTop: '1.8rem' }}
                name="report"
                onClick={handleMigrationPrint}
              >
                Download Report
              </Button>}
      

      {/* <div>{Devices}</div> */}
      {/* <div>{CloudReport}</div> */}
      {/* <SweetAlert
    show={showAlert}
    title="Demo"
    text="SweetAlert in React"
    onConfirm={() => setShowAlert(false)}
  /> */}
    </div>
  );
};

export default ArmDashboard;
