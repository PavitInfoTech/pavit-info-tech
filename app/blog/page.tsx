"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { BlogCard } from "@/components/blog/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-data";
import {
  Search,
  ArrowRight,
  Clock,
  User,
  Sparkles,
  Cpu,
  BookOpen,
  Wrench,
  Building2,
  Shield,
  Zap,
  Mail,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  subscribeNewsletter,
  MailApiError,
  getValidationErrors,
} from "@/lib/mail-client";

// Define filter tags with icons
const filterTags = [
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "edge", label: "Edge AI", icon: Cpu },
  { id: "protocols", label: "Protocols", icon: BookOpen },
  { id: "security", label: "Security", icon: Shield },
  { id: "engineering", label: "Engineering", icon: Wrench },
  { id: "industry", label: "Industry", icon: Building2 },
  { id: "performance", label: "Performance", icon: Zap },
];

// Editor's picks for "The Deep Dive" section
const editorsPicks = [
  {
    id: "mqtt-config",
    slug: "mqtt-low-latency-config",
    title: "How to Configure MQTT for Low-Latency Networks",
    excerpt:
      "A deep technical guide to optimizing MQTT broker settings for sub-10ms message delivery in industrial environments.",
    author: "Marcus Chen",
    readTime: 18,
    category: "Engineering",
    size: "large", // For masonry layout
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "edge-ai",
    slug: "edge-ai-deployment",
    title: "Deploying TensorFlow Lite on Edge Gateways",
    excerpt:
      "Run inference directly on your edge devices without cloud round-trips.",
    author: "Priya Sharma",
    readTime: 14,
    category: "AI",
    size: "medium",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "opc-ua",
    slug: "opc-ua-security",
    title: "OPC-UA Security Architecture",
    excerpt:
      "Implementing zero-trust security patterns in industrial protocols.",
    author: "James Wilson",
    readTime: 12,
    category: "Security",
    size: "medium",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "time-series",
    slug: "time-series-compression",
    title: "Time-Series Compression Algorithms Compared",
    excerpt:
      "Gorilla, Delta-of-Delta, and custom algorithms for IoT telemetry data.",
    author: "Sarah Chen",
    readTime: 22,
    category: "Engineering",
    size: "large",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "digital-twin",
    slug: "digital-twin-sync",
    title: "Real-Time Digital Twin Synchronization",
    excerpt: "Keeping virtual models in sync with physical assets at scale.",
    author: "Michael Rodriguez",
    readTime: 16,
    category: "Technology",
    size: "small",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: "protocol-bridge",
    slug: "protocol-bridging",
    title: "Building Protocol Bridges: Modbus to MQTT",
    excerpt: "Legacy integration patterns that actually work in production.",
    author: "Elena Kowalski",
    readTime: 11,
    category: "Engineering",
    size: "small",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  // Filter posts based on search and tags
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(
        (tag) =>
          post.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
          post.category.toLowerCase().includes(tag.toLowerCase())
      );

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubscribe = async () => {
    if (!email) return;
    setIsSubscribing(true);
    setSubscribeError(null);

    try {
      await subscribeNewsletter({ email });
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      if (error instanceof MailApiError) {
        const validationErrors = getValidationErrors(error);
        if (validationErrors.email) {
          setSubscribeError(validationErrors.email);
        } else {
          setSubscribeError(error.message || "Subscription failed");
        }
      } else {
        setSubscribeError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  // Featured article data
  const featuredArticle = {
    slug: "death-of-reactive-maintenance",
    title: "The Death of Reactive Maintenance",
    subtitle: "Why 2025 is the Year of Prediction",
    excerpt:
      "For decades, industrial operations have been trapped in a cycle of break-fix. Equipment fails, production stops, engineers scramble. But a fundamental shift is underway. Predictive AI is making reactive maintenance obsolete—and the companies that don't adapt will be left behind.",
    author: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    date: "November 2025",
    readTime: 15,
  };

  return (
    <MainLayout>
      {/* Section 1: Featured Article Hero */}
      <section className='relative min-h-[90vh] flex items-center overflow-hidden'>
        {/* Background gradient */}
        <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-background to-cyan-500/5' />

        {/* Animated grid */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                               linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left: Typography */}
            <div className='space-y-8'>
              {/* Category badge */}
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
                <Sparkles className='w-4 h-4 text-primary' />
                <span className='text-sm font-medium text-primary'>
                  Featured Article
                </span>
              </div>

              {/* Title */}
              <div className='space-y-4'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight'>
                  {featuredArticle.title}
                </h1>
                <p className='text-2xl md:text-3xl text-primary font-serif'>
                  {featuredArticle.subtitle}
                </p>
              </div>

              {/* Excerpt */}
              <p className='text-lg text-muted-foreground leading-relaxed'>
                {featuredArticle.excerpt}
              </p>

              {/* Author & Meta */}
              <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
                    <User className='w-5 h-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium text-foreground'>
                      {featuredArticle.author}
                    </p>
                    <p className='text-xs'>{featuredArticle.role}</p>
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{featuredArticle.readTime} min read</span>
                </div>
                <span>{featuredArticle.date}</span>
              </div>

              {/* CTA */}
              <Link href={`/blog/${featuredArticle.slug}`}>
                <Button size='lg' className='gap-2 group'>
                  Read the Full Article
                  <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
            </div>

            {/* Right: Featured Image */}
            <div className='relative'>
              {/* Main image container */}
              <div className='relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 via-cyan-500/20 to-blue-500/20 border border-primary/20'>
                {/* Abstract data visualization */}
                <svg
                  viewBox='0 0 400 300'
                  className='w-full h-full'
                  fill='none'
                >
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1='0'
                      y1={30 * i}
                      x2='400'
                      y2={30 * i}
                      stroke='currentColor'
                      strokeOpacity='0.1'
                    />
                  ))}
                  {[...Array(14)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={30 * i}
                      y1='0'
                      x2={30 * i}
                      y2='300'
                      stroke='currentColor'
                      strokeOpacity='0.1'
                    />
                  ))}

                  {/* Predictive curve - declining failures */}
                  <path
                    d='M 40 220 Q 100 200 150 180 Q 200 160 250 100 Q 300 60 360 40'
                    stroke='hsl(var(--primary))'
                    strokeWidth='3'
                    fill='none'
                    strokeLinecap='round'
                  />

                  {/* Reactive curve - spiky */}
                  <path
                    d='M 40 120 L 80 180 L 100 100 L 140 200 L 180 80 L 220 190 L 260 90 L 300 170 L 340 110 L 360 150'
                    stroke='hsl(var(--destructive) / 0.6)'
                    strokeWidth='2'
                    fill='none'
                    strokeLinecap='round'
                    strokeDasharray='5 5'
                  />

                  {/* Data points on predictive curve */}
                  {[
                    { x: 100, y: 190 },
                    { x: 150, y: 165 },
                    { x: 200, y: 130 },
                    { x: 250, y: 85 },
                    { x: 300, y: 55 },
                  ].map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r='6'
                      fill='hsl(var(--primary))'
                      className='animate-pulse'
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}

                  {/* Labels */}
                  <text
                    x='360'
                    y='35'
                    fill='hsl(var(--primary))'
                    fontSize='12'
                    fontWeight='bold'
                  >
                    Predictive
                  </text>
                  <text
                    x='340'
                    y='165'
                    fill='hsl(var(--destructive) / 0.8)'
                    fontSize='10'
                  >
                    Reactive
                  </text>

                  {/* Year marker */}
                  <text
                    x='200'
                    y='280'
                    fill='currentColor'
                    fontSize='14'
                    textAnchor='middle'
                    opacity='0.5'
                  >
                    2025
                  </text>
                </svg>

                {/* Floating stat cards */}
                <div className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border shadow-lg'>
                  <p className='text-xs text-muted-foreground'>
                    Downtime Reduction
                  </p>
                  <p className='text-xl font-bold text-primary'>-73%</p>
                </div>

                <div className='absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border shadow-lg'>
                  <p className='text-xs text-muted-foreground'>
                    Prediction Accuracy
                  </p>
                  <p className='text-xl font-bold text-green-400'>94.2%</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl' />
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl' />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Glassmorphism Filter/Search Bar */}
      <section className='py-12 px-4'>
        <div className='max-w-5xl mx-auto'>
          {/* Glassmorphism container */}
          <div className='relative p-6 md:p-8 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
            {/* Gradient overlay */}
            <div className='absolute inset-0 rounded-2xl bg-linear-to-r from-primary/5 via-transparent to-cyan-500/5 pointer-events-none' />

            <div className='relative space-y-6'>
              {/* Search input */}
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  placeholder='Search articles, tutorials, case studies...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-12 h-14 text-lg bg-background/50 border-white/10 focus:border-primary/50 rounded-xl'
                />
              </div>

              {/* Tag filters */}
              <div className='flex flex-wrap gap-3'>
                {filterTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                      selectedTags.includes(tag.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background/50 border-white/10 hover:border-primary/50 hover:bg-primary/10"
                    }`}
                  >
                    <tag.icon className='w-4 h-4' />
                    <span className='text-sm font-medium'>{tag.label}</span>
                  </button>
                ))}

                {/* Clear filters */}
                {(searchQuery || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTags([]);
                    }}
                    className='px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Results count */}
              <p className='text-sm text-muted-foreground'>
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid (filtered results) */}
      <section className='py-12 px-4'>
        <div className='max-w-7xl mx-auto'>
          {filteredPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <p className='text-muted-foreground mb-4'>
                No articles found matching your criteria
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTags([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: "The Deep Dive" - Editor's Picks (Masonry) */}
      <section className='py-20 px-4 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          {/* Section header */}
          <div className='flex items-center justify-between mb-12'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold font-serif mb-2'>
                The Deep Dive
              </h2>
              <p className='text-lg text-muted-foreground'>
                Editor's picks: Long-form technical tutorials and guides
              </p>
            </div>
            <Button variant='outline' className='hidden md:flex gap-2'>
              View All Tutorials
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>

          {/* Masonry Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]'>
            {editorsPicks.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className={`group relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 ${
                  article.size === "large"
                    ? "md:row-span-2"
                    : article.size === "small"
                    ? "row-span-1"
                    : "row-span-1 md:row-span-1"
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${article.gradient} opacity-50 group-hover:opacity-70 transition-opacity`}
                />

                {/* Content */}
                <div className='relative h-full p-6 flex flex-col justify-between'>
                  {/* Category badge */}
                  <div className='flex items-center justify-between'>
                    <span className='px-3 py-1 rounded-full bg-background/80 text-xs font-medium'>
                      {article.category}
                    </span>
                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                      <Clock className='w-3 h-3' />
                      {article.readTime} min
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className='mt-auto space-y-3'>
                    <h3
                      className={`font-bold font-serif leading-tight group-hover:text-primary transition-colors ${
                        article.size === "large"
                          ? "text-2xl md:text-3xl"
                          : "text-lg md:text-xl"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <p
                      className={`text-muted-foreground ${
                        article.size === "large" ? "text-base" : "text-sm"
                      }`}
                    >
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className='flex items-center gap-2 pt-2'>
                      <div className='w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center'>
                        <User className='w-3 h-3 text-primary' />
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        {article.author}
                      </span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className='absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all'>
                    <ArrowRight className='w-5 h-5 text-primary-foreground' />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className='mt-8 text-center md:hidden'>
            <Button variant='outline' className='gap-2'>
              View All Tutorials
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter Subscription */}
      <section className='relative py-24 px-4 overflow-hidden'>
        {/* High-contrast cyan background */}
        <div className='absolute inset-0 bg-cyan-500' />

        {/* Pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Decorative shapes */}
        <div className='absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl' />

        <div className='relative z-10 max-w-3xl mx-auto text-center'>
          {/* Icon */}
          <div className='w-16 h-16 rounded-2xl bg-black/10 flex items-center justify-center mx-auto mb-8'>
            <Mail className='w-8 h-8 text-black' />
          </div>

          {/* Copy */}
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-black mb-4'>
            Get the Weekly IoT Intelligence Briefing
          </h2>
          <p className='text-lg text-black/70 mb-8 max-w-xl mx-auto'>
            Curated insights, technical deep-dives, and industry analysis
            delivered every Thursday. Join 12,000+ engineers and executives.
          </p>

          {/* Subscription form */}
          {!isSubscribed ? (
            <div className='space-y-3 max-w-md mx-auto'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Input
                  type='email'
                  placeholder='your@email.com'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribeError) setSubscribeError(null);
                  }}
                  className='h-14 bg-white/90 border-0 text-black placeholder:text-black/50 rounded-xl flex-1'
                />
                <Button
                  onClick={handleSubscribe}
                  disabled={isSubscribing || !email}
                  className='h-14 px-8 bg-black hover:bg-black/80 text-white rounded-xl font-medium'
                >
                  {isSubscribing ? (
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {subscribeError && (
                <div className='flex items-center justify-center gap-2 text-red-700'>
                  <AlertCircle className='w-4 h-4' />
                  <span className='text-sm'>{subscribeError}</span>
                </div>
              )}
            </div>
          ) : (
            <Card className='inline-flex items-center gap-3 px-6 py-4 bg-white/90 border-0'>
              <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center'>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={3}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <span className='text-black font-medium'>
                You are subscribed! Check your inbox.
              </span>
            </Card>
          )}

          {/* Trust signal */}
          <p className='mt-6 text-sm text-black/60'>
            No spam. Unsubscribe anytime. Read our{" "}
            <Link href='/privacy' className='underline hover:text-black'>
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
