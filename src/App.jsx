import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import './assets/css/fonts.css'
import './assets/css/style.css'

import HomePage from './pages/home.jsx'
import DetailPage from './pages/detail.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
