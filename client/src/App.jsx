import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Welcome from './components/welcome/Welcome'
import Home from './pages/home/Home'
import Navbar from '../src/components/navbar/Navbar'

function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/navbar" element={<Navbar/>}/>
        </Routes>
       </BrowserRouter>
      
    </>
  )
}

export default App
