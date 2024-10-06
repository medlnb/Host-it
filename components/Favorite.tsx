"use client";
import { FavoritesContext } from "@Context/FavoritesContext";
import { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { notify } from "./Sonner";
import ClipLoader from "react-spinners/ClipLoader";

function Favorite({ PostId }: { PostId: string }) {
  const [loading, setLoading] = useState(false);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const HandleAddFav = () => {
    if (!setFavorites) return;
    setFavorites((prev) => [...prev!, PostId]);
  };

  const HandleRemoveFav = () => {
    if (!setFavorites) return;
    setFavorites((prev) => prev!.filter((fav) => fav !== PostId));
  };

  const HandleClick = async () => {
    setLoading(true);
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PostId,
      }),
    });
    if (!response.ok) {
      return notify({ type: "error", message: "Error Adding to Favorites" });
    }
    const { type } = await response.json();
    if (type === "Add") {
      HandleAddFav();
    } else {
      HandleRemoveFav();
    }
    setLoading(false);
  };

  if (loading)
    return (
      <ClipLoader
        size={20}
        color="#f43f5e"
        className="absolute right-1.5 top-1.5 cursor-pointer"
      />
    );

  if (!favorites) return;

  return favorites.includes(PostId) ? (
    <FaHeart
      className={`absolute right-2 top-2 text-lg cursor-pointer`}
      fill="white"
      onClick={(e) => {
        e.stopPropagation();
        HandleClick();
      }}
    />
  ) : (
    <FaRegHeart
      className={`absolute right-2 top-2 text-lg cursor-pointer`}
      fill="white"
      onClick={(e) => {
        e.stopPropagation();
        HandleClick();
      }}
    />
  );
}

export default Favorite;
