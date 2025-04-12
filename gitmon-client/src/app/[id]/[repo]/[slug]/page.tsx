import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, LinkIcon, MessageSquare } from "lucide-react";
import { blogPosts } from "@lib/data";
import { formatDate, replaceId } from "@lib/utils";
import { Separator } from "@components/ui/separator";
import { CommentSection } from "./CommentSection";
import { fetchPost } from "@lib/github";
import { Button } from "@components/ui";
import MarkdownRenderer from "@components/MarkdownRenderer";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const post =
    (await fetchPost(replaceId(id))) ||
    blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <Link
        href={`/blog/@${replaceId(id)}`}
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
              <time dateTime={post.createdAt || new Date().toISOString()}>
                {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
              </time>
            </div>
            {/* <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {post.readingTime
                  ? `${post.readingTime} min read`
                  : "Unknown reading time"}
              </span>
            </div> */}
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
          <MarkdownRenderer markdown={post.content} />
        </div>

        <div className="mt-8 flex items-center justify-between">
          {/* <div className="flex items-center gap-4">
            <LikeButton postSlug={slug} initialLikes={post.likes || 0} />
          </div> */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Share this post:
            </span>
            <Button variant="link">
              <LinkIcon></LinkIcon>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <CommentSection postSlug={slug} />
      </div>
    </article>
  );
}
