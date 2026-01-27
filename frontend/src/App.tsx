import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Meeting from './pages/Meeting'
import RoomSelection from './pages/RoomSelection'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Meeting />} />
        </Route>

        <Route path='/selection' element={<RoomSelection />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
