import logo from './logo.svg';
import './App.css';
import ArmDashboard from './ArmDashboard';
import ArmForm from './components/ArmForm';
import { Routes ,Route } from 'react-router-dom';
import DeviceTableBuilder from "./components/CIO_Dashboard";
import Cloud_Discovery_Report from "./components/CIO_CloudDiscovery";
import  Header  from './components/Header';
import Cloud_Recommendation from "./components/CIO_Recommendation";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Cloud_Discovery_Report/>} />
        <Route path= '/alldetail' element = {<DeviceTableBuilder/>}/>
        <Route path= '/flexera-risc' element = {<ArmDashboard/>}/>
        <Route path= '/migration' element= {<Cloud_Recommendation/>}/>
      </Routes>
     {/* <ArmDashboard/> */}
     {/* <ArmForm/> */}
    </div>
  );
}

export default App;
