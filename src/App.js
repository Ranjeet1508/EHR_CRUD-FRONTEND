import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import AddPatient from './Pages/AddPatient/AddPatient';
import Details from './Pages/Details';
import UpdatePatient from './Pages/UpdatePatient';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const loadUser = async () => {
    try {
      let token = localStorage.getItem("token")
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`http://localhost:8080/ehrUser/me`, config);
      console.log(response.data);
      console.log('ranjeet');
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    if (window.performance.navigation.type === 1) {
      loadUser();
    }
    console.log(localStorage.getItem("token"));
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addPatient' element={<AddPatient />} />
        <Route path='/patient/:id' element={<Details />} />
        <Route path='/updatePatient/:id' element={<UpdatePatient />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
