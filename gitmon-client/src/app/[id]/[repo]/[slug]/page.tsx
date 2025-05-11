import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, MessageSquare } from 'lucide-react'
import { formatDate, replaceId } from '@lib/utils'
import { Separator } from '@components/ui/separator'
import { CommentSection } from './CommentSection'
import { fetchPost, getFileURL } from '@lib/github'
import MarkdownRenderer from '@components/MarkdownRenderer'
import { ShareButton } from '@components/ShareButton'
import { LikeButton } from '@components/LikeButton'

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; id: string; repo: string }>
}) {
  const { slug, id, repo } = await params
  const fileURL = await getFileURL({ id: replaceId(id), repo }, `${slug}.md`)
  const post = await fetchPost(fileURL)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <Link
        href={`/@${replaceId(id)}/${repo}`}
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
                {post.createdAt ? formatDate(post.createdAt) : 'Unknown date'}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{'3'} comments</span>
            </div>
          </div>
        </header>

        <Image
          src={post.coverImage || '/placeholder.svg'}
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
          <div className="flex items-center gap-4">
            <LikeButton postSlug={slug} initialLikes={0} />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Share this post:</span>
            <ShareButton path={`/@${post.author}/${post.repo}/${post.slug}`} />
          </div>
        </div>

        <Separator className="my-8" />

        <CommentSection postSlug={slug} />
      </div>
    </article>
  )
}
