"use client";
import "@styles/User.css";
import "@styles/Posts.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaHouseCrack } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";

function Page() {
  const [favorites, setFavorites] = useState<any>(null);
  const { data: session, update } = useSession();
  useEffect(() => {
    // const newFavorites: any = [];
    setFavorites([]);
    const fetchFavorites = async (favorite: string) => {
      const response = await fetch(`/api/post/${favorite}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { post } = await response.json();
      if (favorites) setFavorites((prev: any) => [...prev, post]);
      else setFavorites([post]);
    };
    if (session) {
      if (session?.user.favorites.length === 0) setFavorites([]);
      session?.user.favorites.map((favorite) => {
        fetchFavorites(favorite);
        // .then((data) => {

        //   if (favorites) setFavorites([...favorites, data]);
        //   else setFavorites([data]);
        // });
      });
    }
  }, [session ,favorites]);

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
              <Favorite post={post} update={update} session={session} />
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

const Favorite = ({ post, session, update }: any) => {
  const [loadingremove, setLoadingremove] = useState(true);
  const router = useRouter();

  const HandleRemoveFav = async (PostId: string) => {
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        PostId,
      }),
    });

    if (response.ok) update();
  };
  return (
    <div
      className="fav--container"
      onClick={() => {
        router.push(`/post/${post._id}`);
      }}
    >
      {session && (
        <IoMdTrash
          // className={`fav--icon ${
          //   isloading ? "jumping--icon" : ""
          // }`}
          size={20}
          style={{ top: "1rem" }}
          className={`fav--icon`}
          fill="black"
          onClick={() => HandleRemoveFav(post._id)}
        />
      )}
      <img src={post.image[0]} />

      <div className="fav--body">
        <h1>{post.title}</h1>
        <h2 style={{ color: "gray" }}>{`${post.state} ~ ${post.city}`}</h2>
      </div>
    </div>
  );
};
