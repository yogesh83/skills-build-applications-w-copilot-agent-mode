import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">OCTOFIT TRACKER</p>
            <h1>Train with purpose.</h1>
          </div>
          <nav aria-label="Primary navigation">
            {[
              ['/', 'Overview'],
              ['/activities', 'Activities'],
              ['/leaderboard', 'Leaderboard'],
              ['/teams', 'Teams'],
              ['/users', 'Users'],
              ['/workouts', 'Workouts'],
            ].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">YOUR TRAINING HQ</p>
      <h2>Small actions. Stronger momentum.</h2>
      <p className="overview-copy">
        Explore your activity, find your team, and keep the next workout within reach.
      </p>
      <div className="overview-links">
        <NavLink className="overview-link" to="/activities">Review activities <span>-&gt;</span></NavLink>
        <NavLink className="overview-link" to="/workouts">Choose a workout <span>-&gt;</span></NavLink>
      </div>
    </section>
  )
}

export default App
