import { ModeProvider } from './context/ModeContext'
import ProfileLayout from './pages/ProfileLayout'
import ProfileDetails from './pages/ProfileDetails'
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
      <ModeProvider>

      
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
        <Route path="/profiles" element={<ProfileLayout />}>
  <Route path=":id" element={<ProfileDetails />} />
</Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ModeProvider>
    </HashRouter>
  )
}

export default App