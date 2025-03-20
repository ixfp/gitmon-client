import IntroComponent from "@components/Intro";
import PostList from "@components/Post/PostList";

function BlogMain() {

  return (
    <>
      <IntroComponent />
      <div className="grid grid-cols-1 gap-8">
        <PostList />
      </div>
    </>
  );
}

export default BlogMain;
