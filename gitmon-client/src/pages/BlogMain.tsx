import BlogLayout from "@layouts/BlogLayout";
import Post from "@components/Post";
import Loading from "@components/Loading";
import IntroComponent from "@components/Intro";
import { useDummyData } from "@hooks/temp/useDummyData";
import PostList from "@components/PostList";

function BlogMain() {
  const { data, isLoading, error } = useDummyData("dummyList");

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <BlogLayout>
      <IntroComponent />
      <div className="grid grid-cols-1 gap-8">
        <PostList posts={data} />
      </div>
    </BlogLayout>
  );
}

export default BlogMain;
