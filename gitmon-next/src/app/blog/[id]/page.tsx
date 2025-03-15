import BlogCard from "@components/BlogCard";
import IntroComponent from "@components/Intro";
import { blogPosts } from "@lib/data";
import SearchSection from "./SearchSection";

async function BlogMain() {
  return (
    <div className="container mx-auto flex gap-8 h-dvh">
      <div className="px-4 py-12 h-full overflow-auto">
        <IntroComponent />
        <PostsSection />
      </div>
      <div className="max-w-md overflow-auto">
        <SearchSection />
      </div>
    </div>
  );
}

const PostsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      {blogPosts?.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogMain;
