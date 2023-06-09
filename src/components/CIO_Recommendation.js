import { useState, useEffect } from "react";
import { Button, Space, Table, Tag } from "antd";
import ModalPopUpBuilder from "../components/ModalPopUpBuilder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ArmForm from "./ArmForm";
import CustomModalForm from "./CustomModalForm";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import {CSVLink, CSVDownload} from 'react-csv';

const Cloud_Recommendation = () => {
    console.log("CIO_Cloud_Recommendation");
    const [Data, setData] = useState("");
    console.log(Data);
    const columns = [
        {
            title: "Device_ID",
            dataIndex: "Device_ID",
            key: "Device_ID",
            render: (Device_ID) => <>{Device_ID && Device_ID? Device_ID : "N/A"}</>,
            width: 130,
            fixed: "left",
          },
          {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            render: (Name) => <>{Name && Name? Name : "N/A"}</>,
            width: 130,
          },
          {
            title: "Stack_Id",
            dataIndex: "Stack_Id",
            key: "Stack_Id",
            render: (Stack_Id) => <>{Stack_Id && Stack_Id? Stack_Id : "N/A"}</>,
            width: 130,
          },
          {
            title: "Stack_Name",
            dataIndex: "Stack_Name",
            key: "Stack_Name",
            render: (Stack_Name) => <>{Stack_Name && Stack_Name? Stack_Name : "N/A"}</>,
            width: 130,
          },
          {
            title: "IP_Address",
            dataIndex: "IP_Address",
            key: "IP_Address",
            render: (IP_Address) => <>{IP_Address && IP_Address? IP_Address : "N/A"}</>,
            width: 130,
          },
          {
            title: "Provider",
            dataIndex: "Provider",
            key: "Provider",
            render: (Provider) => <>{Provider && Provider? Provider : "N/A"}</>,
            width: 130,
          },
          {
            title: "Basis",
            dataIndex: "Basis",
            key: "Basis",
            render: (Basis) => <>{Basis && Basis? Basis : "N/A"}</>,
            width: 130,
          },
          {
            title: "CPU_Hz",
            dataIndex: "CPU_Hz",
            key: "CPU_Hz",
            render: (CPU_Hz) => <>{CPU_Hz && CPU_Hz? CPU_Hz : "N/A"}</>,
            width: 180,
          },
          {
            title: "Instance_Name",
            dataIndex: "Instance_Name",
            key: "Instance_Name",
            render: (Instance_Name) => <>{Instance_Name && Instance_Name? Instance_Name : "N/A"}</>,
            width: 130,
          },
          {
            title: "Instance_Cost_per_hour",
            dataIndex: "Instance_Cost_per_hour",
            key: "Instance_Cost_per_hour",
            render: (Instance_Cost_per_hour) => <>{Instance_Cost_per_hour && Instance_Cost_per_hour? Instance_Cost_per_hour : "N/A"}</>,
            width: 150,
          },
          {
            title: "Storage",
            dataIndex: "Storage",
            key: "Storage",
            render: (Storage) => <>{Storage && Storage? Storage : "N/A"}</>,
            width: 180,
          },
          {
            title: "Storage_Cost_per_hour",
            dataIndex: "Storage_Cost_per_hour",
            key: "Storage_Cost_per_hour",
            render: (Storage_Cost_per_hour) => <>{Storage_Cost_per_hour && Storage_Cost_per_hour? Storage_Cost_per_hour : "N/A"}</>,
            width: 180,
          },
          {
            title: "Storage_IO_Cost_per_hour",
            dataIndex: "Storage_IO_Cost_per_hour",
            key: "Storage_IO_Cost_per_hour",
            render: (Storage_IO_Cost_per_hour) => <>{Storage_IO_Cost_per_hour && Storage_IO_Cost_per_hour? Storage_IO_Cost_per_hour : "N/A"}</>,
            width: 180,
          },
          {
            title: "Network_IO_Cost_per_hour",
            dataIndex: "Network_IO_Cost_per_hour",
            key: "Network_IO_Cost_per_hour",
            render: (Network_IO_Cost_per_hour) => <>{Network_IO_Cost_per_hour && Network_IO_Cost_per_hour? Network_IO_Cost_per_hour : "N/A"}</>,
            width: 180,
          },
          {
            title: "Total_Cost_per_hour",
            dataIndex: "Total_Cost_per_hour",
            key: "Total_Cost_per_hour",
            render: (Total_Cost_per_hour) => <>{Total_Cost_per_hour && Total_Cost_per_hour? Total_Cost_per_hour : "N/A"}</>,
            width: 180,
          },

      ]

      useEffect(()=> {
        deviceDetails();
       },[])
 
       const deviceDetails = async() =>{
         const response = await fetch("http://localhost:3000/fetch/Iaas_pricing");
         let d = await response.json().catch((e) => {
           console.warn("invalid json res : ", e);
           return null;
         }); 
 
         setData(d)
       }
    return <div className="table_container" style={{marginTop: "50px"}}>
      
        <Table
        style={{marginTop: '40px', width: '2000px'}}
        id="table"
        rowKey={Data.Device_ID}
        columns={columns}
        dataSource={Data}
        scroll={{
          x: 1500,
        }}
      />
    </div>
}
export default Cloud_Recommendation;