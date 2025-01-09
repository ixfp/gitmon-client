import MainLayout from "@layouts/BlogLayout";
import Post from "@components/Post";
import Loading from "@components/Loading";
import IntroComponent from "@components/Intro";
import { useDummyData } from "@hooks/temp/useDummyData";

function BlogMain() {
  const { data, isLoading, error } = useDummyData("dummyList");

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <MainLayout>
      <>
        <IntroComponent />
        <div className="grid grid-cols-1 gap-8">
          {data?.map((post: any) => (
            <Post key={post.id} title={post.title} content={post.createdAt} />
          ))}
        </div>
      </>
    </MainLayout>
  );
}

export default BlogMain;
