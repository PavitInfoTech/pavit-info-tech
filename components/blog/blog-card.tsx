import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className='overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full group'>
        {/* Image Section */}
        {post.image && (
          <div className='relative aspect-video overflow-hidden'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-linear-to-t from-background/60 to-transparent' />
            {/* Category overlay */}
            <span className='absolute top-3 left-3 text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full'>
              {post.category}
            </span>
          </div>
        )}

        <div className='p-6 space-y-4'>
          {/* Show category inline if no image */}
          {!post.image && (
            <div className='flex items-center justify-between gap-2'>
              <span className='text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                {post.category}
              </span>
              <span className='text-xs text-muted-foreground'>
                {post.readTime} min read
              </span>
            </div>
          )}

          <div>
            <h3 className='text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors font-serif'>
              {post.title}
            </h3>
            <p className='text-sm text-muted-foreground mt-2 line-clamp-2'>
              {post.excerpt}
            </p>
          </div>

          <div className='flex flex-wrap gap-1'>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className='text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded'
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className='flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border'>
            <span>{post.author}</span>
            <div className='flex items-center gap-3'>
              {post.image && <span>{post.readTime} min read</span>}
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
