'use client'

import React from "react";

import MarkdownRenderer from "@components/MarkdownRenderer";
import { Button } from "@components/ui/button";

import type { Post } from "./types";
import { redirect, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@hooks/temp/useDummyData";
import Loading from "@components/Loading";

const PostList: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: fetchPosts,
  });

  const handleAddPostClick = () => {
    redirect(`/blog/${id}/posts/add`);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <MarkdownRenderer markdown={"### Posts"} />
        {/* 해당 기능은 아마 auth에 의해 노출이 조작되어야 것임 */}
        <Button onClick={handleAddPostClick}>Add Post</Button>
      </div>
      {data.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </div>
  );
};

const PostListItem: React.FC<{ post: Post }> = ({ post }) => {
  const pathname = usePathname();
  const { id, createdAt, title } = post;
  return (
    <Link
      href={`${pathname}/posts/${id}`}
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
