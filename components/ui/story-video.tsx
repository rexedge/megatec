"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND_STORY_VIDEO_ID } from "@/lib/site";

/**
 * The "Watch our story" button on the Home hero (HM-03, R2-13), and the one video
 * on the whole site (MO-10). Nothing from YouTube is loaded with the page: the
 * player is added only when the button is tapped, so the page stays fast on mobile
 * data. The Brand Story is a YouTube Short, so the player is upright (9:16), and it
 * uses youtube-nocookie.com, YouTube's embed address that sets no cookies until play.
 */
export function StoryVideo({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // The button that opened the player, so focus can go back to it on close.
  const opener = useRef<HTMLElement | null>(null);

  return (
    <>
      <Button
        type="button"
        variant="outline-light"
        className={className}
        onClick={(event) => {
          opener.current = event.currentTarget;
          setOpen(true);
        }}
        aria-haspopup="dialog"
        icon={<PlayIcon />}
      >
        Watch our story
      </Button>
      {open && (
        <StoryDialog
          onClose={() => {
            setOpen(false);
            opener.current?.focus();
          }}
        />
      )}
    </>
  );
}

function StoryDialog({ onClose }: { onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="MEGA-TEC brand story video"
        className="relative aspect-[9/16] h-[min(82svh,760px)] max-w-full overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${BRAND_STORY_VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
          title="MEGA-TEC brand story"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <button
        ref={closeButton}
        type="button"
        onClick={onClose}
        aria-label="Close the video"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.2v7.6l6-3.8z" fill="currentColor" />
    </svg>
  );
}
