interface YouTubeEmbedProps {
  type?: "video" | "playlist" | "multiple";
  videoId?: string;      // Video ID único ou Playlist ID
  videoIds?: string[];   // Array de Video IDs (para múltiplos)
  title: string;
  placeholder?: string;
}

export function YouTubeEmbed({
  type = "video",
  videoId,
  videoIds,
  title,
  placeholder
}: YouTubeEmbedProps) {

  // TIPO 1: Playlist
  if (type === "playlist" && videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${videoId}`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // TIPO 2: Vídeo único
  if (type === "video" && videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // TIPO 3: Múltiplos vídeos (grid 2 colunas)
  if (type === "multiple" && videoIds && videoIds.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {videoIds.map((id, index) => {
          const embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;

          return (
            <div
              key={id}
              className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background"
            >
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title={`${title} - Parte ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback: Placeholder ou nada
  return placeholder ? (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-muted">
      <img
        src={placeholder}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  ) : null;
}