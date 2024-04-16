import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Psyc from './components/Psyc';
import { useState } from 'react';

function App() {
  const [patientData,setPatientData] = useState([]);
const router = createBrowserRouter([
  
  {
    path:"/psyc",
    element: <Psyc patientData = {patientData} />
  },
  {
    path: "/",
    element: <ChatRoom setPatientData = {setPatientData}/>,
  }
  ,
]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
