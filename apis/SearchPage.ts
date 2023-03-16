import axios from "axios";

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

// 데이터 가져오기
export const getSearchData = async (
  query: string,
  option?: string
): Promise<ExtractYoutubeResult[] | GoogleSearchResult[] | undefined> => {
  if (!query) {
    return;
  }

  const googleApiKey = process.env.GOOGLE_API_KEY;
  const googleCx = process.env.GOOGLE_CX;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const google = "AIzaSyDXTLG96gjEfgtIEiPao0WEfpoFJAeKCso";
  const cx = "11579fe74ab2d45de";

  const maxResults = 10;

  let url = "";

  try {
    if (option === "google" || option === undefined) {
      url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${query}&start=1`;

      const response = await axios.get(url);
      const items: GoogleSearchResult[] = response.data.items;
      const googleResults = items.map((v) => ({
        cacheId: v.cacheId,
        title: v.title,
        snippet: v.snippet,
        link: v.link,
        formattedUrl: v.formattedUrl,
        source: "google",
      }));

      return googleResults;
    } else if (option === "youtube") {
      url = `https://www.googleapis.com/youtube/v3/search?key=${googleApiKey}&part=snippet&maxResults=${maxResults}&q=${query}&type=video
      `;

      try {
        const response = await axios.get(url);
        console.log(response);
        const items: YoutubeSearchResult[] = response.data.items;
        const youtubeResult: ExtractYoutubeResult[] = items.map((data) => ({
          etag: data.etag,
          videoId: data.id.videoId,
          title: data.snippet.title,
          description: data.snippet.description,
          thumbnail: data.snippet.thumbnails.default.url,
          pageInfo: {
            pageCount: Math.ceil(
              response.data.pageInfo.totalResults /
                response.data.pageInfo.resultsPerPage
            ),
            nextPageToken: response.data.nextPageToken,
          },
          source: "youtube",
        }));
        return youtubeResult;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
