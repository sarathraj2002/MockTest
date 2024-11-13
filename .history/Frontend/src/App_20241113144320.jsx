import { useState } from 'react'
import './App.css'
import Otp from './components/Otp'
import { Home } from './components/Home'
import { Route,Routes,useNavigate } from 'react-router-dom'


function App() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleEmailSubmit=(email)=>{
    setEmail(email);
    navigate('/check');
  }


  return (
    <>
    <Routes>
      <Route path='/' element={<Otp onEmailSubmit={handleEmailSubmit}/>}></Route>
      <Route path='/mail' element={<Mail/>}></Route>  
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default App
