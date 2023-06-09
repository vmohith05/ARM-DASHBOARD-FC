import { useState } from "react";
import { Space, Table, Tag } from "antd";
import ModalPopUpBuilder from "../components/ModalPopUpBuilder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ArmForm from "./ArmForm";
import CustomModalForm from "./CustomModalForm";
import convertBytes from "../utils/memoryConverter";
import jsonConverter from "../utils/DataToJson";

const TableBuiilder = ({ assetData }) => {
  const [selectedDeviceId, setSelectedDeviceID] = useState("");
  const [IsOpen, setModalShow] = useState(false);

  const handleDownLoad = (id) => {
    console.log(`device id selected ${JSON.stringify(id)}`);
    const filterData = assetData.filter((data) => data.deviceid === id);

    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    jsonConverter(filterData, `${id}_assetDetail_${time}`);
  };
  const columns = [
    {
      title: "DeviceId",
      dataIndex: "deviceid",
      key: "deviceid",
      render: (id) => (
        <Popup trigger={<a>{id}</a>} position="center">
          <CustomModalForm selectedID={id} />
        </Popup>
      ),
      fixed: "left",
      width: 150,
      sorter: true,
    },

    {
      title: "Hostname",
      dataIndex: "data",
      key: "data",
      render: (data) => <>{data && data.hostname ? data.hostname : "N/A"}</>,
      width: 130,
      fixed: "left",
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
      title: "Licensed",
      dataIndex: "licensed",
      key: "licensed",
      width: 100,
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
      title: "Device Type",
      dataIndex: "data",
      key: "data",
      render: (data) => (
        <>{data && data.devicetype ? data.devicetype : "N/A"}</>
      ),
      width: 110,
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
      title: "Dist Full",
      dataIndex: "data",
      key: "data",
      render: (data) => <>{data && data.dist_full ? data.dist_full : "N/A"}</>,
      width: 150,
    },

    {
      title: "Identifying IP",
      dataIndex: "data",
      key: "data",
      render: (data) => (
        <>{data && data.identifying_ip ? data.identifying_ip : "N/A"}</>
      ),
      width: 150,
    },


    {
      title: "Stack",
      dataIndex: "stacks",
      key: "stacks",
      render: (stacks) => <span>{stacks && stacks[0].stack_name}</span>,
      width: 80,
    },

    {
      title: "CPU Inventroy",
      dataIndex: "inventroy_cpu_hz",
      key: "inventroy_cpu_hz",
      render: (data) => <span>{convertBytes(data)}</span>,
      width: 130,
    },

    {
      title: "Inventory Instance cost hour",
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
      width: 200,
    },

    {
      title: "Inventory Instance name",
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
      width: 180,
    },

    {
      title: "Inventory Instance class",
      dataIndex: "inventory_instance_class",
      key: "inventory_instance_class",
      render: (data) => (
        <p>
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
      width: 180,
    },

    {
      title: "Inventory network_io_cost_hour",
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
      title: "Inventory storage_cost_hour",
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
      width: 200,
    },

    {
      title: "Inventory total_cost_hour",
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
      width: 180,
    },

    {
      title: "CPU Usage",
      dataIndex: "usage_cpu_hz",
      key: "usage_cpu_hz",
      render: (data) => <span>{convertBytes(data)}</span>,
      width: 100,
    },

    {
      title: "Usage Instance cost hour",
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
      width: 180,
    },

    {
      title: "Usage Instance name",
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
      width: 150,
    },

    {
      title: "Usage Instance class",
      dataIndex: "usage_instance_class",
      key: "usage_instance_class",
      render: (data) => (
        <p>
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
      width: 150,
    },

    {
      title: "Usage network_io_cost_hour",
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
      width: 190,
    },

    {
      title: "Usage storage_cost_hour",
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
      width: 180,
    },

    {
      title: "Usage total_cost_hour",
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
      width: 180,
    },

    {
      title: "Memory",
      dataIndex: "data",
      key: "data",
      render: (data) => (
        <>{data && data.memory ? convertBytes(data.memory) : "N/A"}</>
      ),
      width: 120,
    },

    {
      title: "Location Name",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <span>
          {location && location[0].location_name
            ? location[0].location_name
            : "N/A"}
        </span>
      ),
      width: 130,
    },

    {
      title: "Storage Size",
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
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <span style={{ color: "green" }}>
          {tags && tags[0].tagvalue ? tags[0].tagvalue : "N/A"}
        </span>
      ),
      width: 60,
    },

    {
      title: "Action",
      dataIndex: "deviceid",
      key: "deviceid",
      render: (id) => <a onClick={() => handleDownLoad(id)}>Download</a>,
      fixed: "right",
      width: 80,
    },

    //   {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     // render: (_, { tags }) => (
    //     //   <>
    //     //     {tags.map((tag) => {
    //     //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //     //       if (tag === 'loser') {
    //     //         color = 'volcano';
    //     //       }
    //     //       return (
    //     //         <Tag color={color} key={tag}>
    //     //           {tag.toUpperCase()}
    //     //         </Tag>
    //     //       );
    //     //     })}
    //     //   </>
    //     // ),
    //   },
    //   {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //       <Space size="middle">
    //         <a>Invite {record.deviceid}</a>
    //         <a>Delete</a>
    //       </Space>
    //     ),
    //   },
  ];

  const handleRowClick = (deviceID) => {
    console.log(`=================> inside selected row handler ${deviceID}`);
    event.stopPropagation();
    setSelec;
  };

  const handleOpenModal = () => {
    setModalShow(true);
  };

  return (
    <div className="table_container">
      <Table
        rowKey={assetData.deviceid}
        columns={columns}
        dataSource={assetData}
        scroll={{
          x: 1500,
          y: 380,
        }}
      />
    </div>
  );
};

export default TableBuiilder;
