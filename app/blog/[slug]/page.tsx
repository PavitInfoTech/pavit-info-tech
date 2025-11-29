import Link from "next/link";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import ShareWidget from "@/components/blog/share-widget";
import { MarkdownRenderer } from "./markdown-renderer";

// Helper to extract headings for table of contents (server-side)
function extractHeadings(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", ""));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | PavitInfoTech Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Calculate estimated reading progress markers
  const wordCount = post.content.split(/\s+/).length;
  const estimatedReadTime = Math.ceil(wordCount / 200);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className='relative min-h-[60vh] flex items-end overflow-hidden'>
        {/* Background gradient */}
        <div className='absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background' />

        {/* Abstract pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 w-full'>
          {/* Breadcrumb */}
          <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-8'>
            <Link href='/blog' className='hover:text-primary transition-colors'>
              Blog
            </Link>
            <ChevronRight className='w-4 h-4' />
            <span className='text-primary'>{post.category}</span>
          </nav>

          {/* Category & Meta */}
          <div className='flex flex-wrap items-center gap-4 mb-6'>
            <span className='px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20'>
              {post.category}
            </span>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span className='flex items-center gap-1.5'>
                <Clock className='w-4 h-4' />
                {estimatedReadTime} min read
              </span>
              <span className='flex items-center gap-1.5'>
                <Calendar className='w-4 h-4' />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-8'>
            {post.title}
          </h1>

          {/* Excerpt / Lede */}
          <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl'>
            {post.excerpt}
          </p>

          {/* Author */}
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center'>
                <User className='w-6 h-6 text-primary' />
              </div>
              <div>
                <p className='font-semibold'>{post.author}</p>
                <p className='text-sm text-muted-foreground'>
                  Contributing Writer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12'>
          {/* Main Content */}
          <MarkdownRenderer content={post.content} />

          {/* Sidebar - Table of Contents (Desktop) */}
          <aside className='hidden lg:block'>
            <div className='sticky top-24 space-y-6'>
              <div className='p-4 rounded-xl bg-muted/30 border border-border'>
                <h4 className='text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider'>
                  In This Article
                </h4>
                <nav className='space-y-2'>
                  {headings.map((heading: string, i: number) => (
                    <a
                      key={i}
                      href={`#${heading
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "")}`}
                      className='block text-sm text-muted-foreground hover:text-primary transition-colors py-1'
                    >
                      {heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Share Widget */}
              <div className='p-4 rounded-xl bg-muted/30 border border-border'>
                <h4 className='text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider'>
                  Share
                </h4>
                <ShareWidget title={post.title} slug={post.slug} />
              </div>
            </div>
          </aside>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 py-8 mt-12 border-t border-border'>
          <span className='text-sm text-muted-foreground mr-2'>Tags:</span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className='text-sm text-muted-foreground bg-muted/50 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-primary/20'
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Bio Card */}
        <Card className='p-6 md:p-8 mt-8 border-primary/20 bg-primary/5'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0'>
              <User className='w-10 h-10 text-primary' />
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-bold mb-1'>{post.author}</h3>
              <p className='text-sm text-primary mb-3'>Contributing Writer</p>
            </div>
          </div>
        </Card>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className='py-20 px-4 bg-muted/30'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex items-center justify-between mb-12'>
              <div>
                <h2 className='text-3xl font-bold font-serif mb-2'>
                  Continue Reading
                </h2>
                <p className='text-muted-foreground'>
                  More articles in {post.category}
                </p>
              </div>
              <Link href='/blog'>
                <Button variant='outline' className='gap-2 hidden md:flex'>
                  View All Articles
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className='group'
                >
                  <Card className='h-full p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5'>
                    {/* Category */}
                    <span className='text-xs font-medium text-primary'>
                      {relatedPost.category}
                    </span>

                    {/* Title */}
                    <h3 className='text-lg font-bold font-serif mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                      {relatedPost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>
                      {relatedPost.excerpt}
                    </p>

                    {/* Meta */}
                    <div className='flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border'>
                      <span>{relatedPost.author}</span>
                      <span className='flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {relatedPost.readTime} min
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className='mt-8 text-center md:hidden'>
              <Link href='/blog'>
                <Button variant='outline' className='gap-2'>
                  View All Articles
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <Card className='relative overflow-hidden p-8 md:p-12 border-primary/20'>
            {/* Background gradient */}
            <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-cyan-500/10' />

            {/* Pattern */}
            <div className='absolute inset-0 opacity-5'>
              <div
                className='absolute inset-0'
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className='relative z-10 text-center'>
              <h2 className='text-3xl md:text-4xl font-bold font-serif mb-4'>
                Enjoyed this article?
              </h2>
              <p className='text-lg text-muted-foreground mb-8 max-w-xl mx-auto'>
                Get weekly insights on IoT, AI, and industrial automation
                delivered straight to your inbox.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
                <Link href='/blog' className='flex-1'>
                  <Button
                    variant='outline'
                    className='w-full gap-2 cursor-pointer'
                  >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Blog
                  </Button>
                </Link>
                <Link href='/pricing' className='flex-1'>
                  <Button className='w-full gap-2 cursor-pointer'>
                    See the pricing plans
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
