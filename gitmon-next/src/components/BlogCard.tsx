import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRightIcon } from "lucide-react";
import { cn, formatDate } from "@lib/utils";
import type { BlogPost } from "@lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

export default function BlogCard({
  post,
  variant = "default",
}: {
  post: BlogPost;
  variant?: "default" | "compact";
}) {
  const blogUrl = `/blog/@${post.userId}/${post.slug}`;
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden",
        variant === "default"
          ? "rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          : ""
      )}
    >
      {variant === "default" && (
        <Link href={blogUrl} className="aspect-video overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="size-8">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Current User"
            />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <span>{post.userId}</span>
          {variant === "default" && (
            <>
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </>
          )}
        </div>
        <Link href={blogUrl} className="mt-3">
          <h2 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h2>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-muted-foreground">
          {post.excerpt}
        </p>
        {variant === "default" && (
          <Link
            href={blogUrl}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary"
          >
            Read more
            <ChevronRightIcon className="pt-0.5 text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
