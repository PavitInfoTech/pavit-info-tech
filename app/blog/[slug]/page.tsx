import Link from "next/link"
import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBlogPost, blogPosts } from "@/lib/blog-data"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) return {}

  return {
    title: `${post.title} | PavitInfoTech Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <MainLayout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
          </div>

          <h1 className="text-5xl font-bold font-serif leading-tight">{post.title}</h1>

          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
            <div>
              <p className="font-semibold">{post.author}</p>
            </div>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <div className="text-foreground whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 py-6 border-t border-b border-border">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="text-sm text-muted-foreground bg-muted/50 hover:bg-muted px-3 py-1 rounded transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-serif mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="p-4 h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="mt-16 p-8 bg-accent/5 border-accent/20 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to optimize your IoT infrastructure?</h3>
          <p className="text-muted-foreground">
            Start your free trial today and experience intelligent device management
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </Card>
      </article>
    </MainLayout>
  )
}
