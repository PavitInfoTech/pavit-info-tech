import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
