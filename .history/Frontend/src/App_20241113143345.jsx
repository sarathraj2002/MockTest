import { useState } from 'react'
import './App.css'
import Otp from './components/Otp'
import { Home } from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Mail onEmailSubmit={handleEmailSubmit}/>}></Route>
      <Route path='/check' element={<Mail/>}></Route>  
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default App
