export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const handleLogin = () => {
    // window.location.href = 'http://localhost:4006/api/auth/login?redirect_uri=http://localhost:3000/auth/callback';
    window.location.href = 'http://localhost:4006/api/auth/login';
  }

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      {children}
    </>
  )
}