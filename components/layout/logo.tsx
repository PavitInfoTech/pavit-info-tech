"use client";

import Image from "next/image";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  /** If you only want a square logo use `size`. You can provide `width` and `height` to preserve the image's natural aspect ratio. */
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  ariaLabel?: string;
}

export function Logo({
  size,
  width,
  height,
  className = "",
  ariaLabel = "PavitInfoTech logo",
  ...rest
}: LogoProps) {
  // Determine final width/height in pixels. If width/height provided use them, otherwise fallback to size (square)
  const w = width ?? size ?? 32;
  const h = height ?? size ?? 32;

  return (
    <div
      {...rest}
      style={{ width: `${w}px`, height: `${h}px` }}
      className={`relative overflow-hidden ${className}`}
      aria-label={ariaLabel}
      onContextMenu={(e) => e.preventDefault()} // discourage save-as via right-click
      onDragStart={(e) => e.preventDefault()} // prevent dragging the image
    >
      {/* Render the image at the given width/height without stretching; objectFit: contain preserves aspect ratio */}
      <Image
        src="/logo/logo.webp"
        alt={ariaLabel}
        width={w}
        height={h}
        style={{ objectFit: "contain" }}
        draggable={false}
      />
    </div>
  );
}
