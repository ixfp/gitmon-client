type Post = {
  title: string;
  createdAt: string;
  pinned?: boolean;
};

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h3>Posts</h3>
      {posts.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </div>
  );
};

const PostListItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-gray-500 text-sm">{post.createdAt}</div>
      <div className="border-l-2 border-gray-500 pl-4">
        <span className="text-lg">{post.title}</span>
        {post.pinned && (
          <span className="ml-2 text-blue-500">📌</span> // 핀 아이콘
        )}
      </div>
    </div>
  );
};

export default PostList;
