export function RouteError({ error }: { error?: any }) {
  return (
    <div style={{padding:'2rem',textAlign:'center'}}>
      <p>Something went wrong.</p>
      <p style={{opacity:0.6,fontSize:'0.875rem'}}>{error?.message}</p>
    </div>
  )
}
