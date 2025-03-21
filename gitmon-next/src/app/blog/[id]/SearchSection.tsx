"use client";

import { useState } from "react";
import { Input } from "@components/ui/input";
import { blogPosts } from "@lib/data";
import { cn } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { PostListItem } from "@components/Post";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = searchTerm
    ? blogPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-8 ">
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          filteredPosts.length === 0 ? "hidden" : ""
        )}
      >
        {filteredPosts.map((post) => (
          <PostListItem key={post.slug} post={post} variant="compact" />
        ))}
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          filteredPosts.length === 0 ? "" : "hidden"
        )}
      >
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-500 size-2 p-0 rounded-full" />
          <span className="text-lg font-semibold">
            {"What We're Reading Today"}
          </span>
        </div>
        {blogPosts.map((post) => (
          <PostListItem key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </div>
  );
};

export default SearchSection;
