"use client";
import "@styles/User.css";
import "@styles/Posts.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { FaHouseCrack } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { FavoritesContext } from "@Context/FavoritesContext";

function Page() {
  const { data: session } = useSession();
  const { favorites, dispatch } = useContext(FavoritesContext);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Favorites</h1>
      {favorites ? (
        favorites.length === 0 ? (
          <div className="empty--Feed--container">
            <div className="empty--Feed--circle">
              <div className="empty--Feed">
                <FaHouseCrack className="empty--Feed--icon" />
                <h1>No Posts Found</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="favorites--feed">
            {favorites.map((post: any) => (
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

const Favorite = ({ post, userId, dispatch }: any) => {
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
      className="fav--container"
      onClick={() => {
        router.push(`/post/${post._id}`);
      }}
    >
      <img src={post.image[0]} />
      <div className="Hline bigscreen" style={{ width: "100%" }} />
      <div className="fav--body">
        <div className="fav--info">
          <h1>{post.title}</h1>
          {post.state === post.city ? (
            <h2 style={{ color: "gray" }}>{`${post.state}`}</h2>
          ) : (
            <h2 style={{ color: "gray" }}>{`${post.state} ~ ${post.city}`}</h2>
          )}
        </div>
        {!loadingremove ? (
          <IoMdTrash
            className="favpage--icon"
            fill="black"
            onClick={(e) => {
              e.stopPropagation();
              HandleRemoveFav(post._id);
            }}
          />
        ) : (
          <ClipLoader className="favpage--icon" size={15} />
        )}
      </div>
    </div>
  );
};
