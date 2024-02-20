"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
  resevedDateFrom?: Date[];
  resevedDateTo?: Date[];
  description?: string;
  amenities: string[];
  image: string[];
}

const Post = ({ data }: { data: Post }) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [favs, setFavs] = useState<string[]>([]);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    if (session?.user.favorites) setFavs(session?.user.favorites);
  }, [session]);

  const HandleClick = async (e: any) => {
    e.stopPropagation();
    setisloading(true);
    const response = await fetch("/api/auth/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        PostId: data._id,
      }),
    });

    if (response.ok) {
      update();
    }
    setisloading(false);
  };

  const HandleGetPage = () => {
    router.push(`/post/${data._id}`);
  };
  return (
    <div className="post--container" onClick={HandleGetPage}>
      {session &&
        (favs.includes(data._id) ? (
          <FaHeart
            className={`fav--icon ${isloading ? "jumping--icon" : ""}`}
            size={20}
            fill="white"
            onClick={HandleClick}
          />
        ) : (
          <FaRegHeart
            className={`fav--icon ${isloading ? "jumping--icon" : ""}`}
            size={20}
            fill="white"
            onClick={HandleClick}
          />
        ))}

      <img src={data.image[0]} className="post--picture" />
      <p>{data.title}</p>
      <p className="post--location">{`${data.state} - ${data.city}`}</p>
      <p>19 mar - 29mar</p>
      <p>{`${data.price.perday} DZD/per night`}</p>
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
  const [invoices, setInvoices] = useState<any[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
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
  return (
    <div className="Posts--container">
      {invoices ? (
        invoices.map((apost: Post) => <Post key={apost._id} data={apost} />)
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
