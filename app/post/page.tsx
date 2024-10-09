import { FaWifi } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiSolidWasher } from "react-icons/bi";
import { FaKitchenSet, FaTemperatureArrowUp } from "react-icons/fa6";
import {
  MdLocalParking,
  MdOutlineElevator,
  MdOutlinePool,
} from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import Reserving from "@components/Reserving";
import PlaceLocation from "./PlaceLocation";
import { FaMapLocationDot } from "react-icons/fa6";
import SwiperFeed from "./SwiperFeed";

interface Post {
  _id: string;
  title: string;
  type: string;
  price: { perday: number; permonth: number };
  city: string;
  state: string;
  location: {
    lat: number;
    lng: number;
  };
  resevedDates: { firstDay: string; lastDay: string; reservedBy: string }[];
  reseveRequests: { firstDay: string; lastDay: string; reservedBy: string }[];
  description?: string;
  amenities: string[];
  images: string[];
  Bedrooms: Number;
  Bathrooms: Number;
  Guests: Number;
  Beds: Number;
  poster: {
    email: string;
    name: string;
    image: string;
    createdAt: string;
  };
}

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

async function page({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  const res = await fetch(`${process.env.Url}/api/post/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) return <div>Post not found</div>;
  const post: Post = await res.json();
  return (
    <main>
      <SwiperFeed imageUrls={post.images} />

      <div className="p-1">
        <div className="my-3 flex justify-between md:flex-row flex-col gap-3">
          <div className="left--info">
            <section className="flex items-center justify-between mt-3">
              <h1 className="text-2xl font-semibold">{post.title}</h1>
              <div className="flex items-center gap-2">
                <h2 className="text-lg">{post.state}</h2>
                <FaMapLocationDot size={30} />
              </div>
            </section>
            <div className="mt-2 flex gap-2">
              <p
                style={{ whiteSpace: "nowrap" }}
              >{`${post.Bedrooms} Bedrooms `}</p>
              •
              <p
                style={{ whiteSpace: "nowrap" }}
              >{`${post.Bathrooms} Bathrooms `}</p>
              •<p style={{ whiteSpace: "nowrap" }}>{`${post.Beds} Beds `}</p>•
              <p style={{ whiteSpace: "nowrap" }}>{`${post.Guests} Guests `}</p>
            </div>
            <div className="inline-flex items-center gap-2 mt-2 text-gray-800 text-sm p-2 rounded-md">
              <img
                src={post.poster.image}
                className="md:w-14 md:h-14 h-10 w-10 rounded-full image-fit"
              />
              <div>
                <h2>Hosted by {post.poster.name}</h2>
                <h3 className="text-gray-400">
                  {`been here since ${new Date(
                    post.poster.createdAt
                  ).getFullYear()}-${
                    new Date(post.poster.createdAt).getMonth() + 1
                  }-${new Date(post.poster.createdAt).getDay()}`}
                </h3>
              </div>
            </div>
            <p className="my-3 p-3 border border-gray-200 rounded-md shadow-sm">
              {post.description}
            </p>
            <div className="Hline" />

            <h2 className="mt-3 font-semibold">What this place offers</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {amenitiesData.map((amenitie) => {
                if (post.amenities.includes(amenitie.title))
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

          <div className="max-w-full md:m-0 my-9 w-[30rem]">
            <div className="border border-gray-300 shadow-md rounded-md p-6">
              <div className="my-3">
                <div className="flex items-end gap-2">
                  <h2 className="font-semibold">{`${post.price.perday} DA`}</h2>
                  <p>/pernight</p>
                </div>
                {post.price.permonth !== post.price.perday * 30 && (
                  <div className="flex items-end gap-2">
                    <h2 className="font-semibold">{`${post.price.permonth} DA`}</h2>
                    <p>/permonth</p>
                  </div>
                )}
              </div>
              <Reserving
                postId={post._id}
                resevedDates={post.resevedDates}
                price={post.price}
              />
            </div>
          </div>
        </div>

        <PlaceLocation
          location={post.location}
          MapsAPIKey={process.env.MapsAPIKey}
          MapId={process.env.MapId}
        />
      </div>
    </main>
  );
}

export default page;
