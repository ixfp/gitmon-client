import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MessageSquare } from "lucide-react";
import { blogPosts } from "@lib/data";
import { formatDate } from "@lib/utils";
import { LikeButton } from "@components/like-button";
import { Separator } from "@components/ui/separator";
import { CommentSection } from "./CommentSection";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <Link
        href={`/blog/@${post.userId}`}
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>

      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{"3"} comments</span>
            </div>
          </div>
        </header>

        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          width={1200}
          height={630}
          className="mb-8 aspect-video rounded-lg object-cover"
          priority
        />

        <div className="prose prose-lg mx-auto dark:prose-invert">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LikeButton postSlug={post.slug} initialLikes={post.likes || 0} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Share this post:
            </span>
            {/* Social share buttons would go here */}
          </div>
        </div>

        <Separator className="my-8" />

        <CommentSection postSlug={slug} />
      </div>
    </article>
  );
}
