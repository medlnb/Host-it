"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaHouseCrack } from "react-icons/fa6";
import { FavoritesContext } from "@Context/FavoritesContext";

interface Post {
  _id: string;
  poster: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  city: String;
  state: String;
  location: {
    lat: String;
    lng: String;
  };
  resevedDateFrom?: string[];
  resevedDateTo?: string[];
  description?: string;
  amenities: string[];
  image: string[];
}

const Post = ({
  data,
  HandleAddFav,
  HandleRemoveFav,
  isFavorite,
  userId,
}: {
  data: Post;
  HandleAddFav?: any;
  HandleRemoveFav?: any;
  userId: string | undefined;
  isFavorite: boolean | undefined;
}) => {
  const router = useRouter();
  const [isloading, setisloading] = useState(false);
  // console.log(isFavorite);
  const HandleGetPage = () => {
    router.push(`/post/${data._id}`);
  };
  if (data._id === "loading")
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="post--container">
            <div className="post--picture loading--background" />
          </div>
        ))}
      </>
    );

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
    <div className="post--container" onClick={HandleGetPage}>
      {isFavorite !== undefined &&
        (isFavorite ? (
          <FaHeart
            className={`fav--icon ${isloading ? "jumping--icon" : ""}`}
            fill="white"
            onClick={(e) => {
              HandleClick(e, "Remove");
            }}
          />
        ) : (
          <FaRegHeart
            className={`fav--icon ${isloading ? "jumping--icon" : ""}`}
            fill="white"
            onClick={(e) => {
              HandleClick(e, "Add");
            }}
          />
        ))}

      <img src={data.image[0]} className="post--picture" />
      <div className="post--info">
        <p>{data.title}</p>
        <p className="post--location">{`${data.state} - ${data.city}`}</p>
        <p>19 mar - 29mar</p>
        <p>{`${data.price.perday} DZD/per night`}</p>
      </div>
    </div>
  );
};

export default function Table({
  query,
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
  query: string;
  type: string;
  currentPage: number;
}) {
  const { data: session, update } = useSession();
  const [isloading, setisloading] = useState(false);
  const [invoices, setInvoices] = useState<any[] | null>(null);
  const { favorites, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setisloading(true);
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
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
      setisloading(false);
    };
    fetchPosts();
  }, [
    query,
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
  const loadingPost = {
    _id: "loading",
    poster: "loading",
    title: "loading",
    type: "loading",
    price: { perday: 0, permonth: 0 },
    city: "loading",
    state: "loading",
    location: {
      lat: "loading",
      lng: "loading",
    },
    resevedDateFrom: ["loading"],
    resevedDateTo: ["loading"],
    description: "loading",
    amenities: ["loading"],
    image: ["loading"],
  };
  interface Favorites {
    _id: string;
    title: string;
    description: string;
    city: string;
    state: string;
    image: string[];
  }
  const HandleAddFav = (post: Favorites) => {
    if (!dispatch) return;
    dispatch({ type: "ADD_FAVORITE", payload: [post] });
  };

  const HandleRemoveFav = (postId: string) => {
    if (!dispatch) return;
    dispatch({ type: "REMOVE_FAVORITE", payload: postId });
  };

  if (!isloading) {
    if (invoices?.length !== 0)
      return (
        <div className="Posts--container">
          {invoices?.map((apost: Post) => {
            let isFavorite = undefined;
            if (favorites)
              isFavorite = favorites.map((fav) => fav._id).includes(apost._id);
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
      );
    else
      return (
        <div className="empty--Feed--container">
          <div className="empty--Feed--circle">
            <div className="empty--Feed">
              <FaHouseCrack className="empty--Feed--icon" />
              <h1>No Posts Found</h1>
            </div>
          </div>
        </div>
      );
  }
  return (
    <div className="Posts--container">
      <Post data={loadingPost} isFavorite={undefined} userId={undefined} />
    </div>
  );
}
