"use client";

import { useState } from "react";
import { SiX } from "react-icons/si";
import { FiLinkedin, FiLink, FiBookmark } from "react-icons/fi";

interface Props {
  title?: string;
  slug?: string;
  className?: string;
}

export default function ShareWidget({
  title = "PavitInfoTech",
  slug = "",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => {
    try {
      const stored = localStorage.getItem("pavit_bookmarks");
      if (stored) {
        const list = JSON.parse(stored) as string[];
        return list.includes(slug);
      }
    } catch {
      /* noop */
    }
    return false;
  });

  const urlBase = () => `https://pavitinfotech.com/blog/${slug}`;

  function openShare(targetUrl: string) {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  const onX = () => {
    const tweet = encodeURIComponent(`${title} — via PavitInfoTech`);
    const u = encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : urlBase()
    );
    // X supports the same intent/tweet sharing endpoint
    openShare(`https://x.com/intent/tweet?text=${tweet}&url=${u}`);
  };

  const onLinkedIn = () => {
    const u = encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : urlBase()
    );
    openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`);
  };

  const onCopy = async () => {
    try {
      const u =
        typeof window !== "undefined" ? window.location.href : urlBase();
      await navigator.clipboard.writeText(u);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement("input");
      input.value =
        typeof window !== "undefined" ? window.location.href : urlBase();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onToggleBookmark = () => {
    try {
      const stored = localStorage.getItem("pavit_bookmarks");
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (list.includes(slug)) {
        const newList = list.filter((s) => s !== slug);
        localStorage.setItem("pavit_bookmarks", JSON.stringify(newList));
        setBookmarked(false);
      } else {
        list.push(slug);
        localStorage.setItem("pavit_bookmarks", JSON.stringify(list));
        setBookmarked(true);
      }
    } catch {
      // no-op
    }
  };

  return (
    <div className={"flex gap-2 " + className}>
      <button
        onClick={onX}
        title='Share on X'
        className='flex-1 h-10 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/30 flex items-center justify-center transition-colors'
        aria-label='Share on X'
      >
        <SiX className='w-4 h-4' />
      </button>

      <button
        onClick={onLinkedIn}
        title='Share on LinkedIn'
        className='flex-1 h-10 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/30 flex items-center justify-center transition-colors'
        aria-label='Share on LinkedIn'
      >
        <FiLinkedin className='w-4 h-4' />
      </button>

      <button
        onClick={onCopy}
        title='Copy link'
        className='flex-1 h-10 rounded-lg bg-background hover:bg-primary/10 border border-border hover:border-primary/30 flex items-center justify-center transition-colors'
        aria-label='Copy link to clipboard'
      >
        {copied ? (
          <span className='text-sm font-medium'>Copied</span>
        ) : (
          <FiLink className='w-4 h-4' />
        )}
      </button>

      <button
        onClick={onToggleBookmark}
        title={bookmarked ? "Remove bookmark" : "Save for later"}
        className={`flex-1 h-10 rounded-lg ${
          bookmarked
            ? "bg-primary/10 border-primary text-primary"
            : "bg-background border-border"
        } hover:bg-primary/10 border flex items-center justify-center transition-colors`}
        aria-pressed={bookmarked}
      >
        <FiBookmark className='w-4 h-4' />
      </button>
    </div>
  );
}
