import { Outlet, useParams } from "react-router-dom";

const BlogLayout = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold">{id}</h1>
      </header>
      <main className="p-8">
        <Outlet />
      </main>
      <footer className="p-4 border-t dark:border-gray-700">
        <p>© 2025 {id}</p>
      </footer>
    </div>
  );
};

export default BlogLayout;
