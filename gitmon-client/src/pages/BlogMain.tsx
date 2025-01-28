import IntroComponent from '@components/Intro';
import Loading from '@components/Loading';
import PostList from '@components/Post/PostList';
import { useDummyData } from '@hooks/temp/useDummyData';

function BlogMain() {
  const { data, isLoading, error } = useDummyData('dummyList');

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <>
      <IntroComponent />
      <div className="grid grid-cols-1 gap-8">
        <PostList posts={data} />
      </div>
    </>
  );
}

export default BlogMain;
