import MarkdownRenderer from "./MarkdownRenderer";
import type { Post } from "./types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <MarkdownRenderer markdown={`### Posts`} />
        <Button>Add Post</Button>
      </div>
      {posts.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </div>
  );
};

const PostListItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link
      to={`blog/${post.id}`}
      className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded mb-4"
    >
      <div className="text-gray-500 text-sm">{post.createdAt}</div>
      <div className="border-l-2 border-gray-500 pl-4">
        <span className="text-lg">{post.title}</span>
        {post?.pinned && (
          <span className="ml-2 text-blue-500">📌</span> // 핀 아이콘
        )}
      </div>
    </Link>
  );
};

export default PostList;
