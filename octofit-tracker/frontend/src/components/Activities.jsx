import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(activitiesEndpoint, controller.signal, 'activities').then(setActivities).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="MOVEMENT LOG" title="Activities" error={error}>
    {activities.length ? <div className="data-grid">{activities.map((activity) => <article className="data-card" key={activity._id ?? activity.id}>
      <strong>{activity.type || 'Activity'}</strong><span>{activity.durationMinutes ?? 0} min</span>
      <small>{activity.points ?? 0} points · {formatDate(activity.recordedAt)}</small>
    </article>)}</div> : <EmptyState message="No activities recorded yet." />}
  </ResourcePage>
}

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : 'Date pending'
const ResourcePage = ({ eyebrow, title, error, children }) => <section className="resource-page"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{error ? <p className="error-message">{error}</p> : children}</section>
const EmptyState = ({ message }) => <p className="empty-state">{message}</p>

export default Activities