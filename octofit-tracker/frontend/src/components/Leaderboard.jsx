import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('leaderboard', controller.signal).then(setEntries).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])
  return <section className="resource-page"><p className="eyebrow">THE DAILY CLIMB</p><h2>Leaderboard</h2>{error ? <p className="error-message">{error}</p> : entries.length ? <div className="data-grid">{entries.map((entry, index) => <article className="data-card rank-card" key={entry._id ?? entry.id}><span className="rank">{entry.rank ?? index + 1}</span><strong>{entry.userId?.name ?? entry.userId?.username ?? 'Athlete'}</strong><span>{entry.points ?? 0} pts</span></article>)}</div> : <p className="empty-state">The leaderboard is waiting for its first result.</p>}</section>
}

export default Leaderboard