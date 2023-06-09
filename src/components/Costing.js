import React ,{ useState, useEffect} from "react";
import Chart from "react-apexcharts";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";
import SizeContext from "antd/es/config-provider/SizeContext";
import { Space, Table, Tag, Input, Button} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas   from 'html2canvas';
import jsPDF from 'jspdf';

export default function Cloud_R(assetData, tag, ref)
{
    console.log("Costing");
    //table for Display Hostname / Stack Name / instance_name / instance_cost_hour / instance_specialization /
    //network_io_cost_hour/ {network_io_in_bytes_per_sec_avg/ network_io_out_bytes_per_sec_avg/ storage_bytes/
    //storage_cost_hour/ storage_io_cost_hour/ storage_io_hour_avg/ total_cost_hour in table 

    {/*inventory_instance_specialization : inventoryArr[i].instance_specialization,

          usage_instance_specialization : usageArr[i].instance_specialization,

          inventory_network_io_in_bytes_per_sec_avg : inventoryArr[i].network_io_in_bytes_per_sec_avg,

          usage_network_io_in_bytes_per_sec_avg : usageArr.network_io_in_bytes_per_sec_avg,

          inventory_network_io_out_bytes_per_sec_avg : inventoryArr.network_io_out_bytes_per_sec_avg,

          usage_network_io_out_bytes_per_sec_avg : usageArr[i].network_io_out_bytes_per_sec_avg,

          inventory_storage_bytes : inventoryArr[i].storage_bytes,

          usage_storage_bytes : usageArr[i].storage_bytes,

          inventory_storage_cost_hour : inventoryArr.storage_cost_hour,

          usage_storage_cost_hour : usageArr[i].storage_cost_hour,

          inventory_storage_io_cost_hour : inventoryArr[i].storage_io_cost_hour,

          usage_storage_io_cost_hour : usageArr[i].storage_io_cost_hour,

          inventory_storage_io_hour_avg : inventoryArr[i].storage_io_hour_avg,

usage_storage_io_hour_avg : usageArr[i].storage_io_hour_avg*/}


    const columns1 = [
        {
            title: "Hostname",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hostname ? data.hostname : "N/A"}</>,
            width: 130,
            //fixed: "left",
        },
        {
            title: "StackName",
            dataIndex: "stacks",
            key: "stacks",
            render: (stacks) => (
              <>{stacks && stacks[0].stack_name ? stacks[0].stack_name : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
        },
        {
            title: "Inventory_Instance_name",
            dataIndex: "inventory_instance_name",
            key: "inventory_instance_name",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                ></span>
                {data}
              </p>
            ),
            width: 220,
          },
      
          {
            title: "Inventroy_Instance_cost_hour",
            dataIndex: "inventroy_instance_cost_hour",
            key: "inventroy_instance_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                {data && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "black",
                      fontWeight: 400,
                      position: "relative",
                      bottom: "5px",
                      right: "2px",
                    }}
                  >
                    $
                  </span>
                )}
                {data}
              </p>
            ),
            width: 220,
          },


          {
            title: "inventory_instance_specialization",
            dataIndex: "inventory_instance_specialization",
            key: "inventory_instance_specialization",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                {data && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "black",
                      fontWeight: 400,
                      position: "relative",
                      bottom: "5px",
                      right: "2px",
                    }}
                  >
                
                  </span>
                )}
                {data}
              </p>
            ),
            width: 250,
          },
      
          {
            title: "Inventory_network_io_cost_hour",
            dataIndex: "inventory_network_io_cost_hour",
            key: "inventory_network_io_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },

          {
            title: "Inventory_network_io_in_bytes_per_sec_avg",
            dataIndex: "inventory_network_io_in_bytes_per_sec_avg",
            key: "inventory_network_io_in_bytes_per_sec_avg",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 290,
          },

          //
          {
            title: "Inventory_network_io_out_bytes_per_sec_avg",
            dataIndex: "inventory_network_io_out_bytes_per_sec_avg",
            key: "inventory_network_io_out_bytes_per_sec_avg",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 290,
          },

          
          {
            title: "Inventory_storage_bytes",
            dataIndex: "inventory_storage_bytes",
            key: "inventory_storage_bytes",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },

          {
            title: "Inventory_storage_cost_hour",
            dataIndex: "inventory_storage_cost_hour",
            key: "inventory_storage_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },


          //
      
          {
            title: "Inventory_storage_io_hour_avg",
            dataIndex: "inventory_storage_io_hour_avg",
            key: "inventory_storage_io_hour_avg",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },

          {
            title: "Inventory_storage_io_cost_hour",
            dataIndex: "Inventory_storage_io_cost_hour",
            key: "Inventory_storage_io_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },
      
          {
            title: "Inventory_total_cost_hour",
            dataIndex: "inventory_total_cost_hour",
            key: "inventory_total_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 220,
          },
    ]


    const columns2 = [
        {
            title: "Hostname",
            dataIndex: "data",
            key: "data",
            render: (data) => <>{data && data.hostname ? data.hostname : "N/A"}</>,
            width: 130,
            //fixed: "left",
        },
        {
            title: "Stack_Name",
            dataIndex: "stacks",
            key: "stacks",
            render: (stacks) => (
              <>{stacks && stacks[0].stack_name ? stacks[0].stack_name : "N/A"}</>
            ),
            width: 130,
            // fixed: "left",
        },
          {
            title: "Usage_Instance_name",
            dataIndex: "usage_instance_name",
            key: "usage_instance_name",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                ></span>
                {data}
              </p>
              
            ),
            width: 190,
          },
      
          {
            title: "Usage_Instance_cost_hour",
            dataIndex: "usage_instance_cost_hour",
            key: "usage_instance_cost_hour",
            render: (data) => (
              <>
                {data ? (
                  <p style={{ color: "black", fontWeight: "600" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 400,
                        position: "relative",
                        bottom: "5px",
                        right: "2px",
                      }}
                    >
                      $
                    </span>
                    {data}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </>
            ),
            width: 200,
          },

          
          //
          {
            title: "Usage_instance_specialization",
            dataIndex: "usage_instance_specialization",
            key: "usage_instance_specialization",
            render: (data) => (
              <>
                {data ? (
                  <p style={{ color: "black", fontWeight: "600" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 400,
                        position: "relative",
                        bottom: "5px",
                        right: "2px",
                      }}
                    >
                      $
                    </span>
                    {data}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </>
            ),
            width: 220,
          },

          {
            title: "usage_network_io_in_bytes_per_sec_avg",
            dataIndex: "usage_network_io_in_bytes_per_sec_avg",
            key: "uusage_network_io_in_bytes_per_sec_avg",
            render: (data) => (
              <>
                {data ? (
                  <p style={{ color: "black", fontWeight: "600" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 400,
                        position: "relative",
                        bottom: "5px",
                        right: "2px",
                      }}
                    >
                      $
                    </span>
                    {data}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </>
            ),
            width: 260,
          },

          {
            title: "usage_network_io_out_bytes_per_sec_avg",
            dataIndex: "usage_network_io_out_bytes_per_sec_avg",
            key: "usage_network_io_out_bytes_per_sec_avg",
            render: (data) => (
              <>
                {data ? (
                  <p style={{ color: "black", fontWeight: "600" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 400,
                        position: "relative",
                        bottom: "5px",
                        right: "2px",
                      }}
                    >
                      $
                    </span>
                    {data}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </>
            ),
            width: 260,
          },


          {
            title: "Usage_network_io_cost_hour",
            dataIndex: "usage_network_io_cost_hour",
            key: "usage_network_io_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 250,
          },
      

          {
            title: "usage_storage_bytes",
            dataIndex: "usage_storage_bytes",
            key: "usage_storage_bytes",
            render: (data) => (
              <>
                {data ? (
                  <p style={{ color: "black", fontWeight: "600" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "black",
                        fontWeight: 400,
                        position: "relative",
                        bottom: "5px",
                        right: "2px",
                      }}
                    >
                      $
                    </span>
                    {data}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
              </>
            ),
            width: 220,
          },


          {
            title: "Usage_storage_cost_hour",
            dataIndex: "usage_storage_cost_hour",
            key: "usage_storage_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 200,
          },

          {
            title: "usage_storage_io_cost_hour",
            dataIndex: "usage_storage_io_cost_hour",
            key: "usage_storage_io_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 200,
          },
      
          {
            title: "Usage_total_cost_hour",
            dataIndex: "usage_total_cost_hour",
            key: "usage_total_cost_hour",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 200,
          },

          {
            title: "usage_storage_io_hour_avg",
            dataIndex: "usage_storage_io_hour_avg",
            key: "usage_storage_io_hour_avg",
            render: (data) => (
              <p style={{ color: "black", fontWeight: "600" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "black",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "5px",
                    right: "2px",
                  }}
                >
                  {" "}
                  $
                </span>
                {data}
              </p>
            ),
            width: 200,
          },
    ]


    const devices = [];
    const hosts = [];
    const inventory_hour_cost = [];
    const inventory_1_year_cost = [];
    const inventory_3_year_cost = [];
    for (let i=0;i<assetData.length;i++)
    {
        hosts.push(assetData[i].data.hostname)
        devices.push(assetData[i].deviceid);
        inventory_hour_cost.push(assetData[i].inventory_total_cost_hour);
        inventory_1_year_cost.push((assetData[i].inventory_total_cost_hour)*24*365);
        inventory_3_year_cost.push((assetData[i].inventory_total_cost_hour)*24*365*3);
    }

    const usage_hour_cost = [];
    const usage_1_year_cost = [];
    const usage_3_year_cost = [];
    for (let i=0;i<assetData.length;i++)
    {
        devices.push(assetData[i].deviceid);
        usage_hour_cost.push(assetData[i].usage_total_cost_hour);
        usage_1_year_cost.push((assetData[i].usage_total_cost_hour)*24*365);
        usage_3_year_cost.push((assetData[i].usage_total_cost_hour)*24*365*3);
    }

    const tags=[];
    const tagSeries=[];
    for(let i=0; i<assetData.length;i++)
    {
      for(let j=0;j<assetData[i].tags.length;j++)
      {
        if(assetData[i].tags[j].tagid == 11)
        {
          tags.push(assetData[i].tags[j].tagvalue);
        }
      }
    }
    let uniqtag= ['Rehost', 'Replatform','Lift and Shift','Reconfigure'];
    //loop
    var c=0;
    for(let i=0;i<uniqtag.length;i++)
    {
        c=0;
        for(let j=0;j<tags.length;j++)
        {
            if(uniqtag[i] === tags[j])
            {
                c++;
            }
        }
        tagSeries.push(c);
    }
    console.log("tags", tags);
    console.log(tagSeries)

    function LineGraph(value1,value2,devices,text)
    {
        return <div>
            <h2>{`Inventory and Usage pricing per ${text}`}</h2>
            <Chart
            type='line'
            width={900}
            height={400}
            series={
                [
                    {
                        name: "Inventory cost",
                        data: value1
                    },
                    {
                        name: "Usage cost",
                        data: value2
                    },
                ]
            }
            options={{
                title:{
                    text:`pricing for ${text}`,
                    style:{ fontSize:30}
                },
            
            xaxis:{
                categories: devices,
                title:{
                text: `Devices in a Stack ${assetData[0].stacks[0].stack_name}`
                }
            },
            yaxis:{
                title:{
                text: `units in $_Dollers`
                }
            }
            }}
            >

            </Chart>
            </div>
    }



    function bgraph1(value1,value2,value3,value4)
    {
        return <Chart
        type="bar"
        width={800}
        height={500}

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
                style:{ fontSize:30}
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

    const time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

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
          doc.save(`${data}_infraCosting.pdf`)
      })
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
                text:"Rscore",
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


    const inventory_storage_cost_hour=[];
    const usage_storage_cost_hour=[];
    for (let i=0; i<assetData.length;i++)
    {
      inventory_storage_cost_hour.push(assetData[i].inventory_storage_cost_hour);
      usage_storage_cost_hour.push(assetData[i].usage_storage_cost_hour);
    }

    const inventory_network_io_cost_hour=[];
    const usage_network_io_cost_hour=[];
    for (let i=0; i<assetData.length;i++)
    {
      inventory_network_io_cost_hour.push(assetData[i].inventory_network_io_cost_hour);
      usage_network_io_cost_hour.push(assetData[i].usage_network_io_cost_hour);
    }
    console.log(inventory_network_io_cost_hour+" "+usage_network_io_cost_hour);

    function bgraphStorage(value1,value2,value3,value4,text1,text2)
    {
        return <Chart
        type="bar"
        width={800}
        height={550}

        series={[
            {
                name: text1,
                data: value1,
                color: "rgb(0, 170, 255)"
            },
            {
              name: text2,
              data: value2,
              color: "rgb(255, 0, 102)"
          },
        ]}

        options={{
            title:{
                text:"",
                style:{ fontSize:30}
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
            text: `units in GB`
            }
        }
        }}
        >
        </Chart>
    }

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
            style={{border: '3px solid rgb(0, 68, 102)', paddingLeft: "10px", width: "45rem", marginTop: "10px", marginLeft: "14%"}}
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

    return <React.Fragment>
      <div ref = {ref} className="costing_sec" style={{marginTop: "5em",color: "#0047b3"}}>
      <div style={{marginLeft: "2%"}}>
               <div className="pdfBtn" style={{display:'flex'}}>
                <h1 style={{marginLeft: "30%"}}>Cloud Recommendations</h1>
        {/*<Button
                type="primary"
                style={{ marginLeft: "8px", marginTop: '1.8rem' }}
                name="report"
                onClick={handleDownLoadPdf}
              >
                Download Report
              </Button>*/}
        </div>

        <div className="table_container1" style={{marginTop: "10px", width: "1500px"}}>
        <h2>Cloud Recommendations for Inventory:</h2>
        <Table
            rowKey={assetData.deviceid}
            columns={columns1}
            dataSource={assetData}
            scroll={{
            x: 1000,
            }}
        />
        </div>
        <div className="table_container1" style={{marginTop: "100px", width: "1500px"}}>
        <h2>Cloud Recommendations for Usage:</h2>
        <Table
            rowKey={assetData.deviceid}
            columns={columns2}
            dataSource={assetData}
            scroll={{
            x: 1000,
            }}
        />
        </div>
        
        <div style={{marginTop:"340px"}}>{LineGraph(inventory_hour_cost, usage_hour_cost, hosts, "hour")}</div>
        <div>{LineGraph(inventory_1_year_cost, usage_1_year_cost, hosts, "1 year")}</div>
        <div>{LineGraph(inventory_3_year_cost, usage_3_year_cost, hosts, "3 years")}</div>

        {/*<div>{bgraphStorage(inventory_storage_cost_hour, usage_storage_cost_hour, devices,assetData, "Inventory Storage Cost", "Usage Storage Cost")}</div>*/}
        <h2 style={{marginTop: "300px"}}>Network Cost</h2>
        <div>{bgraphStorage(inventory_network_io_cost_hour, usage_network_io_cost_hour, hosts, assetData, "Inventory Network Cost", "Usage Network Cost")}</div>

        
        <div style={{marginTop:"50px", fontSize: "20px", borderRadius: "3px",}}>{`Time : ${time}`}</div>
        </div>

        </div>   
    </React.Fragment>
}