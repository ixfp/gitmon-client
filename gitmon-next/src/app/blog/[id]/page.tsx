import { PostList } from "@components/Post";
import { fetchPosts } from "@lib/fetchGithub";

async function BlogMain({ params }: { params: Promise<{ id: string }> }) {
  const posts = await fetchPosts((await params).id);
  return (
    <div className="container mx-auto flex gap-8 h-full">
      <div className="px-4 py-12 h-full overflow-auto">
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default BlogMain;
