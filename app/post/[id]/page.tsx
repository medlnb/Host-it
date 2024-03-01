"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@styles/PostPage.css";
import Reserving from "@components/Reserving";
import { amenitiesData } from "@components/Amenities";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Review from "@components/Review";

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
  resevedDates: { date: string; Duration: number; reservedBy: string }[];
  reseveRequests: { date: string; Duration: number; reservedBy: string }[];
  description?: string;
  amenities: string[];
  image: string[];
  Bedrooms: Number;
  Bathrooms: Number;
  Guests: Number;
  Beds: Number;
  reviews: { userId: string; rating: number; content: string }[];
}

const avrRate = (
  array: { userId: string; rating: number; content: string }[] | undefined
) => {
  if (!array) return null;
  if (array.length === 0) return 0;
  let overallReviewRate = 0;
  array.map((review) => {
    overallReviewRate = overallReviewRate + review.rating;
  });
  return {
    overallReviewRate: overallReviewRate / array.length,
    count: array.length,
  };
};

function Page() {
  const Ref = useRef<HTMLDivElement>(null);
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
  let posterDate = null;
  if (data) posterDate = new Date(data.poster.createdAt);

  const handleScrollRight = () => {
    if (Ref.current) {
      Ref.current.scrollLeft += 400;
    }
  };
  const handleScrollLeft = () => {
    if (Ref.current) {
      Ref.current.scrollLeft -= 400;
    }
  };

  const overallReviewRate = avrRate(data?.post.reviews);
  return (
    <>
      {!data ? (
        <div style={{ padding: "0 1rem" }}>
          <div className="post--picture loading--background" />
        </div>
      ) : (
        <div className="postpage--container">
          <div className="postpage--topbar">
            <div className="postpage--images" ref={Ref}>
              <img className="postpage--mainpic" src={data.post.image[0]} />
              <div className="little--images">
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
                <img className="little-image" src={data.post.image[0]} />
              </div>
              <FaArrowAltCircleRight
                className="postpage--button"
                style={{ right: ".5rem" }}
                onClick={handleScrollRight}
                fill="gray"
                size={25}
              />
              <FaArrowAltCircleLeft
                fill="gray"
                size={25}
                className="postpage--button"
                style={{ left: ".5rem" }}
                onClick={handleScrollLeft}
              />
            </div>
          </div>
          <div className="postpage--info">
            <div className="left--info">
              <h1 style={{ marginTop: "1rem" }}>{data.post.title}</h1>
              <h2>{data.post.city}</h2>
              <p className="postpage--status">
                <p
                  style={{ whiteSpace: "nowrap" }}
                >{`${data.post.Bedrooms} Bedrooms `}</p>
                •
                <p
                  style={{ whiteSpace: "nowrap" }}
                >{`${data.post.Bathrooms} Bathrooms `}</p>
                •
                <p
                  style={{ whiteSpace: "nowrap" }}
                >{`${data.post.Beds} Beds `}</p>
                •
                <p
                  style={{ whiteSpace: "nowrap" }}
                >{`${data.post.Guests} Guests `}</p>
              </p>
              <div className="postpage--poster">
                <img src={data.poster.image} />
                <div>
                  <h2>Hosted by {data.poster.name}</h2>
                  <h3 style={{ color: "gray" }}>
                    {`been here since ${posterDate?.getFullYear()}-${
                      1 // posterDate?.getMonth() + 1
                    }-${posterDate?.getDay()}`}
                  </h3>
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
                  resevedDates={data.post.resevedDates}
                  price={data.post.price}
                />
              </div>
            </div>
          </div>
          <div className="Hline my-5" />
          {overallReviewRate === 0 && "not rated yet"}
          {overallReviewRate ? (
            <div className="flex justify-center items-center gap-3 text-xl">
              <p className="flex items-center gap-1">
                {overallReviewRate.overallReviewRate}
                <FaStar className="mb-0.5" />
              </p>
              •<p>{overallReviewRate.count} review</p>
            </div>
          ) : (
            <></>
          )}
          <section className="w-full my-5 rounded p-2 flex flex-row overflow-x-scroll gap-4 md:grid-cols-4 md:grid hide-scroll-bar">
            {data.post.reviews.map((review, index) => (
              <Review
                key={index}
                userId={review.userId}
                rating={review.rating}
                content={review.content}
              />
            ))}
          </section>
        </div>
      )}
    </>
  );
}

export default Page;
