"use client";
import { useEffect, useState } from "react";
import Type from "./components/Type";
import Info from "./components/Info";
import PlaceDetails from "./components/PlaceDetails";
import Amenities from "./components/Amenities";
import Price from "./components/Price";
import City from "./components/City";
import ImagePost from "./components/ImagePost";
import { notify } from "@components/Sonner";
import LoadImageClient from "@components/LoadImageClient";
import NewPostNav from "@components/NewPostNav";
import Loader from "@components/Loader";

function All({
  MapsAPIKey,
  MapId,
  postId,
}: {
  MapsAPIKey?: string;
  MapId?: string;
  postId?: string;
}) {
  const [nav, setNav] = useState(0);
  const [laodingPost, setLoadingPost] = useState(postId ? true : false);
  const [input, setInput] = useState<Post>({
    title: "",
    type: "",
    state: 1,
    city: 1,
    location: {
      lat: -0.4841573,
      lng: 27.9763317,
    },
    description: "",
    price: {
      perday: 0,
      permonth: 0,
    },
    Bedrooms: 0,
    Bathrooms: 0,
    Guests: 0,
    Beds: 0,
    amenities: [],
    images: [],
  });

  const HandleRemovePicture = async (id: string) => {
    const res = await fetch(`/api/image/${id}`, {
      method: "DELETE",
    });
    if (!res.ok)
      return notify({ type: "error", message: "Failed to delete image" });

    setInput((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== id),
    }));
  };

  const HandleSubmit = async () => {
    if (
      input.images.length < 5 ||
      input.title === "" ||
      input.type === "" ||
      input.description === "" ||
      input.price.perday === 0 ||
      input.price.permonth === 0 ||
      input.amenities.length === 0 ||
      input.state === 0 ||
      input.location.lat === 0 ||
      input.location.lng === 0
    )
      return notify({ type: "error", message: "Please fill all the fields" });

    const res = await fetch(`/api/post`, {
      method: postId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...input,
        images: input.images.map((image) => image.id),
      }),
    });

    if (!res.ok)
      return notify({
        type: "error",
        message: `Failed to ${postId ? "create" : "update"} post`,
      });

    notify({ type: "success", message: "Post created successfully" });
  };

  useEffect(() => {
    const FetchPost = async () => {
      const res = await fetch(`/api/host/${postId}`);
      if (!res.ok)
        return notify({ type: "error", message: "Failed to fetch post" });

      const post = await res.json();
      setLoadingPost(false);
      setInput({
        ...post,
        images: post.images.map((image: string) => ({ id: image })),
      });
    };

    if (postId) FetchPost();
  }, [postId]);

  if (laodingPost) return <Loader title="Fetching Post information" />;

  return (
    <>
      <main className="pb-20 max-w-[45rem] mx-auto">
        {nav === 0 ? (
          <Type
            value={input.type}
            onChange={(value) => {
              setInput((prev) => ({ ...prev, type: value }));
            }}
          />
        ) : nav === 1 ? (
          <Info
            value={{ title: input.title, description: input.description }}
            onChange={(value, key) => {
              setInput((prev) => ({ ...prev, [key]: value }));
            }}
          />
        ) : nav === 2 ? (
          <PlaceDetails
            value={{
              Bedrooms: input.Bedrooms,
              Bathrooms: input.Bathrooms,
              Guests: input.Guests,
              Beds: input.Beds,
            }}
            onChange={(operation, variable) => {
              if (operation === "-" && input[variable] === 0) return;

              setInput((prev) => ({
                ...prev,
                [variable]:
                  operation === "+" ? prev[variable] + 1 : prev[variable] - 1,
              }));
            }}
          />
        ) : nav === 3 ? (
          <Amenities
            value={input.amenities}
            onChange={(value: string, type: "Add" | "Remove") => {
              setInput((prev) => ({
                ...prev,
                amenities:
                  type === "Add"
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((amenitie) => amenitie !== value),
              }));
            }}
          />
        ) : nav === 4 ? (
          <Price
            value={input.price}
            onChange={(value, key) => {
              if (key === "perday")
                return setInput((prev) => ({
                  ...prev,
                  price: { perday: value, permonth: value * 30 },
                }));

              setInput((prev) => ({
                ...prev,
                price: { perday: prev.price.perday, permonth: value },
              }));
            }}
          />
        ) : nav === 5 ? (
          <City
            MapsAPIKey={MapsAPIKey}
            MapId={MapId}
            value={{
              city: input.city,
              state: input.state,
              location: input.location,
            }}
            onChange={(value) => {
              setInput((prev) => ({
                ...prev,
                city: value.city ?? prev.city,
                state: value.state ?? prev.state,
                location: {
                  lat: value.lat,
                  lng: value.lng,
                },
              }));
            }}
          />
        ) : (
          <div>
            <h3 className="text-xl text-center font-semibold mt-10 mb-4">
              Add the Images Here {input.images.length} / 5
            </h3>
            <div className="grid grid-cols-2 gap-2 ">
              {input.images.map((image, index) => (
                <div key={index} className="relative">
                  <p
                    className="absolute top-1 right-2.5 text-gray-500 hover:text-black font-semibold cursor-pointer"
                    onClick={() => {
                      HandleRemovePicture(image.id);
                    }}
                  >
                    X
                  </p>
                  {image.image ? (
                    <img
                      alt={`Image Post ${index}`}
                      src={image.image}
                      className="h-40 md:h-60 w-full object-cover border border-gray-800 overflow-hidden rounded-[1.5rem]"
                    />
                  ) : (
                    <LoadImageClient
                      Css="h-40 md:h-60 w-full object-cover border border-gray-800 overflow-hidden rounded-[1.5rem]"
                      Url={image.id}
                    />
                  )}
                </div>
              ))}
              <ImagePost
                clickMe="Click here to add Picture"
                HandleIsDone={(image, id) => {
                  setInput((prev) => ({
                    ...prev,
                    images: [...prev.images, { image, id }],
                  }));
                }}
              />
            </div>
          </div>
        )}
      </main>
      <NewPostNav
        type={postId ? "UPDATE" : "POST"}
        nav={nav}
        HandleRoute={(value) => {
          setNav(value);
        }}
        HandleSubmit={HandleSubmit}
      />
    </>
  );
}

export default All;

interface Post {
  title: string;
  type: string;
  state: number;
  city: number;
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
  images: { image?: string; id: string }[];
}
