import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Meeting from './pages/Meeting'
import RoomSelection from './pages/RoomSelection'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
          <Route index element={<Meeting />} />
      </Routes>

        <Route path='/selection' element={<RoomSelection />} />

    </BrowserRouter>
  )
}

export default App
