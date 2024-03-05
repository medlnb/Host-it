"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
        <div className="py-3 md:px-28 px-3 text-sm">
          <div className="w-full relative">
            <div
              style={{
                gridTemplateColumns: "100% 100%",
                scrollSnapType: "x mandatory",
              }}
              className="w-full md:flex grid gap-2 rounded-md md:overflow-hidden overflow-x-scroll hide-scroll-bar"
              ref={Ref}
            >
              <img
                className="md:w-1/2 w-full image-fit"
                src={data.post.image[0]}
                style={{ scrollSnapAlign: "center" }}
              />
              <div
                className="md:w-1/2 w-full h-full grid grid-cols-2 gap-2"
                style={{ scrollSnapAlign: "center" }}
              >
                <img className="image-fit" src={data.post.image[0]} />
                <img className="image-fit" src={data.post.image[0]} />
                <img className="image-fit" src={data.post.image[0]} />
                <img className="image-fit " src={data.post.image[0]} />
              </div>
              <FaArrowAltCircleRight
                className="md:hidden block absolute top-1/2 transform -translate-y-1/2 right-1"
                onClick={handleScrollRight}
                fill="gray"
                size={25}
              />
              <FaArrowAltCircleLeft
                fill="gray"
                size={25}
                className="md:hidden block absolute top-1/2 transform -translate-y-1/2 left-1"
                onClick={handleScrollLeft}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between md:flex-row flex-col gap-3">
            <div className="left--info">
              <h1 className="mt-3">{data.post.title}</h1>
              <h2>{data.post.city}</h2>
              <p className="mt-2 flex gap-2">
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
              <div className="inline-flex items-center gap-2 mt-2 text-gray-800 text-sm p-2 rounded-md">
                <img
                  src={data.poster.image}
                  className="md:w-14 md:h-14 h-10 w-10 rounded-full image-fit"
                />
                <div>
                  <h2>Hosted by {data.poster.name}</h2>
                  <h3 className="text-gray-400">
                    {`been here since ${posterDate?.getFullYear()}-${
                      1 // posterDate?.getMonth() + 1
                    }-${posterDate?.getDay()}`}
                  </h3>
                </div>
              </div>
              <p className="my-3 p-3 border border-gray-200 rounded-md shadow-sm">
                {" "}
                {data.post.description}
              </p>
              <div className="Hline" />

              <h2 className="mt-3">What this place offers</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenitiesData.map((amenitie) => {
                  if (data.post.amenities.includes(amenitie.title))
                    return (
                      <div
                        className="flex items-center gap-2 p-2 border border-gray-300 rounded-md text-gray-800 text-sm"
                        key={amenitie.title}
                      >
                        {amenitie.icon} {amenitie.title}
                      </div>
                    );
                })}
              </div>
            </div>
            <div className="max-w-full md:m-0 my-9" style={{ width: "30rem" }}>
              <div className="border border-gray-300 shadow-md rounded-md p-6">
                <div className="flex justify-around my-3">
                  <div className="flex items-end gap-2">
                    <h2>{`${data.post.price.perday} DA`}</h2>
                    <p>/pernight</p>
                  </div>
                  {data.post.price.permonth !== data.post.price.perday * 30 && (
                    <div className="flex items-end gap-2">
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
            <div className="flex justify-center items-center gap-3 text-lg">
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
