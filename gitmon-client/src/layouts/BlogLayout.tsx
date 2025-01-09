export default function MainLayout({ children }: {children: JSX.Element}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold">My Blog</h1>
      </header>
      <main className="p-8">{children}</main>
      <footer className="p-4 border-t dark:border-gray-700">
        <p>© 2025 My Blog</p>
      </footer>
    </div>
  );
}
