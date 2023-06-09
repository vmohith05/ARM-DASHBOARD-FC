import { useEffect, useState } from "react";
import { Button, Space, Table, Tag,Form, Input } from "antd";
import ModalPopUpBuilder from "../components/ModalPopUpBuilder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ArmForm from "./ArmForm";
import CustomModalForm from "./CustomModalForm";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import { read, utils, writeFileXLSX } from 'xlsx';

const DeviceTableBuilder = () => {
    console.log("CIODasboard");
    const [data, setData] = useState("");
    const columns = [
      {
        title: "Hostname",
        dataIndex: "Hostname",
        key: "Hostname",
        render: (Hostname) => <>{Hostname && Hostname? Hostname : "N/A"}</>,
        width: 130,
        fixed: "left",
      },
      {
        title: "asset_id",
        dataIndex: "asset_id",
        key: "asset_id",
        render: (asset_id) => <>{asset_id && asset_id? asset_id : "N/A"}</>,
        width: 150,
      },
      {
        title: "OperatingSystem",
        dataIndex: "OperatingSystem",
        key: "OperatingSystem",
        render: (OperatingSystem) => <>{OperatingSystem && OperatingSystem? OperatingSystem : "N/A"}</>,
        width: 130,
      },
      {
        title: "StackID",
        dataIndex: "StackID",
        key: "StackID",
        render: (StackID) => <>{StackID && StackID? StackID : "N/A"}</>,
        width: 130,
      },
      {
        title: "StackName",
        dataIndex: "StackName",
        key: "StackName",
        render: (StackName) => <>{StackName && StackName? StackName : "N/A"}</>,
        width: 130,
      },
      {
        title: "Location_name",
        dataIndex: "Location_name",
        key: "Location_name",
        render: (Location_name) => <>{Location_name && Location_name? Location_name : "N/A"}</>,
        width: 120,
      },
      {
        title: "VM_Physical",
        dataIndex: "VM_Physical",
        key: "VM_Physical",
        render: (VM_Physical) => <>{VM_Physical && VM_Physical? VM_Physical : "N/A"}</>,
        width: 130,
      },
      {
        title: "Total_Size",
        dataIndex: "Total_Size",
        key: "Total_Size",
        render: (Total_Size) => <>{Total_Size && Total_Size? Total_Size : "N/A"}</>,
        width: 130,
      },
      {
        title: "Disk_Free",
        dataIndex: "Disk_Free",
        key: "Disk_Free",
        render: (Disk_Free) => <>{Disk_Free && Disk_Free? Disk_Free : "N/A"}</>,
        width: 130,
      },
      {
        title: "CPU_count",
        dataIndex: "CPU_count",
        key: "CPU_count",
        render: (CPU_count) => <>{CPU_count && CPU_count? CPU_count : "N/A"}</>,
        width: 130,
      },
      {
        title: "Application",
        dataIndex: "Application",
        key: "Application",
        render: (Application) => <>{Application && Application? Application : "N/A"}</>,
        width: 130,
      },
      {
        title: "ApplicationManager",
        dataIndex: "ApplicationManager",
        key: "ApplicationManager",
        render: (ApplicationManager) => <>{ApplicationManager && ApplicationManager? ApplicationManager : "N/A"}</>,
        width: 150,
      },
      {
        title: "BusinessOwner",
        dataIndex: "BusinessOwner",
        key: "BusinessOwner",
        render: (BusinessOwner) => <>{BusinessOwner && BusinessOwner? BusinessOwner : "N/A"}</>,
        width: 130,
      },
      {
        title: "CIOwner",
        dataIndex: "CIOwner",
        key: "CIOwner",
        render: (CIOwner) => <>{CIOwner && CIOwner? CIOwner : "N/A"}</>,
        width: 80,
      },
      {
        title: "DBPlatform",
        dataIndex: "DBPlatform",
        key: "DBPlatform",
        render: (DBPlatform) => <>{DBPlatform && DBPlatform? DBPlatform : "N/A"}</>,
        width: 100,
      },
      {
        title: "WorkLoadENV",
        dataIndex: "WorkLoadENV",
        key: "WorkLoadENV",
        render: (WorkLoadENV) => <>{WorkLoadENV && WorkLoadENV? WorkLoadENV : "N/A"}</>,
        width: 130,
      },
      {
        title: "Source_VM_IP",
        dataIndex: "Source_VM_IP",
        key: "Source_VM_IP",
        render: (Source_VM_IP) => <>{Source_VM_IP && Source_VM_IP? Source_VM_IP : "N/A"}</>,
        width: 130,
      },
      {
        title: "Tag_App_Context",
        dataIndex: "Tag_App_Context",
        key: "Tag_App_Context",
        render: (Tag_App_Context) => <>{Tag_App_Context && Tag_App_Context? Tag_App_Context : "N/A"}</>,
        width: 160,
      },
      {
        title: "Tag_Application_Instance",
        dataIndex: "Tag_Application_Instance",
        key: "Tag_Application_Instance",
        render: (Tag_Application_Instance) => <>{Tag_Application_Instance && Tag_Application_Instance? Tag_Application_Instance : "N/A"}</>,
        width: 170,
      },
      {
        title: "Tag_Database_Instance",
        dataIndex: "Tag_Database_Instance",
        key: "Tag_Database_Instance",
        render: (Tag_Database_Instance) => <>{Tag_Database_Instance && Tag_Database_Instance? Tag_Database_Instance : "N/A"}</>,
        width: 160,
      },
      {
        title: "Tag_EOS_EoL",
        dataIndex: "Tag_EOS_EoL",
        key: "Tag_EOS_EoL",
        render: (Tag_EOS_EoL) => <>{Tag_EOS_EoL && Tag_EOS_EoL? Tag_EOS_EoL : "N/A"}</>,
        width: 130,
      },
      {
        title: "Tag_Performance_Profile",
        dataIndex: "Tag_Performance_Profile",
        key: "Tag_Performance_Profile",
        render: (Tag_Performance_Profile) => <>{Tag_Performance_Profile && Tag_Performance_Profile? Tag_Performance_Profile : "N/A"}</>,
        width: 170,
      },
      {
        title: "Tag_rscore",
        dataIndex: "Tag_rscore",
        key: "Tag_rscore",
        render: (Tag_rscore) => <>{Tag_rscore && Tag_rscore? Tag_rscore : "N/A"}</>,
        width: 130,
      },
      {
        title: "Tag_Tier",
        dataIndex: "Tag_Tier",
        key: "Tag_Tier",
        render: (Tag_Tier) => <>{Tag_Tier && Tag_Tier? Tag_Tier : "N/A"}</>,
        width: 130,
      },
      {
        title: "Tag_U_Sample",
        dataIndex: "Tag_U_Sample",
        key: "Tag_U_Sample",
        render: (Tag_U_Sample) => <>{Tag_U_Sample && Tag_U_Sample? Tag_U_Sample : "N/A"}</>,
        width: 130,
      },
      {
        title: "Action",
        render:(data)=>{
          return <>
          <Button onClick={ChangeValue(data.StackName, data.StackID)}>Edit</Button>
          </>
        },
        width: 100,
      },
  ]
  function ChangeValue(name, id)
  {
    console.log(id);
  }

      useEffect(()=> {
       deviceDetails();
      },[])

      const deviceDetails = async() =>{
        const response = await fetch("http://localhost:3000/fetch");
        let d = await response.json().catch((e) => {
          console.warn("invalid json res : ", e);
          return null;
        }); 

        setData(d)
      }

      const handleExportToExcel = ()=> {
        const time = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `${time}serverDetail.xlsx`);
      }

    return(
    <div className="table_container">
      <div className="card-header" style={{display:'flex'}}>
      <h3 style={{textAlign:'center'}}>CIO ALL Server Detail</h3>
      <Button  type="primary" onClick={handleExportToExcel} >Export To Excel</Button>
      </div>
  
        <Table
        rowKey={data.deviceid}
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
        }}
      />
    </div>
    )
}
export default DeviceTableBuilder;