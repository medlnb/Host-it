"use client";
import { PostType } from "@types";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "@Context/FavoritesContext";
import Post from "@components/Post";
import EmptyContent from "./EmptyContent";

interface Favorites {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  image: string[];
}

export default function Table({
  currentPage,
  type,
  wilaya,
  baladia,
  bedrooms,
  bathrooms,
  beds,
  amenties,
  HighPrice,
  LowPrice,
}: {
  wilaya?: string;
  baladia?: string;
  bedrooms?: string;
  bathrooms?: string;
  beds?: string;
  amenties?: string;
  HighPrice?: string;
  LowPrice?: string;
  type: string;
  currentPage: number;
}) {
  const { data: session } = useSession();
  const [invoices, setInvoices] = useState<PostType[] | null>(null);
  const { favorites, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          wilaya,
          baladia,
          bedrooms,
          bathrooms,
          beds,
          amenties,
          HighPrice,
          LowPrice,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    };
    fetchPosts();
  }, [
    currentPage,
    type,
    wilaya,
    baladia,
    bedrooms,
    bathrooms,
    beds,
    amenties,
    HighPrice,
    LowPrice,
  ]);

  const HandleAddFav = (post: Favorites) => {
    if (!dispatch) return;
    dispatch({ type: "ADD_FAVORITE", payload: [post] });
  };

  const HandleRemoveFav = (postId: string) => {
    if (!dispatch) return;
    dispatch({ type: "REMOVE_FAVORITE", payload: postId });
  };

  return (
    <>
      {invoices ? ( //check if its still fetching
        <>
          {invoices.length !== 0 ? ( //check if the return data is empty feed
            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
              {invoices.map((apost: PostType) => {
                let isFavorite = undefined;
                if (favorites)
                  isFavorite = favorites
                    .map((fav) => fav._id)
                    .includes(apost._id);
                return (
                  <Post
                    key={apost._id}
                    data={apost}
                    HandleAddFav={HandleAddFav}
                    HandleRemoveFav={HandleRemoveFav}
                    userId={session?.user.id}
                    isFavorite={isFavorite}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyContent content="No Posts Found" />
          )}
        </>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
          <>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="relative">
                <div className="w-full h-52 rounded-md image-fit loading--background" />
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
}
