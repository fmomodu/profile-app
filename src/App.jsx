import { lazy, Suspense } from 'react'
import { ModeProvider } from './context/ModeContext'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

const ProfileLayout = lazy(() => import('./pages/ProfileLayout'))
const ProfileDetails = lazy(() => import('./pages/ProfileDetails'))
const AddProfile = lazy(() => import('./pages/AddProfile'))
const About = lazy(() => import('./pages/About'))
const OtherProfiles = lazy(() => import('./pages/OtherProfiles'))
const NotFound = lazy(() => import('./pages/NotFound'))

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


        <Suspense fallback={<p>Loading...</p>}>

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

          
        </Suspense>

      </ModeProvider>
    </HashRouter>
  )
}

export default App