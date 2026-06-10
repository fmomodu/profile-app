import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddProfile from './pages/AddProfile'
import About from './pages/About'
import OtherProfiles from './pages/OtherProfiles'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-profile">Add Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/other-profiles">Other Profiles</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/other-profiles" element={<OtherProfiles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App