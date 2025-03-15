import Navbar from "@components/Navbar";
import { ReactNode } from "react";

export default async function BlogLayout({
  params,
  children,
}: {
  params: Promise<{
    id: string;
  }>;
  children: ReactNode;
}) {
  const { id } = await params;
  const replacedId = id?.replace(/^%40/, "");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold">{replacedId}</h1>
        <Navbar />
      </header>
      <main className="p-8">{children}</main>
      <footer className="p-4 border-t dark:border-gray-700">
        <p>© 2025 {replacedId}</p>
      </footer>
    </div>
  );
}
