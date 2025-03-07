"use client";

import IntroComponent from "@components/Intro";
import Loading from "@components/Loading";
import PostList from "@components/Post/PostList";
import { fetchPosts } from "@hooks/temp/useDummyData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function BlogMain() {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: fetchPosts,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <>
      <IntroComponent />
      <div className="grid grid-cols-1 gap-8">
        <PostList posts={data ?? []} id={id} />
      </div>
    </>
  );
}

export default BlogMain;
