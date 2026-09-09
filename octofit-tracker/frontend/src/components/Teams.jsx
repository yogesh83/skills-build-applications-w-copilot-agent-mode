import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('teams', controller.signal).then(setTeams).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])
  return <section className="resource-page"><p className="eyebrow">FIND YOUR PEOPLE</p><h2>Teams</h2>{error ? <p className="error-message">{error}</p> : teams.length ? <div className="data-grid">{teams.map((team) => <article className="data-card" key={team._id ?? team.id}><strong>{team.name}</strong><span>{team.members?.length ?? 0} members</span></article>)}</div> : <p className="empty-state">No teams have been created yet.</p>}</section>
}

export default Teams