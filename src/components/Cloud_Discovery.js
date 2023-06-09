import React ,{ useState, useEffect} from "react";
import Chart from "react-apexcharts";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Space, Table, Tag, Input, Button} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas   from 'html2canvas';
import jsPDF from 'jspdf';

//DeviceId, Hostname, IP_Address, Licensed, Collection_Type, Device_Type, vmSize, Interfaces, Cpu_Architecutre, Cpu_Count, Storage_Used, Dist_Full, Identifying_IP, Stack, Memorys, Location_Name, Storage_Size, Tags

export default function d_report(assetData, tag, summerycost, ref)
{
    console.log(tag);
    //OS Distribution
    const OsDis=[];
    const OsDisSeries=[];
    for(let i=0; i<assetData.length; i++)
    {
        OsDis.push(assetData[i].data.os);
    }
    let uniqdis= Array.from(new Set(OsDis));
    //loop
    var c=0;
    for(let i=0;i<uniqdis.length;i++)
    {
        c=0;
        for(let j=0;j<OsDis.length;j++)
        {
            if(uniqdis[i] === OsDis[j])
            {
                c++;
            }
        }
        OsDisSeries.push(c);
    }


    //Workload Distribution
    const tagload = [];
    var tagSeries = [];
    var c1=0;
    var c2=0;
    var c3=0;
    for (let i=0;i<assetData.length;i++)
    {
        c=0;
        for (let j=0;j<assetData[i].tags.length;j++)
        {
            if( assetData[i].tags[j].tagid === 12)
            {
                console.log(i);
                tagload.push(assetData[i].tags[j].tagvalue);
                console.log(assetData[i].tags[j].tagvalue);
                c1++;
                c++;
            }
            if(assetData[i].tags[j].tagid === 13)
            {
              console.log(i);
                tagload.push(assetData[i].tags[j].tagvalue);
                console.log(assetData[i].tags[j].tagvalue);
                c2++;
                c++;
            }
            if(c === 2)
            {
                tagload.push("web_database");
                c=0;
                c3++;
            }
        }
    }
    let uniqtag= Array.from(new Set(tagload));
    c1=c1-c3;
    c2=c2-c3;
    tagSeries = [c1,c2,c3];



    

    //ServerType
    const serverType=[];
    const serverTypeSeries=[];
    for(let i=0; i<assetData.length; i++)
    {
        serverType.push(assetData[i].data.devicetype);
    }
    let uniqServerType= Array.from(new Set(serverType));
    //loop
    var c=0;
    for(let i=0;i<uniqServerType.length;i++)
    {
        c=0;
        for(let j=0;j<serverType.length;j++)
        {
            if(uniqServerType[i] === serverType[j])
            {
                c++;
            }
        }
        serverTypeSeries.push(c);
    }



    //AssetType
    const assetType=[];
    const assetTypeSeries=[];
    for(let i=0; i<assetData.length; i++)
    {
        assetType.push(assetData[i].tags[0].tagvalue);
    }
    let uniqAsset= Array.from(new Set(assetType));
    //loop
    for(let i=0;i<uniqAsset.length;i++)
    {
        c=0;
        for(let j=0;j<assetType.length;j++)
        {
            if(uniqAsset[i] === assetType[j])
            {
                c++;
            }
        }
        assetTypeSeries.push(c);
    }


    //table for Display Hostname / IP Address / NIC count in table 
    const columns = [
        {
            title: "Hostname",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hostname ? data.hostname : "N/A"}</>,
            width: 130,
            //fixed: "left",
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
    ]



    //function for PieChart
    function pchart(uniqarr, arrSeries)
    {
        return <Chart
            style={{border: '2px solid rgb(0, 68, 102)', paddingLeft: "10px", width: "45rem", marginTop: "10px", marginLeft: "14%"}}
            type="pie"
            width={600}
            height={300}
    
            series= {arrSeries}

            options={{
                noData: {text:"Empty Data"},
                labels:uniqarr
            }}
            >
        </Chart>
    }


    //details for Storage bar graph
    const storage_avail=[];
    const storage_used=[];
    const device_ids=[];
    for(let i=0;i<assetData.length;i++)
    {
        storage_avail.push(assetData[i].data.storage && assetData[i].data.storage[0].storage_size_bytes? (convertBytes(assetData[i].data.storage[0].storage_size_bytes)): "N/A");
        storage_used.push(assetData[i].data.storage && assetData[i].data.storage[0].storage_used_bytes? (convertBytes(assetData[i].data.storage[0].storage_used_bytes)): "N/A");
        device_ids.push(assetData[i].data.hostname);
    }
    const inventoryCpu=[];
    const usageCpu=[];
    for(let i=0;i<assetData.length;i++)
    {
        inventoryCpu.push(convertBytes(assetData[i].inventroy_cpu_hz));
        usageCpu.push(convertBytes(assetData[i].usage_cpu_hz));
        device_ids.push(assetData[i].deviceid);
    }
    
    //function for BarGraph
    function bgraph(value1,value2,value3,value4)
    {
        return <Chart
        style={{marginLeft: "5%"}}
        type="bar"
        width={600}
        height={400}

        series={[
            {
                name:"Storage Available",
                data:value1,
                color: "rgb(0, 170, 255)"
            },
            {
                name:"Storage used",
                data:value2,
                color: "rgb(255, 0, 102)"
            }
        ]}

        options={{
            title:{
                text:"Storage size in source server",
                style:{ fontSize:30,  color: "#004d99", fontWeight: "2px", fontSize:"20px"}
            },
            colors:['#f90000'],
        
        xaxis:{
            categories: value3,
            title:{
            text: `Devices in a Stack ${value4[0].stacks[0].stack_name}`
            }
        },
        yaxis:{
            title:{
            text: `units in GiB`
            }
        }
        }}
        >
        </Chart>
    }
    //function for BarGraph for CPU Utilization.
    function bgraph1(value1,value2,value3,value4)
    {
        return <Chart
        style={{marginLeft: "5%"}}
        type="bar"
        width={600}
        height={400}

        series={[
            {
                name:"Cpu Inventory",
                data:value1,
                color: "rgb(0, 170, 255)"
            },
            {
                name:"Cpu Usage",
                data:value2,
                color: "rgb(255, 0, 102)"
            }
        ]}

        options={{
            title:{
                text:"CPU Utilization",
                style:{ fontSize:30, color: "#004d99", fontWeight: "2px", fontSize:"20px"}
            },
            colors:['#f90000'],
        
        xaxis:{
            categories: value3,
            title:{
            text: `Devices in a Stack ${value4[0].stacks[0].stack_name}`
            }
        },
        yaxis:{
            title:{
            text: `units in GiB`
            }
        }
        }}
        >
        </Chart>
    }


    function bgraph2(value1,value2,value4)
    {
        return <Chart
        style={{marginLeft: "5%"}}
        type="bar"
        width={600}
        height={400}

        series={[
            {
                name:"Memory Inventory",
                data:value1,
                color: "rgb(0, 170, 255)"
            },
            {
                name:"Memory Usage",
                data:value2,
                color: "rgb(255, 0, 102)"
            }
        ]}

        options={{
            title:{
                text:"Memory Utilization",
                style:{ fontSize:30,  color: "#004d99", fontWeight: "2px", fontSize:"20px"}
            },
            colors:['#f90000'],
        
        xaxis:{
            title:{
            text: `Devices in a Stack ${value4[0].stacks[0].stack_name}`
            }
        },
        yaxis:{
            title:{
            text: `units in GiB`
            }
        }
        }}
        >
        </Chart>
    }


    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const handleDownLoadPdf = () => {
        const capture = document.querySelector('.cloud-infra-container');
        html2canvas(capture).then((canvas)=> {
            const imgDt = canvas.toDataURL('pdf');
            const doc = new jsPDF('p', 'mm', 'a4');
            const compWidth = doc.internal.pageSize.getWidth();
            const compHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgDt, 'PDF', 0, 0, compWidth, compHeight);
            const data = new Date().toLocaleTimeString("en-US", {
                hour12: false,
                date: "numeric",
                month: "numeric",
                year: "numeric",
              });
            doc.save(`${data}_Stack_Dashboard.pdf`)

        })
    };
    

    return (<div ref = {ref} className="cloud-infra-container" id="content" style={{marginTop: "50px"}}>
        <div className="cloud_infra" style={{marginLeft: "3%"}}>
            <br></br>
        <h1 style={{textAlign: "center"}}>Infrastructure Details - {assetData[0].stacks[0].stack_name}</h1>
        <div className="pdfBtn" style={{display:'flex'}}>
            <br></br>
        <h2 style={{color: "#3399ff"}}>Cloud Infrastructure Overview</h2>
            {/*<Button
                id="download"
                type="primary"
                style={{ marginLeft: "8px", marginTop: '1.8rem' }}
                name="report"
                onClick={handleDownLoadPdf}
              >
                Download Report
            </Button>*/}
        </div>
        <p style={{fontSize:"20px"}}>OPTUM has identified the server information and recommendations that are necessary to be considered for
            Cloud migration planning. With this brief consolidated information and advisories, organizations can 
            take better decisions on their Cloud adoption in short span of time.</p>
        <p style={{fontSize:"20px"}}>Refer detailed reports for more information.</p>
        <h2 style={{color: "#004d99"}}>Overview of Current Infrastructure </h2>
        <p style={{fontSize:"20px"}}>Based on the resources such as servers, workloads, and OS identified 
            at the time of scan.</p>


    <div classname="container" style={{color: "#004d99"}}>
        <h2 style={{fontSize:"25px"}}>OS Distribution</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Classification of {assetData.length} servers based on OS Distribution - Stack:{assetData[0].stacks[0].stack_name}</p>
        <div>{pchart(uniqdis, OsDisSeries)}</div>
        
        <h2 style={{fontSize:"25px"}}>Workload Distribution</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Classification of {assetData.length} servers based on Workload Distribution such as web and Database - Stack: {assetData[0].stacks[0].stack_name}</p>
        <div>{pchart(uniqtag, tagSeries)}</div>
        <h1> </h1>
        <h2 style={{fontSize:"25px", marginTop: "20px"}}>Server Type</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Classification of {assetData.length} Servers based on Server type - Stack:{assetData[0].stacks[0].stack_name}. </p>
        <div>{pchart(uniqServerType, serverTypeSeries)}</div>
        {/*<div>{pchart(uniqdist, dist_fulSeries, `Classification of ${assetData.length} servers based on DistFull.`)}</div>
<div>{pchart(uniqip, ipSeries, `Classification of ${assetData.length} servers based on Identifying IP.`)}</div>*/}
        
        <h2 style={{fontSize:"25px"}}>Asset Type</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Classification of {assetData.length} servers based on Asset Type - Stack:{assetData[0].stacks[0].stack_name}.</p>
        <div>{pchart(uniqAsset, assetTypeSeries)}</div>
        
        {/*Table for Ip Distribution*/}
        <h2 style={{marginTop:"30px"}}>Private / Public IP Distribution:</h2>
        <h2 style={{fontSize: "20px"}}>Distribution of Private / Public IP in the server(s).</h2>
        <div className="table_container" style={{marginTop: "10px", width: "1000px", marginLeft: "5%"}}>
        <Table
        
            rowKey={assetData.deviceid}
            columns={columns}
            dataSource={assetData}
            scroll={{
            x: 500,
            y: 380,
            }}
        />
        </div>
        

        {/*Bar graph for storage type*/}
        
        <h2 style={{marginTop:"120px", fontSize:"25px"}}>Storage Advisory generated based on the Storage that are available in source server.</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Based on the collected data, total space used in all available disks (including OS disks) and any additional storage(s) is displayed for stack-{assetData[0].stacks[0].stack_name}</p>
        <div style={{marginTop:"30px"}}>{bgraph(storage_avail, storage_used, device_ids,assetData)}</div>
      
        <h2 style={{fontSize:"25px"}}>Current Infrastructure Performance based on CPU and Memory utilization rate of servers</h2>
        <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Based on the collected data by the Cloud readiness tool, the CPU, Memory Utilizations for the servers are displayed for stack-{assetData[0].stacks[0].stack_name}</p>
        <div style={{marginTop:"30px"}}>{bgraph1(inventoryCpu, usageCpu, device_ids,assetData)}</div>
        {/*<div style={{marginTop:"30px"}}>{bgraph2(inventoryCpu, usageCpu, assetData)}</div>*/}
    </div>


    <div style={{marginTop:"50px", fontSize: "20px", borderRadius: "5px",}}>{`Time : ${time}`}</div>


    </div>
    </div>)
}