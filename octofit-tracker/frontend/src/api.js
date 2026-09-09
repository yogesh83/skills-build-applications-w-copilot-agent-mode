const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/`
  : '/api/'

export function getApiUrl(resource) {
  return `${apiBaseUrl}${resource}/`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  for (const key of ['data', 'items', 'results', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }
  return []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(getApiUrl(resource), { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  return getCollection(await response.json())
}