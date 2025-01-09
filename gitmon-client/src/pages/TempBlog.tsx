import MainLayout from '@layouts/BlogLayout';
import Post from '@components/Post';

function TempBlog() {
  const posts = [
    { id: 1, title: '첫 번째 글', content: '이것은 첫 번째 글의 내용입니다.' },
    { id: 2, title: '두 번째 글', content: '이것은 두 번째 글의 내용입니다.' },
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} content={post.content} />
        ))}
      </div>
    </MainLayout>
  );
}

export default TempBlog;
