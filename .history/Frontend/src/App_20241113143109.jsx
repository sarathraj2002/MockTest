import { useState } from 'react'
import './App.css'
import Otp from './components/Otp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Mail onEmailSubmit={handleEmailSubmit}/>}></Route>
      <Route path='/check' element={}></Route>  
      <Route path='/home'></Route>
    </Routes>
    </>
  )
}

export default App
