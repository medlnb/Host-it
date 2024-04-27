"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Reserving from "@components/Reserving";
import { FaArrowAltCircleLeft, FaWifi } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Review from "@components/Review";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiSolidWasher } from "react-icons/bi";
import { FaKitchenSet, FaTemperatureArrowUp } from "react-icons/fa6";
import {
  MdLocalParking,
  MdOutlineElevator,
  MdOutlinePool,
} from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { BsFillHouseDownFill } from "react-icons/bs";
import { floatingConext } from "@Context/FloatingWinContext";

const amenitiesData = [
  { title: "Wifi", icon: <FaWifi /> },
  { title: "TV", icon: <PiTelevisionSimpleBold /> },
  { title: "Kitchen", icon: <FaKitchenSet /> },
  { title: "Washer", icon: <BiSolidWasher /> },
  { title: "Parking", icon: <MdLocalParking /> },
  { title: "Air conditioning", icon: <TbAirConditioning /> },
  { title: "Heater", icon: <FaTemperatureArrowUp /> },
  { title: "Pool", icon: <MdOutlinePool /> },
  { title: "Elevator", icon: <MdOutlineElevator /> },
];

interface Post {
  _id: string;
  poster: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  city: {
    name: string;
    id: number;
  };
  state: {
    name: string;
    id: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  resevedDates: { date: string; Duration: number; reservedBy: string }[];
  reseveRequests: { date: string; Duration: number; reservedBy: string }[];
  description?: string;
  amenities: string[];
  image: {
    display_url: string;
    delete_url: string;
  }[];
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
  const { HandleChangeChildren } = useContext(floatingConext);
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
              onClick={() => {
                HandleChangeChildren({
                  title: "Images",
                  content: (
                    <div
                      className="w-lvw flex overflow-y-auto"
                      style={{ height: "calc(100vh - 10rem)" }}
                    >
                      {data?.post.image.map((img) => (
                        <img
                          key={img.display_url}
                          className="image-fit w-full"
                          src={`${img.display_url}`}
                        />
                      ))}
                    </div>
                  ),
                });
              }}
            >
              <div className="md:w-1/2 w-full overflow-hidden">
                <img
                  className="w-full h-full image-fit hover:scale-125 duration-300"
                  src={`${data.post.image[0].display_url}`}
                  style={{ scrollSnapAlign: "center" }}
                />
              </div>
              <div
                className="md:w-1/2 w-full h-full grid grid-cols-2 gap-2"
                style={{ scrollSnapAlign: "center" }}
              >
                {data.post.image.map((img, index) => {
                  if (index !== 0 && index < 4)
                    return (
                      <div key={img.display_url} className="overflow-hidden">
                        <img
                          className="image-fit hover:scale-125 duration-300"
                          src={`${img.display_url}`}
                        />
                      </div>
                    );
                })}
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
          <div className="my-3 flex justify-between md:flex-row flex-col gap-3">
            <div className="left--info">
              <h1 className="mt-3 text-xl font-medium">{data.post.title}</h1>
              <h2 className="text-lg">{data.post.city.name}</h2>
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
          <APIProvider apiKey="AIzaSyBvdAJhlVyx2nd1imxk6m5BCza6N_l3T0Y">
            <div className="h-96 w-full my-5 rounded-md overflow-hidden relative">
              <Map
                defaultZoom={12}
                defaultCenter={{
                  lat: Number(data.post.location.lat),
                  lng: Number(data.post.location.lng),
                }}
                mapId="17c2e4987b812891"
                className="w-full h-full"
              >
                <AdvancedMarker
                  position={{
                    lat: Number(data.post.location.lat),
                    lng: Number(data.post.location.lng),
                  }}
                >
                  <Pin />
                  <BsFillHouseDownFill size={20} fill="#ea4335" />
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
          <div className="Hline" />
          {/* {overallReviewRate === 0 && "not rated yet"} */}
          {overallReviewRate ? (
            <div className="flex justify-center items-center gap-3 text-lg my-5">
              <p className="flex items-center gap-1">
                {overallReviewRate.overallReviewRate}
                <FaStar className="mb-0.5" />
              </p>
              •<p>{overallReviewRate.count} review</p>
            </div>
          ) : (
            <></>
          )}
          <section className="w-full my-5 rounded p-2 flex flex-row overflow-x-scroll gap-4 hide-scroll-bar">
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
