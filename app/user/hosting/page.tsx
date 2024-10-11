import { FaHouseCrack } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { cookies } from "next/headers";
import LoadImage from "@components/LoadImage";
import { Suspense } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  type: string;
  state: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  price: {
    perday: number;
    permonth: number;
  };
  Bedrooms: number;
  Bathrooms: number;
  Guests: number;
  Beds: number;
  amenities: string[];
  images: string[];
}

async function Page() {
  const res = await fetch(`${process.env.Url}/api/host`, {
    cache: "no-cache",
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) return <p>Error fetching Data</p>;
  const hostPosts: Post[] = await res.json();

  if (!hostPosts.length)
    return (
      <div className="flex justify-center items-center h-80 text-md text-black whitecpace-nowrap">
        <div className="w-64 h-64 relative rounded-full bg-gray-100">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <FaHouseCrack className="text-6xl" />
            <h1>No Posts Found</h1>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <h1 className="text-center">Hosting</h1>

      <div className="w-[60rem] grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3 max-w-full my-6 mx-auto">
        {hostPosts.map((post) => (
          <Host
            key={post._id}
            _id={post._id}
            title={post.title}
            city={post.city}
            state={post.state}
            image={post.images[0]}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;

const Host = ({
  _id,
  title,
  state,
  city,
  image,
}: {
  _id: string;
  title: String;
  state: string;
  city: string;
  image: string;
}) => {
  return (
    <div className="flex md:flex-col flex-row md:items-center items-start text-xs md:gap-4 gap-2 md:p-4 p-2 center-shadow rounded-md relative hover:outline hover:outline-1 hover:outline-gray-300">
      <Link href={`/post/${_id}`}>
        <Suspense
          fallback={
            <div className="md:w-full w-28 md:h-40 h-20 rounded-md bg-gray-300" />
          }
        >
          <LoadImage
            Url={image}
            Css="md:w-full w-28 md:h-40 h-20 rounded-md image-fit"
          />
        </Suspense>
      </Link>
      <div className="Hline w-full hidden md:block" />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-start flex-col">
          <h1>{title}</h1>
          <h2 className="text-gray-500">{`${state} ${
            state === city ? "" : ` ~ ${city}`
          }`}</h2>
        </div>
        <div className="md:text-lg text-xs cursor-pointer flex flex-col items-center gap-2">
          <Link href={`/user/hosting/managepost?postId=${_id}`}>
            <FaRegEdit className="ml-1" fill="black" />
          </Link>
          <Link href={`/user/hosting/reservemanager/${_id}`}>
            <FaHandshakeSimple />
          </Link>
        </div>
      </div>
    </div>
  );
};
