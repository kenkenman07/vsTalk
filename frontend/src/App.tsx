import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Meeting from './pages/Meeting'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Meeting />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App