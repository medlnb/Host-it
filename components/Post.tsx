import { PostType } from "@types";
import Link from "next/link";
import LoadImage from "./LoadImage";
import { Suspense } from "react";
import Favorite from "@components/Favorite";

const Post = ({
  data,
  state,
  city,
}: {
  data: PostType;
  state: string;
  city: string;
}) => {
  return (
    <div key={data._id} className="relative">
      <Favorite PostId={data._id} />
      <Link href={`/post?id=${data._id}`}>
        <Suspense
          fallback={
            <div className="w-full md:h-52 h-36 rounded-md image-fit loading--background" />
          }
        >
          <LoadImage
            Url={data.images[0]}
            Css="w-full md:h-52 h-36 rounded-md image-fit"
          />
        </Suspense>
        <div className="post--info">
          <p className="font-semibold text-lg">{data.title}</p>
          <p className="whitespace-nowrap overflow-x-hidden text-gray-400">{`${state} - ${city}`}</p>
          <p>19 mar - 29 mar</p>
          <p>{`${data.price.perday} DZD/per night`}</p>
        </div>
      </Link>
    </div>
  );
};
export default Post;
