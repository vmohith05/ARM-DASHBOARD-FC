import React ,{ useState, useEffect} from "react";
import Chart from "react-apexcharts";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Space, Table, Tag, Input, Button} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas   from 'html2canvas';
import jsPDF from 'jspdf';

export default function device_report(assetData, ref)
{

    console.log(assetData[0].data.collection_type);
    {/*
collection_type
cpu_architecture
cpu_count
cpu_frequency
cpu_model
deviceid
devicetype
dist_full
hardware_model
hardware_serial
hardware_vendor
hostname
identifying_ip
identifying_mac
interfaces
ips
memory
os
os_version
storage

*/}



    const columns=[

        {
            title: "Device Id",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.deviceid ? data.deviceid : "N/A"}</>
            ),
            width: 110,
            fixed: "left",
        },

        {
            title: "Hostname",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hostname ? data.hostname : "N/A"}</>,
            width: 130,
            
          },

        {
            title: "Collection Type",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.collection_type ? data.collection_type : "N/A"}</>
            ),
            width: 130,
        },

        {
            title: "Cpu Architecutre",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.cpu_architecture ? data.cpu_architecture : "N/A"}</>
            ),
            width: 140,
        },

        {
            title: "Cpu Count",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.cpu_count ? data.cpu_count : "N/A"}</>,
            width: 120,
        },

        {
            title: "Cpu Frequency",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.cpu_frequency ? data.cpu_frequency : "N/A"}</>,
            width: 120,
        },

        {
            title: "Cpu Model",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.cpu_model ? data.cpu_model : "N/A"}</>,
            width: 120,
        },

        {
            title: "Device Type",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.devicetype ? data.devicetype : "N/A"}</>
            ),
            width: 110,
        },

        {
            title: "Dist Full",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.dist_full ? data.dist_full : "N/A"}</>,
            width: 150,
        },

        {
            title: "Hardware Model",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hardware_model ? data.hardware_model : "N/A"}</>,
            width: 150,
        },

        {
            title: "Hardware Serial",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hardware_serial ? data.hardware_serial : "N/A"}</>,
            width: 150,
        },
        
        {
            title: "Hardware Vendor",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hardware_vendor ? data.hardware_vendor : "N/A"}</>,
            width: 150,
        },
        
      
          {
            title: "IP Address",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.identifying_ip ? data.identifying_ip : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
          },

          {
            title: "IP Mac",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.identifying_mac ? data.identifying_mac : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
          },

          {
            title: "Interfaces",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <span style={{ color: "orange" }}>
                {data.interfaces && data.interfaces.length
                  ? data.interfaces.length
                  : "N/A"}
              </span>
            ),
            //  fixed: 'right',
            width: 80,
          },

          {
            title: "ips",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <span style={{ color: "orange" }}>
                {data.ips && data.ips.length
                  ? data.ips.length
                  : "N/A"}
              </span>
            ),
            //  fixed: 'right',
            width: 80,
          },

          {
            title: "Memory",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.memory ? data.memory : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
          },

          {
            title: "OS",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.os ? data.os : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
          },

          {
            title: "os_version",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <>{data && data.os_version ? data.os_version : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
          },
          
          {
            title: "vmSize",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <span>
                {data.storage && convertBytes(data.storage[0].storage_used_bytes)
                  ? convertBytes(data.storage[0].storage_used_bytes)
                  : "N/A"}
              </span>
            ),
            width: 100,
          },
      
          {
            title: "Total Storage",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <span>
                {data.storage && convertBytes(data.storage[0].storage_size_bytes)
                  ? convertBytes(data.storage[0].storage_size_bytes)
                  : "N/A"}
              </span>
            ),
            width: 130,
          },
      
          {
            title: "Storage Used",
            dataIndex: "data",
            key: "data",
            render: (data) => (
              <span>
                {data.storage && convertBytes(data.storage[0].storage_used_bytes)
                  ? convertBytes(data.storage[0].storage_used_bytes)
                  : "N/A"}
              </span>
            ),
            width: 130,
          },
      
          {
            title: "Stack",
            dataIndex: "stacks",
            key: "stacks",
            render: (stacks) => <span>{stacks && stacks[0].stack_name}</span>,
            width: 80,
          },
        ]

        const handleDownLoadPdf = () => {
          const capture = document.querySelector('.costing_sec');
          html2canvas(capture).then((canvas)=> {
              const imgDt = canvas.toDataURL('img/png');
              const doc = new jsPDF('p', 'mm', 'a4');
              const compWidth = doc.internal.pageSize.getWidth();
              const compHeight = doc.internal.pageSize.getHeight();
              doc.addImage(imgDt, 'PNG', 0, 0, compWidth, compHeight);
              const data = new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  date: "numeric",
                  month: "numeric",
                  year: "numeric",
                });
              doc.save(`${data}_InDetail_Summery.pdf`)
          })
      }

    return <div style={{marginLeft: "3%"}}>
        <div ref = {ref} className="pdfBtn" style={{display:'flex'}}>
        <h1>{`Device details for stack: ${assetData[0].stacks[0].stack_name}`}</h1>
        {/*<Button
                type="primary"
                style={{ marginLeft: "8px", marginTop: '1.8rem' }}
                name="report"
                onClick={handleDownLoadPdf}
              >
                Download Report
    </Button>*/}
        </div>
        <div className="table_container" style={{marginTop: "10px", width: "1000px"}}>
        <Table
            rowKey={assetData.deviceid}
            columns={columns}
            dataSource={assetData}
            scroll={{
            x: 1000,
            y: 500,
            }}
        />
        </div>

    </div>
}