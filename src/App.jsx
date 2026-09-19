import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import VisualBlueprint from './pages/VisualBlueprint'
import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisualBlueprint />} />
        <Route path="/visual-blueprint" element={<VisualBlueprint />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
