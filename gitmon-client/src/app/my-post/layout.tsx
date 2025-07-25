import { ReactNode } from 'react'

export default async function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <main className="p-12">{children}</main>
    </div>
  )
}
