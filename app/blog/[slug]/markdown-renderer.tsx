"use client";

import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

interface MarkdownRendererProps {
  content: string;
}

// Custom components for ReactMarkdown
const markdownComponents: Components = {
  // Code blocks with syntax highlighting
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;

    if (isInline) {
      return (
        <code
          className='bg-muted/80 text-primary px-1.5 py-0.5 rounded text-sm font-mono'
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag='div'
        className='rounded-xl !bg-[#1a1b26] !my-6 text-sm overflow-x-auto'
        showLineNumbers={true}
        wrapLines={true}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },

  // Headings with anchor links
  h1: ({ children }) => (
    <h1 className='text-3xl md:text-4xl font-bold font-serif mt-12 mb-6 first:mt-0'>
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    const text = React.Children.toArray(children).join("");
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return (
      <h2
        id={id}
        className='text-2xl md:text-3xl font-bold font-serif mt-12 mb-4 text-primary scroll-mt-24'
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className='text-xl font-bold mt-8 mb-3'>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className='text-lg font-semibold mt-6 mb-2'>{children}</h4>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className='text-lg leading-relaxed text-foreground/80 my-6'>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children }) => <ul className='space-y-2 my-6 ml-4'>{children}</ul>,
  ol: ({ children }) => (
    <ol className='space-y-3 my-6 ml-4 counter-reset-list'>{children}</ol>
  ),
  li: ({ children }) => {
    return (
      <li className='flex items-start gap-3 text-foreground/90'>
        <span className='w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0' />
        <span className='flex-1'>{children}</span>
      </li>
    );
  },

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className='border-l-4 border-primary/50 pl-6 py-2 my-8 italic text-muted-foreground bg-muted/20 rounded-r-lg pr-4'>
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children }) => (
    <div className='overflow-x-auto my-8 rounded-xl border border-border'>
      <table className='w-full text-sm'>{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className='bg-muted/50 border-b border-border'>{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className='divide-y divide-border'>{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className='hover:bg-muted/30 transition-colors'>{children}</tr>
  ),
  th: ({ children }) => (
    <th className='px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='px-4 py-3 text-foreground/80'>{children}</td>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className='text-primary hover:underline underline-offset-4'
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Horizontal rule
  hr: () => <hr className='my-12 border-border' />,

  // Strong/Bold
  strong: ({ children }) => (
    <strong className='font-semibold text-foreground'>{children}</strong>
  ),

  // Emphasis/Italic
  em: ({ children }) => <em className='italic'>{children}</em>,

  // Images
  img: ({ src, alt }) => (
    <figure className='my-8'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        className='rounded-xl w-full object-cover'
      />
      {alt && (
        <figcaption className='text-center text-sm text-muted-foreground mt-3'>
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Preformatted text (for ASCII art diagrams)
  pre: ({ children }) => {
    // If children is a code element, let it handle rendering (for syntax highlighting)
    if (React.isValidElement(children) && children.type === "code") {
      return <>{children}</>;
    }

    return (
      <pre className='bg-muted/50 rounded-xl p-4 overflow-x-auto my-6 font-mono text-sm whitespace-pre'>
        {children}
      </pre>
    );
  },
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className='prose prose-lg prose-invert max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
