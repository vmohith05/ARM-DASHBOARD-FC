import ArmDashboard from '../ArmDashboard';
import {NavLink, Link } from 'react-router-dom';
import DeviceTableBuilder from "./CIO_Dashboard";
import Cloud_Discovery_Report from "./CIO_CloudDiscovery";
import mainLogo from "../azureIcon.png";

const Header = () => {


    return(
        <div className="cloud-header">
                    <div className='header-left'
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            //backgroundColor: "#f2f2f2",
          }}
        >
          <img
            style={{ width: "50px", height: "50px" }}
            src={mainLogo}
            alt="fireSpot"
          />
          <h3 style={{ color: "orange" }}>Optum Cloud Readiness</h3>
          {/* <Button className="Device_details"
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
              >CIO_Cloud_Discovery</Button> */}




        </div>

        <div className='heder-right'>
        <ul className='nav-link' style={{display:'flex'}}>
            <li>
                <NavLink to = '/migration' >CIO_Recommendations_Report</NavLink>
            </li>
            <li>
                <NavLink to = '/' >CIO_Dashboard_Report</NavLink>
            </li>
            <li>
                <NavLink to = '/alldetail' >CIO_Dashboard</NavLink>
            </li>
            <li>
                <NavLink to = '/flexera-risc' >Flexera</NavLink>
            </li>
          </ul>
        </div>
        </div>
    )
}

export default Header;