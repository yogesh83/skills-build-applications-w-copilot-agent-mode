import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(workoutsEndpoint, controller.signal, 'workouts').then(setWorkouts).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])
  return <section className="resource-page"><p className="eyebrow">YOUR NEXT SESSION</p><h2>Workouts</h2>{error ? <p className="error-message">{error}</p> : workouts.length ? <div className="data-grid">{workouts.map((workout) => <article className="data-card" key={workout._id ?? workout.id}><strong>{workout.name}</strong><span>{workout.difficulty} · {workout.durationMinutes} min</span><small>{workout.description}</small></article>)}</div> : <p className="empty-state">No workouts are available yet.</p>}</section>
}

export default Workouts