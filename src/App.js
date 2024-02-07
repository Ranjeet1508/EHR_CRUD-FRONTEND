import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import AddPatient from './Pages/AddPatient/AddPatient';
import Details from './Pages/Details';
import UpdatePatient from './Pages/UpdatePatient';

function App() {

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
