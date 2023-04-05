import React from "react";
import { Skeleton } from "@mui/material";

interface ExtractYoutubeResult {
  etag: string;
  videoId: string;
  channelTitle: string;
  title: string;
  description: string;
  thumbnail: string;
  pageInfo?: { pageCount: number; nextPageToken: string };
  isLoading?: boolean;
}

const YoutubeResult = ({
  videoId,
  channelTitle,
  description,
  title,
  thumbnail,
  pageInfo,
  isLoading,
}: ExtractYoutubeResult) => {
  return (
    <div className="h-64 w-64 bg-gray-100 border-[2px] cursor-pointer">
      <div className="w-full h-4/5">
        {isLoading ? (
          <Skeleton variant="rectangular" width={254} height={203} />
        ) : (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full bg-yellow-300"
          />
        )}
      </div>
      <div className="h-1/5 flex flex-col bg-white px-2 py-1">
        <p className="font-semibold overflow-hidden text-overflow whitespace-nowrap truncate w-full ">
          {isLoading ? <Skeleton /> : title}
        </p>
        <p className="overflow-hidden text-overflow whitespace-nowrap hidden md:block">
          {isLoading ? <Skeleton /> : channelTitle}
        </p>
      </div>
    </div>
  );
};

export default YoutubeResult;
