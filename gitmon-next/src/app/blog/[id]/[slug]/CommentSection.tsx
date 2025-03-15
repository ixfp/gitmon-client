"use client";
import { useState, useEffect } from "react";
import type { Comment } from "@lib/types";
import { CommentList } from "@components/CommentList";

export const CommentSection = ({ postSlug }: { postSlug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchComments = async () => {
    //   const response = await fetch(`/api/posts/${params.slug}/comments`)
    //   const data = await response.json()
    //   setComments(data)
    // }
    // fetchComments()

    // For demo purposes, we'll use localStorage
    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${postSlug}`) || "[]"
    );
    setComments(storedComments);
  }, [postSlug]);
  return <CommentList postSlug={postSlug} initialComments={comments} />;
};
