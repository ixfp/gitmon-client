import Navbar from "@components/Navbar";
import { ReactNode } from "react";
import SearchSection from "./SearchSection";
import { replaceId } from "@lib/utils";

export default async function BlogLayout({
  params,
  children,
}: {
  params: Promise<{
    id: string;
    repo: string;
  }>;
  children: ReactNode;
}) {
  const { id } = await params;

  return (
    <div className="h-dvh bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar params={params} />
      <main className="flex-1 mr-96 ml-24">{children}</main>
      <aside className="fixed top-0 right-0 w-96 h-full p-4 border-l dark:border-gray-700">
        <SearchSection />
      </aside>
      <footer className="hidden p-4 border-t dark:border-gray-700">
        <p>© 2025 {replaceId(id)}</p>
      </footer>
    </div>
  );
}
