import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 — Page not found</h1>
      <p style={{ opacity: 0.6, marginBottom: '2rem' }}>This page doesn't exist.</p>
      <Link to="/">Back to store</Link>
    </div>
  )
}
