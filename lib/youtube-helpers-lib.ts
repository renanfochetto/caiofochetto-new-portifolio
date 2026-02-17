// lib/youtube-helpers.ts
// Funções auxiliares para trabalhar com URLs do YouTube

/**
 * Extrai o ID da playlist de uma URL do YouTube
 * Suporta formatos:
 * - https://www.youtube.com/playlist?list=PLC85...
 * - https://youtube.com/playlist?list=PLC85...
 */
export function getPlaylistId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('list');
  } catch {
    return null;
  }
}

/**
 * Gera URL de embed para playlist do YouTube
 */
export function getPlaylistEmbedUrl(playlistId: string): string {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
}

/**
 * Gera URL de embed para playlist a partir da URL completa
 */
export function getPlaylistEmbedUrlFromUrl(url: string): string | null {
  const playlistId = getPlaylistId(url);
  return playlistId ? getPlaylistEmbedUrl(playlistId) : null;
}

/**
 * Gera URL do thumbnail de um vídeo do YouTube
 * Quality: default | mq | hq | sd | max
 */
export function getVideoThumbnail(
  videoId: string,
  quality: 'default' | 'mq' | 'hq' | 'sd' | 'max' = 'hq'
): string {
  const qualityMap = {
    'default': 'default',
    'mq': 'mqdefault',
    'hq': 'hqdefault',
    'sd': 'sddefault',
    'max': 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Valida se uma URL é do YouTube
 */
export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be';
  } catch {
    return false;
  }
}