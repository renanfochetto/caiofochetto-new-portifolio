"use client";

import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";

interface PlaylistEmbedProps {
  playlistEmbedUrl: string;
  playlistUrl: string;
  sectionTitle?: string;
}

export function PlaylistEmbed({
  playlistEmbedUrl,
  playlistUrl,
  sectionTitle = "RELATED CONTENT",
}: PlaylistEmbedProps) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Play className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {sectionTitle}
          </p>
        </div>

        {/* YouTube Embed */}
        <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg border border-border bg-background">
          <iframe
            width="100%"
            height="100%"
            src={playlistEmbedUrl}
            title="Related content playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        {/* CTA Link */}
        <div className="flex justify-center">
          <Link
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View full playlist on YouTube
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
