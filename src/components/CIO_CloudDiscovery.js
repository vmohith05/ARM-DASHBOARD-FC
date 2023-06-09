import React ,{ useState, useRef, useEffect} from "react";
import Chart from "react-apexcharts";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Space, Table, Tag, Input, Button} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas   from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';

//DeviceId, Hostname, IP_Address, Licensed, Collection_Type, Device_Type, vmSize, Interfaces, Cpu_Architecutre, Cpu_Count, Storage_Used, Dist_Data, Identifying_IP, Stack, Memorys, Location_Name, Storage_Size, Tags

export default function Cloud_Discovery_Report()
{

    //ServerRole_APP_DB
    const serverRole = [];
    const RoleSeries=[];
    const [Data, setCloudData]  = useState("");
    console.log(Data.length);
    for(let i=0;i<Data.length;i++)
    {
        serverRole.push(Data[i].ServerRole_APP_DB)
    }
    let uniqServer= Array.from(new Set(serverRole));
    var c=0;
    for(let i=0;i<uniqServer.length;i++)
    {
        c=0;
        for(let j=0;j<serverRole.length;j++)
        {
            if(uniqServer[i] === serverRole[j])
            {
                c++;
            }
        }
        RoleSeries.push(c);
    }

    //Location
    const loc = [];
    const locSeries=[];
    console.log(Data.length);
    for(let i=0;i<Data.length;i++)
    {
        loc.push(Data[i].Location_name)
    }
    let uniqloc= Array.from(new Set(loc));
    var c=0;
    for(let i=0;i<uniqloc.length;i++)
    {
        c=0;
        for(let j=0;j<loc.length;j++)
        {
            if(uniqloc[i] === loc[j])
            {
                c++;
            }
        }
        locSeries.push(c);
    }

    //Device OS

    const OS = [];
    const OsSeries=[];
    for(let i=0;i<Data.length;i++)
    {
        OS.push(Data[i].OperatingSystem)
    }
    let uniqOS= Array.from(new Set(OS));
    var c=0;
    for(let i=0;i<uniqOS.length;i++)
    {
        c=0;
        for(let j=0;j<OS.length;j++)
        {
            if(uniqOS[i] === OS[j])
            {
                c++;
            }
        }
        OsSeries.push(c);
    }

    //Stack_Name
    const Stack = [];
    const StackSeries=[];
    for(let i=0;i<Data.length;i++)
    {
        Stack.push(Data[i].StackName)
    }
    let uniqStack= Array.from(new Set(Stack));
    var c=0;
    for(let i=0;i<uniqStack.length;i++)
    {
        c=0;
        for(let j=0;j<Stack.length;j++)
        {
            if(uniqStack[i] === Stack[j])
            {
                c++;
            }
        }
        StackSeries.push(c);
    }



    //VM/Physical
    const type = [];
    const typeSeries=[];
    for(let i=0;i<Data.length;i++)
    {
        type.push(Data[i].VM_Physical);
    }
    let uniqType= Array.from(new Set(type));
    var c=0;
    for(let i=0;i<uniqType.length;i++)
    {
        c=0;
        for(let j=0;j<type.length;j++)
        {
            if(uniqType[i] === type[j])
            {
                c++;
            }
        }
        typeSeries.push(c);
    }

    //Tag_Application_Instance
    const appInstance = [];
    const appSeries = [];
    for(let i=0;i<Data.length;i++)
    {
        appInstance.push(Data[i].Tag_Application_Instance);
    }
    let uniqAppInstance= Array.from(new Set(appInstance));
    var c=0;
    for(let i=0;i<uniqAppInstance.length;i++)
    {
        c=0;
        for(let j=0;j<appInstance.length;j++)
        {
            if(uniqAppInstance[i] === appInstance[j])
            {
                c++;
            }
        }
        appSeries.push(c);
    }

    //Tag_rscore
    const rscore = [];
    const rscoreSeries = [];
    for(let i=0;i<Data.length;i++)
    {
        rscore.push(Data[i].Tag_rscore);
    }
    let uniqRscore= Array.from(new Set(rscore));
    var c=0;
    for(let i=0;i<uniqRscore.length;i++)
    {
        c=0;
        for(let j=0;j<rscore.length;j++)
        {
            if(uniqRscore[i] === rscore[j])
            {
                c++;
            }
        }
        rscoreSeries.push(c);
    }
    
    //Tag_Tier web database both
    const Tier = [];
    const TierSeries = [];
    for(let i=0;i<Data.length;i++)
    {
        Tier.push(Data[i].Tag_Tier);
    }
    let uniqTier= Array.from(new Set(Tier));
    var c=0;
    for(let i=0;i<uniqTier.length;i++)
    {
        c=0;
        for(let j=0;j<Tier.length;j++)
        {
            if(uniqTier[i] === Tier[j])
            {
                c++;
            }
        }
        TierSeries.push(c);
    }


    function pchart(uniqarr, arrSeries)
    {
        return <Chart
            style={{ paddingLeft: "10px", width: "50%", marginTop: "10px"}}
            type="pie"
            width={500}
            height={300}
    
            series= {arrSeries}

            options={{
                noData: {text:"Empty Data"},
                labels:uniqarr
            }}
            >
        </Chart>
    }

    const columns = [
        {
          title: "asset_id",
          dataIndex: "asset_id",
          key: "asset_id",
          render: (asset_id) => <>{asset_id && asset_id? asset_id : "N/A"}</>,
          width: 60,
          fixed: "left",
        },
        {
          title: "Hostname",
          dataIndex: "Hostname",
          key: "Hostname",
          render: (Hostname) => <>{Hostname && Hostname? Hostname : "N/A"}</>,
          width: 60,
        },
        {
          title: "Total_Size",
          dataIndex: "Total_Size",
          key: "Total_Size",
          render: (Total_Size) => <>{Total_Size && Total_Size? Total_Size : "N/A"}</>,
          width: 60,
        },
        {
          title: "Disk_Free",
          dataIndex: "Disk_Free",
          key: "Disk_Free",
          render: (Disk_Free) => <>{Disk_Free && Disk_Free? Disk_Free : "N/A"}</>,
          width: 60,
        },
        {
          title: "CPU_count",
          dataIndex: "CPU_count",
          key: "CPU_count",
          render: (CPU_count) => <>{CPU_count && CPU_count? CPU_count : "N/A"}</>,
          width: 60,
        }
    ]

    const loadCloudReport = async() =>{
        const response = await fetch("http://localhost:3000/fetch");
        const data = await response.json().catch((e) => {
          console.warn("invalid json res : ", e);
          return null;
        });
        setCloudData(data)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    useEffect(()=> {
        loadCloudReport();
    },[])
    

    return (<div className="cio-overview" style={{marginLeft: "20%"}}>
        <h2 style={{textAlign:'center'}}>CIO Dashboard Overview Report</h2>

        <div className="btn-right" style={{display: "flex",justifyContent: "flex-end"}}>
        <Button
          type="primary"
          name="report"
          onClick={handlePrint}
        >
          Download Report
        </Button>
        </div>

        <div className="main-dash" ref = {componentRef}>
<div className="total-device" style={{}}>
  <div className="device-by-os tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Count of Devices by OS</h3>
        <div>{pchart(uniqOS, OsSeries)}</div>
  </div>
  <div className="total-size tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Total Size and Disk Free</h3>
        <div className="table_container1" style={{width: "100%"}}>
            <Table
            rowKey={Data.Hostname}
            columns={columns}
            dataSource={Data}
            scroll={{
            x: 800,
            y: 480,
            }}
        />
        </div>
  </div>
</div>

<div className="device_cat_1" style={{}}>
  <div className="device-by-serverrole tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Count of Devices by ServerRole</h3>
        <div>{pchart(uniqServer, RoleSeries)}</div>
  </div>
  <div className="device-by-loc tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Count of Devices by Location</h3>
  <div>{pchart(uniqloc, locSeries)}</div>
  </div>
</div>

<div className="device_cat_2" style={{}}>
  <div className="device-by-stack tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Count of Devices by Stack</h3>
  <div>{pchart(uniqStack, StackSeries)}</div>
  </div>
  <div className="device-by-type tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Count of Devices by Type</h3>
  <div>{pchart(uniqType, typeSeries)}</div>
  </div>
</div>

<div className="device_cat_2" style={{}}>
  <div className="device-by-stack tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Application Instance</h3>
  <div>{pchart(uniqAppInstance, appSeries)}</div>
  </div>
  <div className="device-by-type tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Rscore</h3>
  <div>{pchart(uniqRscore, rscoreSeries)}</div>
  </div>
</div>

<div className="device_cat_2" style={{}}>
  <div className="device-by-stack tile-shadow" style={{width: "50%", border: '2px solid rgb(0, 68, 102)'}}>
  <h3>Tag_Tier</h3>
  <div>{pchart(uniqTier, TierSeries)}</div>
  </div>
</div>
</div>
</div>
    )
}