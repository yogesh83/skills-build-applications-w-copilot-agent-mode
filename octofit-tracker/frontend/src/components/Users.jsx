import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('users', controller.signal).then(setUsers).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])
  return <section className="resource-page"><p className="eyebrow">THE COMMUNITY</p><h2>Users</h2>{error ? <p className="error-message">{error}</p> : users.length ? <div className="data-grid">{users.map((user) => <article className="data-card" key={user._id ?? user.id}><strong>{user.name}</strong><span>@{user.username}</span><small>{user.email}</small></article>)}</div> : <p className="empty-state">No users found.</p>}</section>
}

export default Users