"use client";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PostType } from "@types";

const Post = ({
  data,
  HandleAddFav,
  HandleRemoveFav,
  isFavorite,
  userId,
}: {
  data: PostType;
  HandleAddFav?: any;
  HandleRemoveFav?: any;
  userId: string | undefined;
  isFavorite: boolean | undefined;
}) => {
  const router = useRouter();
  const [isloading, setisloading] = useState(false);
  const HandleGetPage = () => {
    router.push(`/post/${data._id}`);
  };

  const HandleClick = async (e: any, type: "Add" | "Remove") => {
    e.stopPropagation();
    setisloading(true);
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        PostId: data._id,
      }),
    });
    if (response.ok) {
      if (type === "Add") {
        HandleAddFav(data);
      } else {
        HandleRemoveFav(data._id);
      }
    }
    setisloading(false);
  };
  return (
    <div className="relative" onClick={HandleGetPage}>
      {isFavorite !== undefined &&
        (isFavorite ? (
          <FaHeart
            className={`absolute right-2 top-2 text-lg ${
              isloading ? "jumping--icon" : ""
            }`}
            fill="white"
            onClick={(e) => {
              HandleClick(e, "Remove");
            }}
          />
        ) : (
          <FaRegHeart
            className={`absolute right-2 top-2 text-lg ${
              isloading ? "jumping--icon" : ""
            }`}
            fill="white"
            onClick={(e) => {
              HandleClick(e, "Add");
            }}
          />
        ))}

      <img
        src={`${data.image[0].display_url}`}
        className="w-full md:h-52 h-36 rounded-md image-fit loading--background"
      />
      <div className="post--info">
        <p>{data.title}</p>
        <p className="whitespace-nowrap overflow-x-hidden text-gray-400 pr-4">{`${data.state.name} - ${data.city.name}`}</p>
        <p>19 mar - 29mar</p>
        <p>{`${data.price.perday} DZD/per night`}</p>
      </div>
    </div>
  );
};
export default Post;
