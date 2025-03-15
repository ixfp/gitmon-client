"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";

interface LikeButtonProps {
  postSlug: string;
  initialLikes?: number;
}

export function LikeButton({ postSlug, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has liked this post before
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLiked(likedPosts.includes(postSlug));
  }, [postSlug]);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // Optimistic UI update
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      // In a real app, this would be an API call
      // await fetch('/api/posts/${postSlug}/like', { method: 'POST' })

      // For demo purposes, we'll just use localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");

      if (newLikedState) {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify([...likedPosts, postSlug])
        );
      } else {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPosts.filter((id: string) => id !== postSlug))
        );
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      // Revert on error
      console.error("Failed to update like", error);
      setLiked(!newLikedState);
      setLikes((prev) => (newLikedState ? prev - 1 : prev + 1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-1 hover:bg-background",
        liked && "text-red-500 hover:text-red-600"
      )}
      onClick={handleLike}
      disabled={isLoading}
    >
      <Heart className={cn("h-5 w-5", liked && "fill-current")} />
      <span>{likes}</span>
    </Button>
  );
}
