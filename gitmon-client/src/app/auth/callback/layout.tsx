import { ReactNode, Suspense } from 'react'

export default async function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-1 mr-96 ml-24">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  )
}
