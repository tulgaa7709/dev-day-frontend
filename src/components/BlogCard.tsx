import React from "react";
import { ImageIcon } from "./svg/ImageIcon";
import Link from "next/link";

export type BlogCardProps = {
  category: string;
  categoryUrl: string;
  title: string;
  url: string;
};

export const BlogCard = ({
  category,
  title,
  url,
  categoryUrl,
}: BlogCardProps) => {
  return (
    <div className="bg-[#333333] rounded-3xl h-full">
      {/* IMAGE */}
      <Link
        href={url}
        className="bg-gray-500 w-full h-40 rounded-t-2xl flex items-center justify-center"
      >
        <img
          src="https://api.tagoplus.co.kr/files/download/SiteInfo/vOsDaYEy.png"
          alt={title}
        />
      </Link>
      <div className="px-5 py-4">
        <Link href={categoryUrl} className="text-[#939393] text-sm">
          {category}
        </Link>
        <Link href={url}>
          <p className="text-sm mt-3">{title}</p>
        </Link>
      </div>
    </div>
  );
};
