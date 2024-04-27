"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { FaHouseCrack } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { FavoritesContext } from "@Context/FavoritesContext";

interface Favorites {
  _id: string;
  title: string;
  description: string;
  city: {
    name: string;
    id: number;
  };
  state: {
    name: string;
    id: number;
  };
  image: {
    display_url: string;
    delete_url: string;
  }[];
}

function Page() {
  const { data: session } = useSession();
  const { favorites, dispatch } = useContext(FavoritesContext);
  return (
    <>
      <h1 className="text-center">Favorites</h1>
      {favorites ? (
        favorites.length === 0 ? (
          <div className="flex justify-center items-center h-80 text-md text-black whitecpace-nowrap">
            <div className="w-64 h-64 relative rounded-full bg-gray-100">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                <FaHouseCrack className="text-6xl" />
                <h1>No Posts Found</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[60rem] grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3 max-w-full my-6 mx-auto ">
            {favorites.map((post) => (
              <Favorite
                key={post._id}
                post={post}
                userId={session?.user.id}
                dispatch={dispatch}
              />
            ))}
          </div>
        )
      ) : (
        "loading"
      )}
    </>
  );
}

export default Page;

const Favorite = ({
  post,
  userId,
  dispatch,
}: {
  post: Favorites;
  userId: string | undefined;
  dispatch: any;
}) => {
  const [loadingremove, setLoadingremove] = useState(false);
  const router = useRouter();

  const HandleRemoveFav = async (PostId: string) => {
    setLoadingremove(true);
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        PostId,
      }),
    });

    if (response.ok) {
      dispatch({ type: "REMOVE_FAVORITE", payload: PostId });
    }
    setLoadingremove(false);
  };

  return (
    <div
      className="flex md:flex-col flex-row md:items-center items-start text-xs md:gap-4 gap-2 md:p-4 p-2 center-shadow rounded-md relative hover:outline hover:outline-1 hover:outline-gray-300"
      onClick={() => {
        router.push(`/post/${post._id}`);
      }}
    >
      <img
        src={post.image[0].display_url}
        className="md:w-full w-28 md:h-40 h-20 rounded-md image-fit"
      />
      <div className="Hline w-full hidden md:block" />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-start flex-col">
          <h1>{post.title}</h1>

          <h2 className="text-gray-500">{`${post.state.name} ${
            post.state.name === post.city.name ? "" : ` ~ ${post.city.name}`
          }`}</h2>
        </div>
        {!loadingremove ? (
          <IoMdTrash
            className="md:text-lg text-xs cursor-pointer flex flex-col items-center gap-2"
            fill="black"
            onClick={(e) => {
              e.stopPropagation();
              HandleRemoveFav(post._id);
            }}
          />
        ) : (
          <ClipLoader
            className="text-base cursor-pointer flex flex-col items-center gap-2"
            size={15}
          />
        )}
      </div>
    </div>
  );
};
