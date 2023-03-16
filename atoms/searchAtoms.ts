import { atom } from "jotai";

interface GoogleSearchResult {
  cacheId?: string;
  title: string;
  snippet: string;
  link: string;
  formattedUrl: string;
  source: string;
}

interface YoutubeSearchResult {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
  };
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  source: "youtube";
}

interface ExtractYoutubeResult {
  etag: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  pageInfo: { pageCount: number; nextPageToken: string };
  source: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export const searchPageSearchQueryAtom = atom<string>("");
export const searchPageSearchResultAtom = atom<
  ExtractYoutubeResult[] | GoogleSearchResult[] | undefined
>([]);
export const apisearchResultAtom = atom([]);
export const searchPageSearchOptiontAtom = atom("google");
