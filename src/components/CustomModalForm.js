import { React, useEffect, useState } from "react";
import Axios from "axios";
import jsonConverter from "../utils/DataToJson";
import "../arm.css";
import { Input, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import convertBytes from "../utils/memoryConverter";
import { Select } from "antd";
import osVersionList from "../utils/OsVersionList";
import CUSTOMLINUXTEMPLATE from "../armtemplate/LINUX_TEMPLATE";
import CUSTOMLINUXPARAMETER from "../armtemplate/LINUX_PARAMETER";
import CUSTOMWINDOWSTEMPLATE from "../armtemplate/WINDOWS_TEMPLATE";
import CUSTOMWINDOWSPARAMETER from "../armtemplate/WINDOWS_PARAMETER";
import "react-sweet-progress/lib/style.css";
import Spinner from "../Spinner";

const CustomModalForm = ({ selectedID }) => {
  const [assetList, setAssetList] = useState("");
  const [searchResult, setSearchResultData] = useState("");
  const [stackResult, setStackResult] = useState("");
  const [preetyData, setPrettyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [deviceID, setDeviceID] = useState("");
  const [stackID, setStackID] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [keyAttribute, setKeyAttribute] = useState([]);
  const [fieldVal, setFieldVal] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [nickName, setNickName] = useState("");
  const [VmSize, setVmSize] = useState("");
  const [VmName, setVmName] = useState("");
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
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [Subscription, setSubscription] = useState("");
  const [Region, setRegion] = useState("");
  const [tags_key, setTagsKey] = useState("AMS");
  const [tags_value, setTagsValue] = useState("");
  const [Subnet, setSubnet] = useState("");
  const [OsDiskType, setOsDiskType] = useState("Standard_LRS");
  const [message, setMessage] = useState("");
  const [VirtualMachineRG, setVirtualMachineRG]= useState("");
  const [Publisher, setPublisher] = useState("");
  const [Offer, setOffer] = useState("");
  const [Version, setVersion] = useState("");


  // Styles
  let styles = {
    root: { backgroundColor: "#1f4662", color: "#fff", fontSize: "12px" },
    header: {
      backgroundColor: "#193549",
      padding: "5px 10px",
      fontFamily: "monospace",
      color: "#ffc600",
    },
    pre: {
      display: "block",
      padding: "10px 30px",
      margin: "0",
      overflow: "scroll",
    },
  };

  const inputStyle1 = {
    width: "100%",
    display: "flex",
    padding: "0.5rem",
    borderRadius: "5px",
    margin: "1rem",
    border: "1px solid lightgray",
  };

  const btnStyle = {
    width: "150px",
    height: "30px",
    color: "#fff",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    border: "0",
    borderRadius: "3px",
    cursor: "pointer",
  };

  const inputStyle = {
    // border: "2px solid gray",
    //width:"300px",
    display: "flex",
    //padding:"0.5rem",
    // borderRadius:"3px",
    // margin:"1rem"
  };

  const btnReport = {
    width: "150px",
    height: "30px",
    color: "#fff",
    backgroundColor: "green",
    borderColor: "green",
    border: "0",
    borderRadius: "3px",
    marginLeft: "5px",
    cursor: "pointer",
  };
  const gridHeader = {
    textAlign: "center",
    padding: "0.342rem",
    borderBottom: "2px solid #f1f0f0",
  };

  const table = {
    display: "inline-block",
    margin: "1rem",
    width: "auto",
    border: "1px solid #666666",
  };

  const tableRow = {
    display: "table-row",
    width: "auto",
    clear: "both",
  };

  const tableCol = {
    float: "left",
    display: "table-column",
    width: "200px",
    border: "1px solid #ccc",
  };

  const centred = {
    height: "50px",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    zIndex: 10,
  };

  const getData = async (selectedID) => {
    const api = "http://localhost:4001/flexera";
    const response = await Axios.get(
      `${api}/getAssetDetails?deviceid=${selectedID}`
    );
    //setAccess(response.data[0]);
    const output = JSON.parse(response.data.body);
    const formatedData = JSON.stringify(output, null, "\t");
    console.log(
      "flexera asset data fetch async call ====>",
      JSON.parse(formatedData)
    );
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
  };

  const handleSubmit = () => {
    setLoading(true);
    getData();
    setOsVersion({
      value: assetList.assets && assetList.assets[0].data.os_version,
    });
  };

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

  const onOsVersionChange = (value, label) => {
    console.log(`selected ${value}`);
    console.log(label);
    setOperatingSystemVersion(label);
    if(label === "18.04-LTS")
    {setPublisher("Canonical"); setOffer("UbuntuServer"); setVersion("latest");}
    else if(label === "11-gen2")
    {setPublisher("debian");  setOffer("debian-11"); setVersion("latest");}
    else if(label === "7_6-gen2")
    {setPublisher("OpenLogic");  setOffer("CentOS"); setVersion("latest");}
    else if(label === "20_04-lts-gen2")
    {setPublisher("canonical"); setOffer("0001-com-ubuntu-server-focal"); setVersion("latest");}
    else if(label === "22_04-lts-gen2")
    {setPublisher("canonical"); setOffer("0001-com-ubuntu-server-jammy"); setVersion("latest");}
    else if(label === "9-lvm")
    {setPublisher("RedHat"); setOffer("RHEL"); setVersion("latest");}
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleGlobalChange = (event) => {
    setStackResult("");
    setSearchResultData("");
    setSearchKey(event.target.value);
  };
  // const createCustomArmTemplate = (customTemplate) => {
  //   const time = new Date().toLocaleTimeString("en-US", {
  //     hour12: false,
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //   });
  //   jsonConverter(customTemplate, `deploymentTemplate${time}`);
  //   alert("template created ");
  // }

  const handleCreateTemplate = () => {
    setBarSucessRate(50);
    setProgressStatus("active");
    // setLoading(true);
    setShowAlert(true);
    setShowProgress("flex");
    let armJson = {};
    if (assetList.assets) {
      armJson = {
        os: assetList.assets[0].data.os,
        osDefaultVersion: assetList.assets[0].data.os_version,
        osVersion: operatingSystemVersion,
        vmName: VmName,
        vmSize: VmSize,
        nicName: nickName,
        virtualNetworkName: virtualNetworkName,
        networkSecurityGroupName: networkSecurityGroupName,
        storageAccountName: storageAccountName,
        admin_Username: adminUsername,
        admin_Password: adminPassword,
        subscription_type: Subscription,
        virtualMachineRG: VirtualMachineRG,
        region: Region,
        tags_key: tags_key,
        tags_value: tags_value,
        subnet: Subnet,
        osDiskType: OsDiskType,
        publisher: Publisher,
        offer: Offer,
        version: Version
      };
    }

    setArmRightForm(armJson);
    console.log(`arm json data ${JSON.stringify(armJson, null, " ")}`);
    //console.log("test custome arm json data",customWinArmTemplate(armJson));
    setTimeout(() => {
      setBarSucessRate(80);
      setProgressStatus("active");
    }, 1000);

    setTimeout(() => {
      setBarSucessRate(90);
      setProgressStatus("active");
    }, 1000);

    setTimeout(() => {
      setBarSucessRate(100);
      setProgressStatus("success");
    }, 1000);

    setTimeout(() => {
      setShowProgress("none");
      setDownloadTemplateBtnEnabled(true);
    }, 2000);
  };

  useEffect(() =>{
    if(assetList)
    setNickName(`nic-${assetList.assets[0].data.hostname}`)
  }, [assetList])
  useEffect(() =>{
    if(assetList)
    setVmName(assetList.assets[0].data.hostname)
  }, [assetList])

  const handleReset = () => {
    setNickName("");
    setVirtualNetworkName("");
    setStorageAccountName("");
    setNetworkSecurityGrpName("");
    setOperatingSystemVersion("");
    setAdminUsername("");
    setAdminPassword("");
    setSubscription("");
    setVirtualMachineRG("");
    setRegion(""),
    setTagsKey("AMS");
    setTagsValue("");
    setSubnet("");
    setOsDiskType("");
    setDownloadTemplateBtnEnabled(false);
    //setOsVersionOption("")
  };

  const handleDownloadTemplate = () => {
    setBarSucessRate(50);
    setProgressStatus("active");
    // setLoading(true);
    setShowAlert(true);
    setShowProgress("flex");
    setTimeout(() => {
      setBarSucessRate(80);
      setProgressStatus("active");
    }, 1000);

    setTimeout(() => {
      setBarSucessRate(90);
      setProgressStatus("active");
    }, 1000);

    setTimeout(() => {
      setBarSucessRate(100);
      setProgressStatus("success");
    }, 1000);

    setTimeout(() => {
      setShowProgress("none");
      const ARM_PARAMETER =
        assetList.assets && assetList.assets[0].data.os === "Linux"
          ? CUSTOMLINUXPARAMETER(armformdata)
          : CUSTOMWINDOWSPARAMETER(armformdata);

      const ARM_TEMPLATE =
        assetList.assets && assetList.assets[0].data.os === "Linux"
          ? CUSTOMLINUXTEMPLATE(armformdata)
          : CUSTOMWINDOWSTEMPLATE(armformdata);

      const time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      
      jsonConverter(ARM_PARAMETER, `${time}_PARAMETER_${assetList.assets[0].data.os}_${assetList.assets[0].data.hostname}`);
      jsonConverter(ARM_TEMPLATE, `${time}_TEMPLATE_${assetList.assets[0].data.os}_${assetList.assets[0].data.hostname}`);
    }, 2000);
  };

  useEffect(() => {
    console.log(`inside useeffect ${selectedID}`);
    getData(selectedID);
  }, [selectedID]);

  const handleValidation = (Matr) => {
    console.log(Matr);
    const regExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&_])[A-Za-z0-9@$!%*#?&_]{12,}$/
    if(Matr === ""){
      setMessage("Please enter password")
      return true;
    } else if (regExp.test(Matr)){
      setMessage("Password is valid")
      return true;
    } else if (!regExp.test(Matr)){
      setMessage("Password is not valid")
      return true;
    } else {
      setMessage("")
      return true;
    }
  }

  return (
    <>
      {loading === true ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Connecting.... </h3>
          </div>
          <Spinner load={loading} />
        </>
      ) : (
        <div
          style={{
            background: "rgb(247 251 255)",
          }}
          className="list-item"
        >
          <div className="grid-sec" style={gridHeader}>
            <div
              style={{
                fontSize: "1.2rem",
                color: "#ffa64a",
                fontWeight: "400",
              }}
              className="grid-header"
            >
              ARM_{assetList && assetList.assets[0].deviceid}
            </div>
          </div>

          <div
            className="arm-lbl"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2% 14% 4% 18%",
            }}
          >
            <div className="vmname">
              <div>
                <span className="arm_lbl">vmName:</span>{" "}
                <span className="arm_lbl" style={{ color: "gray" }}>
                  {assetList.assets[0].data.hostname}
                </span>
              </div>
            </div>

            <div className="os">
              <div>
                <span className="arm_lbl">OS:</span>{" "}
                <span className="arm_lbl" style={{ color: "gray" }}>
                  {assetList.assets[0].data.os}
                </span>
              </div>
            </div>
          </div>

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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
            }}
            className="form-container"
          >
            {/*  display risc data */}
            {/* <div className="arm-form">
            <label>Cpu Architecture :</label>{" "}
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              name="cpu_architecture"
              title="cpu_architecture"
              disabled
              defaultValue={
                assetList.assets &&
                assetList.assets[0].data.cpu_architecture
              }
            />
            <label>Cpu Count: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="cpu_count"
              name="cpu_count"
              defaultValue={
                assetList.assets && assetList.assets[0].data.cpu_count
              }
            />
            <label>Memory: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="memory"
              name="memory"
              defaultValue={
                assetList.assets &&
                convertBytes(assetList.assets[0].data.memory)
              }
            />
            <label>Dist Full: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="dist_full"
              name="dist_full"
              defaultValue={
                assetList.assets && assetList.assets[0].data.dist_full
              }
            />
            <label>Identifying ip: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="identifying_ip"
              name="identifying_ip"
              defaultValue={
                assetList.assets && assetList.assets[0].data.identifying_ip
              }
            />
            <label>Location Name: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="location_name"
              name="location_name"
              defaultValue={
                assetList.assets &&
                assetList.assets[0].location[0].location_name
              }
            />
            <label>Stack Name: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="stackName"
              name="stackName"
              defaultValue={
                assetList.assets && assetList.assets[0].stacks[0].stack_name
              }
            />
            <label>StackID: </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="stackid"
              name="stackid"
              defaultValue={
                assetList.assets && assetList.assets[0].stacks[0].stackid
              }
            />
          </div> */}

            {/* <Input
              style={inputStyle}
              type="text"
              placeholder=""
              disabled
              name="vmsize"
              title="vmSize"
              defaultValue={convertBytes(
                assetList.assets[0].data.storage
                  ? assetList.assets[0].data.storage[0].storage_size_bytes
                  : assetList.assets[0].data.disks[0].disk_size_bytes
              )}
            />
            <label>vmName : </label>
            <Input
              style={inputStyle}
              type="text"
              placeholder=""
              disabled
              title="vmName"
               defaultValue={assetList.assets[0].data.hostname}
              name="vmname"
            /> */}
            {/* <label>OS :</label>{" "}
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              name="os"
              title="OS"
              disabled
               defaultValue={assetList.assets[0].data.os}
            /> */}
            {/* Arm form start */}
            <div
              style={{ marginLeft: "2%", borderLeft: "2px solid #e9e9e9" }}
              className="risc-form"
            >
              {/* <label>OS Version : </label>
            <Input
              type="text"
              style={inputStyle}
              placeholder=""
              disabled
              title="os_version"
              name="os_version"
              defaultValue={assetList.assets[0].data.os_version}
            /> */}
              <label>Default OS Version : </label>
              <Input
                type="text"
                style={inputStyle}
                placeholder=""
                disabled
                title="os_version"
                name="os_version"
                defaultValue={assetList.assets[0].data.os_version}
              />
              <label>OS Version : </label>
              <select
                style={inputStyle1}
                placeholder="select os version"
                onClick={(e) => {
                  let v = e.target.value;
                  console.log(v);
                  onOsVersionChange("value", v);
                }}
              >
                {assetList.assets && assetList.assets[0].data.os === "Linux"
                  ? osVersionList.linuxOsVersionList.map((v) => {
                      return <option value={v.label}>{v.label}</option>;
                    })
                  : osVersionList.windowsOsVersionList.map((v) => {
                      return <option value={v.label}>{v.label}</option>;
                    })}
              </select>
              <label>OsDiskType :</label>{" "}
              <Input
                style={inputStyle}
                type="text"
                value={OsDiskType}
                onChange={(e) => setOsDiskType(e.target.value)}
                placeholder="Enter OsDiskType"
                name="OsDiskType"
                title="OsDiskType"
              />
              <label>adminUsername : </label>
              <Input
                style={inputStyle}
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Enter AdminUsername"
                title="AdminUsername"
                name="AdminUsername"
              />
              <label>adminPassword</label>
              <Input
                style={inputStyle}
                type="password"
                value={adminPassword}
                onChange={((e) => handleValidation(e.target.value) && setAdminPassword(e.target.value))}
                placeholder="Enter AdminPassword"
                title="AdminPassword"
                name="AdminPassword"
              />
              <p style={{ marginLeft: "2%", borderLeft: "2px solid #e9e9e9" }}>{message}</p>
              <p style={{ marginLeft: "2%", borderLeft: "2px solid #e9e9e9" }}>(Password must consists of: 1 lower and upper case character,:</p>
              <p style={{ marginLeft: "2%", borderLeft: "2px solid #e9e9e9" }}>1 num, 1 special character and of length 12-123):</p>
              
              <label>Subscription Type : </label>
              <Input
                style={inputStyle}
                type="text"
                value={Subscription}
                onChange={(e) => setSubscription(e.target.value)}
                placeholder="Enter Subscription Type"
                title="Subscription_type"
                name="Subscription_type"
              />

              <label>VirtualMachineRG : </label>
              <Input
                style={inputStyle}
                type="text"
                value={VirtualMachineRG}
                onChange={(e) => setVirtualMachineRG(e.target.value)}
                placeholder="Enter VirtualMachineRG"
                title="VirtualMachineRG"
                name="VirtualMachineRG"
              />

              <label>Region : </label>
              <Input
                style={inputStyle}
                type="text"
                value={Region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Enter Region"
                title="Region"
                name="Region"
              />
              <label>nicName :</label>{" "}
              <Input
                style={inputStyle}
                type="text"
                defaultValue={assetList.assets[0].data.hostname}
                value={nickName}
                onChange={(e)=> setNickName(e.target.value)}
                placeholder="Enter nicName"
                name="nicName"
                title="nicName"
                />
                            
              <label>VmName :</label>{" "}
              <Input
                style={inputStyle}
                type="text"
                defaultValue={assetList.assets[0].data.hostname}
                value={VmName}
                onChange={(e)=> setVmName(e.target.value)}
                placeholder="Enter VmName"
                name="VmName"
                title="VmName"
                />

                <label>Subnet : </label>
                <Input
                style={inputStyle}
                type="text"
                value={Subnet}
                onChange={(e) => setSubnet(e.target.value)}
                placeholder="Enter Subnet"
                title="Subnet"
                name="Subnet"
              />
              <label>VmSize : </label>
              <select 
              style={inputStyle1}
              value={VmSize} onChange={e=>setVmSize(e.target.value)}>
              <option>select VmSize</option>
              <option value={"Standard_DS1_v2"}>Standard_DS1_v2</option>
              <option value={"Standard_E2s_v3"}>Standard_E2s_v3</option>
              </select>
              <label>VmSize : </label>
                <Input
                style={inputStyle}
                type="text"
                value={VmSize}
                onChange={(e) => setVmSize(e.target.value)}
                placeholder="Enter VmSize"
                title="VmSize"
                name="VmSize"
              />
              <label>Tags Key : </label>
              <Input
                style={inputStyle}
                type="text"
                value={tags_key}
                onChange={(e) => setTagsKey(e.target.value)}
                placeholder="Enter Tags key"
                title="tags_key"
                name="tags_key"
              />
              <label>Tags Value : </label>
              <Input
                style={inputStyle}
                type="text"
                value={tags_value}
                onChange={(e) => setTagsValue(e.target.value)}
                placeholder="Enter Tags value"
                title="tags_value"
                name="tags_value"
              />
              <label>virtualNetworkName : </label>
              <Input
                style={inputStyle}
                type="text"
                value={virtualNetworkName}
                onChange={(e) => setVirtualNetworkName(e.target.value)}
                placeholder="Enter virtualNetworkName"
                title="virtualNetworkName"
                name="virtualNetworkName"
              />
              <label>networkSecurityGroupName :</label>{" "}
              <Input
                style={inputStyle}
                type="text"
                value={networkSecurityGroupName}
                onChange={(e) => setNetworkSecurityGrpName(e.target.value)}
                placeholder="Enter network Security GroupName"
                name="networkSecurityGroupName"
                title="ninetworkSecurityGroupNamecName"
              />
              <label>storageAccountName : </label>
              <Input
                style={inputStyle}
                type="text"
                value={storageAccountName}
                onChange={(e) => setStorageAccountName(e.target.value)}
                placeholder="Enter storage AccountName"
                title="storageAccountName"
                name="storageAccountName"
              />
              {assetList.assets && (
                <div
                  className="btn-report"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "1rem",
                  }}
                >
                  <Space wrap>
                    <Button
                      type="primary"
                      style={{ background: "orange", borderColor: "orange" }}
                      onClick={handleReset}
                    >
                      {" "}
                      Clear
                    </Button>
                  </Space>

                  <Space wrap>
                    <Button
                      type="primary"
                      disabled={
                        !(
                          
                          VmSize &&
                          networkSecurityGroupName &&
                          storageAccountName &&
                          virtualNetworkName &&
                          operatingSystemVersion &&
                          adminUsername &&
                          adminPassword &&
                          Subscription &&
                          VirtualMachineRG &&
                          Region &&
                          tags_key &&
                          tags_value &&
                          Subnet &&
                          OsDiskType &&
                          (message === "Password is valid")
                        )
                      }
                      onClick={handleCreateTemplate}
                    >
                    Create Template  
                    {" "}
                    </Button>
                  </Space>

                  {btnEnable && (
                    <Space wrap>
                      <Button
                        type="primary"
                        style={{ background: "green", borderColor: "green" }}
                        onClick={handleDownloadTemplate}
                        icon={<DownloadOutlined />}
                        // size={size}
                      >
                        Download Template
                      </Button>
                    </Space>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>

    //   <div>
    //     <h1>{selectedID}</h1>
    //   </div>
  );
};

export default CustomModalForm;
