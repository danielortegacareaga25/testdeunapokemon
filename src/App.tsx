import { Navigation } from './routes/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigation />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
