import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import MarkdownRenderer from '@components/MarkdownRenderer';
import { Button } from '@components/ui/button';

import type { Post } from './types';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAddPostClick = () => {
    navigate(`/blog/${id}/posts/add`);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <MarkdownRenderer markdown={'### Posts'} />
        {/* 해당 기능은 아마 auth에 의해 노출이 조작되어야 것임 */}
        <Button onClick={handleAddPostClick}>Add Post</Button>
      </div>
      {posts.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </div>
  );
};

const PostListItem: React.FC<{ post: Post }> = ({ post }) => {
  const { id, createdAt, title } = post;
  return (
    <Link
      to={`posts/${id}`}
      className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded mb-4"
    >
      <div className="text-gray-500 text-sm">{createdAt}</div>
      <div className="border-l-2 border-gray-500 pl-4">
        <span className="text-lg">{title}</span>
        {post?.pinned && (
          <span className="ml-2 text-blue-500">📌</span> // 핀 아이콘
        )}
      </div>
    </Link>
  );
};

export default PostList;
