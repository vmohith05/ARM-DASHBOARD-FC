import React ,{ useState, useEffect} from "react";
import Chart from "react-apexcharts";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Space, Table, Tag, Input, Button} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas   from 'html2canvas';
import jsPDF from 'jspdf';
import { merge } from "antd/es/theme/util/statistic";

const Migration_Report = (assetData, ref) =>
{
    //Inventory instance name
    const instName =[];
    const instSeries=[];
    for(let i=0;i<assetData.length;i++)
    {
      instName.push(assetData[i].inventory_instance_name);
    }
    let instuniq= Array.from(new Set(instName));
    var c=0;
    for(let i=0;i<instuniq.length;i++)
    {
        c=0;
        for(let j=0;j<instName.length;j++)
        {
            if(instuniq[i] === instName[j])
            {
                c++;
            }
        }
        instSeries.push(c);
    }

    //Usage Instance name
    const UsageinstName =[];
    const UsageinstSeries=[];
    for(let i=0;i<assetData.length;i++)
    {
      UsageinstName.push(assetData[i].usage_instance_name);
    }
    let Usageinstuniq= Array.from(new Set(UsageinstName));
    var c=0;
    for(let i=0;i<Usageinstuniq.length;i++)
    {
        c=0;
        for(let j=0;j<UsageinstName.length;j++)
        {
            if(Usageinstuniq[i] === UsageinstName[j])
            {
                c++;
            }
        }
        UsageinstSeries.push(c);
    }
    
    function pchart(uniqarr, arrSeries)
    {
        return <Chart
            style={{border: '3px solid rgb(0, 68, 102)', paddingLeft: "10px", width: "30rem", marginTop: "10px", marginLeft: "14%"}}
            type="pie"
            width={450}
            height={250}

            series= {arrSeries}

            options={{
                noData: {text:"Empty Data"},
                labels:uniqarr
            }}
            >
        </Chart>
    }

    //Rscore
    //Rscore

    var rscore = [];

    var rscoreSeries = [];

    var merg="";

    for (let i=0;i<assetData.length;i++)

    {

        c=0;

        merg="";

        for (let j=0;j<assetData[i].tags.length;j++)

        {

            if( assetData[i].tags[j].tagkey === 'rscore')

            {

                merg = assetData[i].tags[j].tagvalue+""+merg;

            }

        }

        console.log(merg);

        if(merg === ''){merg="N/A"}

        rscore.push(merg);

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


    //Performance profile
    const performance=[];
    const performanceSeries=[];
    for(let i=0; i<assetData.length;i++)
    {
      for(let j=0;j<assetData[i].tags.length;j++)
      {
        if(assetData[i].tags[j].tagkey == "Performance Profile")
        {
            performance.push(assetData[i].tags[j].tagvalue);
        }
      }
    }
    let uniqPerformance = Array.from(new Set(performance));
    //loop
    for(let i=0;i<uniqPerformance.length;i++)
    {
        c=0;
        for(let j=0;j<performance.length;j++)
        {
            if(uniqPerformance[i] === performance[j])
            {
                c++;
            }
        }
        performanceSeries.push(c);
    }
    

    function bgraph1(value1,value2,value3)
    {
        return <Chart
        type="bar"
        width={800}
        height={550}

        series={[
            {
                name:"Rscore",
                data: value1,
                color: "rgb(0, 170, 255)"
            },
        ]}

        options={{
            title:{
                text:"",
                style:{ fontSize:30}
            },
            colors:['#f90000'],
        
        xaxis:{
            categories: value2,
            title:{
            text: `Devices in a Stack ${value3[0].stacks[0].stack_name}`
            }
        },
        yaxis:{
            title:{
            text: `no of devices`
            }
        }
        }}
        >
        </Chart>
    }
    //table

    return <div ref = {ref} className="Table-Container" style={{marginLeft: "3%"}}>  
            <h1 style={{color: "black", textAlign: "center"}}>Migration Details - {assetData[0].stacks[0].stack_name}</h1>
            <h3 style={{color: "#3399ff"}}>Cloud Migration Recommendations</h3>
            <p style={{fontSize:"20px"}}>Classification of servers based on different Cloud migration strategies such as Lift and Shift, Smart Shift, PaaS Shift which are suggested by
Cloud Readiness Tool based on the analysis.</p>
            <h3 style={{marginTop: "20px", color: "#004d99"}}>Inventory Instance Name</h3>
            <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Cloud Recommendation Tool recommends suitable VMs in Cloud, based on the Inventory Source Server configurations considering OS, RAM, CPU core, Storage and so on.</p>
            <div>{pchart(instuniq, instSeries)}</div>
            <h3 style={{marginTop: "20px", color: "#004d99"}}>Usage Instance Name</h3>
            <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Cloud Recommendation Tool recommends suitable VMs in Cloud, based on the Usage Source Server configurations considering OS, RAM, CPU core, Storage and so on.</p>
            <div>{pchart(Usageinstuniq, UsageinstSeries)}</div>
            <h3 style={{marginTop: "20px", color: "#004d99"}}>Rscore</h3>
            <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Cloud Recommendation Tool recommends suitable R-Lane strategies in Cloud, based on the migration strategies. </p>
            <div>{pchart(uniqRscore, rscoreSeries)}</div>
            <h3 style={{marginTop: "20px", color: "#004d99"}}>Performance Profile</h3>
            <p style={{marginTop:"30px", color: "black", fontSize: "20px"}}>Cloud Readiness Tool identified the storage requirements of your infrastructure and suggests suitable storage types available in Cloud by considering the disk utilization and IOPS/throughput requirements for workload components.</p>
            <div>{pchart(uniqPerformance, performanceSeries)}</div>
        </div>
      
    }
export default Migration_Report;