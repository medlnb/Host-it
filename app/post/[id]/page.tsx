"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@styles/PostPage.css";
import Reserving from "@components/Reserving";
import { amenitiesData } from "@components/Amenities";

interface Post {
  _id: string;
  poster: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  location: {
    city: String;
    state: String;
    lat: String;
    lng: String;
  };
  resevedDates: { date: string; Duration: number; reservedBy: string }[];
  reseveRequests: { date: string; Duration: number; reservedBy: string }[];
  description?: string;
  amenities: string[];
  image: string[];
  basics: {
    Bedrooms: Number;
    Bathrooms: Number;
    Guests: Number;
    Beds: Number;
  };
}

function Page() {
  const { id } = useParams();

  const [data, setData] = useState<{
    post: Post;
    poster: { name: string; email: string; createdAt: Date; image?: string };
  } | null>(null);
  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);
  // console.log(post.reseveRequests);
  let posterDate = null;
  if (data) posterDate = new Date(data.poster.createdAt);

  return (
    <>
      {!data ? (
        <p>loading</p>
      ) : (
        <div className="postpage--container">
          <div className="postpage--topbar">
            <h1>{data.post.title}</h1>
            <div className="postpage--images">
              <img className="postpage--mainpic" src={data.post.image[0]} />
              <div className="little--images">
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
              </div>
            </div>
          </div>
          <div className="postpage--info">
            <div className="left--info">
              <h2 style={{ marginTop: "1rem" }}>{data.post.location.city}</h2>
              <p className="postpage--status">
                {Object.entries(data.post.basics).map(([key, value]) => {
                  if (key === "_id") return;
                  return <p key={key}>{`${value} ${key} `}</p>;
                })}
              </p>
              <div className="postpage--poster">
                <img src={data.poster.image} />
                <div>
                  <h2>Hosted by {data.poster.name}</h2>
                  <h2 style={{ color: "gray", fontSize: ".9rem" }}>
                    {`been here since ${posterDate?.getFullYear()}-${
                      1 // posterDate?.getMonth() + 1
                    }-${posterDate?.getDay()}`}
                  </h2>
                </div>
              </div>
              <p className="postpage--description"> {data.post.description}</p>
              {/* <h2>Type: {type}</h2>*/}
              <div className="Hline" />
              <h2 style={{ marginTop: "1rem" }}>What this place offers</h2>
              <div className="postpage--amenities">
                {amenitiesData.map((amenitie) => {
                  if (data.post.amenities.includes(amenitie.title))
                    return (
                      <div
                        className="postpage--amenities--element"
                        key={amenitie.title}
                      >
                        {amenitie.icon} {amenitie.title}
                      </div>
                    );
                })}
              </div>
            </div>
            <div className="right--info">
              <div className="pricing--container">
                <div className="pricing--price">
                  <div
                    style={{ display: "flex", alignItems: "end", gap: ".5rem" }}
                  >
                    <h2>{`${data.post.price.perday} DA`}</h2>
                    <p>/pernight</p>
                  </div>
                  {data.post.price.permonth !== data.post.price.perday * 30 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        gap: ".5rem",
                      }}
                    >
                      <h2>{`${data.post.price.permonth} DA`}</h2>
                      <p>/permonth</p>
                    </div>
                  )}
                </div>
                <Reserving
                  postId={data.post._id}
                  resevedDates={data.post.reseveRequests} //change this latter dont forget blz
                  price={data.post.price}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
