import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Welcome from './components/welcome/Welcome'

function App() {
  

  return (
    <>
       <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
        </Routes>
       </BrowserRouter>
      
    </>
  )
}

export default App
