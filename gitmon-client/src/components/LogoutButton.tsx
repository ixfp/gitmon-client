'use client'

export const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        fetch('/api/logout', {
          method: 'POST',
        }).then(() => {
          window.location.href = '/'
        })
      }}
    >
      Logout
    </button>
  )
}
