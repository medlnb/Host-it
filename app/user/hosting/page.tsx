"use client";
import { useContext, useEffect, useState } from "react";
import { FaHouseCrack } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaHandshakeSimple } from "react-icons/fa6";
import { CurrentPostContext } from "@Context/CurrentPostContext";

interface Post {
  _id: string;
  title: string;
  type: string;
  state: {
    name: string;
    id: number;
  };
  city: {
    name: string;
    id: number;
  };
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
  image: { display_url: string }[];
}

function Page() {
  const { data: session } = useSession();
  // const [HostData, setHostData] = useState<
  //   | {
  //       _id: string;
  //       title: String;
  //       state: { name: string; id: number };
  //       city: { name: string; id: number };
  //       description: string;
  //       image: { display_url: string }[];
  //     }[]
  //   | null
  // >(null);
  const [HostData, setHostData] = useState<Post[] | null>(null);

  useEffect(() => {
    const getHostData = async () => {
      const response = await fetch(`/api/post/host/${session?.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setHostData(data);
      }
    };
    if (session) getHostData();
  }, [session]);

  return (
    <div>
      <h1 className="text-center">Hosting</h1>
      {HostData ? (
        HostData.length === 0 ? (
          <div className="flex justify-center items-center h-80 text-md text-black whitecpace-nowrap">
            <div className="w-64 h-64 relative rounded-full bg-gray-100">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                <FaHouseCrack className="text-6xl" />
                <h1>No Posts Found</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[60rem] grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3 max-w-full my-6 mx-auto">
            {HostData.map((post) => (
              <Host
                key={post._id}
                _id={post._id}
                title={post.title}
                city={post.city}
                state={post.state}
                image={post.image[0].display_url}
                post={post}
              />
            ))}
          </div>
        )
      ) : (
        "loading"
      )}
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
  post,
}: {
  _id: string;
  title: String;
  state: { name: string; id: number };
  city: { name: string; id: number };
  image: string;
  post: Post;
}) => {
  const router = useRouter();
  const { dispatch } = useContext(CurrentPostContext);
  return (
    <div
      className="flex md:flex-col flex-row md:items-center items-start text-xs md:gap-4 gap-2 md:p-4 p-2 center-shadow rounded-md relative hover:outline hover:outline-1 hover:outline-gray-300"
      onClick={() => {
        router.push(`/post/${_id}`);
      }}
    >
      <img
        src={image}
        className="md:w-full w-28 md:h-40 h-20 rounded-md image-fit"
      />
      <div className="Hline w-full hidden md:block" />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-start flex-col">
          <h1>{title}</h1>
          <h2 className="text-gray-500">{`${state.name} ${
            state.name === city.name ? "" : ` ~ ${city.name}`
          }`}</h2>
        </div>
        <div className="md:text-lg text-xs cursor-pointer flex flex-col items-center gap-2">
          <FaRegEdit
            className="ml-1"
            fill="black"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/user/hosting/managelite/type`);
              dispatch({ type: "SET_POST", payload: post });
            }}
          />
          <FaHandshakeSimple
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/user/hosting/reservemanager/${_id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
