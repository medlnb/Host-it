"use client";
import Amenities from "@components/Amenities";
import PickLocation from "@components/PickLocation";
import PlaceDetails from "@components/PlaceDetails";
import PlaceInfo from "@components/PlaceInfo";
import PlaceType from "@components/PlaceType";
import Prices from "@components/Prices";
import { useSession } from "next-auth/react";
import { useState } from "react";

function CreatePost() {
  const { data: session } = useSession();
  // const [loadingPosting, setloadingPosting] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    type: "Villa",
    location: {
      selectedWilaya: {
        value: `Alger Centre$3.0404258$36.7681618`,
        label: "16\\Alger Centre",
      },
      selectedbaladiya: {
        value: `Alger Centre$3.0404258$36.7681618`,
        label: "16\\Alger Centre",
      },
      position: {
        lat: 36.7681618,
        lng: 3.0404258,
      },
      zoom: 8,
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
    image: [
      "https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=612x612&w=0&k=20&c=HOCqYY0noIVxnp5uQf1MJJEVpsH_d4WtVQ6-OwVoeDo=",
    ],
  });

  const HandlePost = async () => {
    const location = {
      lat: inputs.location.position.lat.toString(),
      lng: inputs.location.position.lng.toString(),
    };
    // setloadingPosting(true);
    const response = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poster: session?.user.id,
        ...inputs,
        city: inputs.location.selectedbaladiya.label.split("\\")[1],
        state: inputs.location.selectedWilaya.label.split("\\")[1],
        location,
        price: {
          perday: Number(inputs.price.perday.replace(" ", "")),
          permonth: Number(inputs.price.permonth.replace(" ", "")),
        },
      }),
    });
    if (response.ok) alert("Posted Successfully");
    // setloadingPosting(false);
  };

  // }, []);

  return (
    <div className="createpost--container">
      <PlaceType type={inputs.type} HandleChangeInputs={setInputs} />
      <div className="Hline" />
      <PickLocation address={inputs.location} HandleChangeInputs={setInputs} />
      <div className="Hline" />
      <PlaceDetails
        Bedrooms={inputs.Bedrooms}
        Bathrooms={inputs.Bathrooms}
        Guests={inputs.Guests}
        Beds={inputs.Beds}
        HandleChangeInputs={setInputs}
      />
      <div className="Hline" />
      <Amenities amenities={inputs.amenities} HandleChangeInputs={setInputs} />
      <div className="Hline" />
      <PlaceInfo
        info={{ title: inputs.title, description: inputs.description }}
        HandleChangeInputs={setInputs}
      />
      <div className="Hline" />
      <Prices price={inputs.price} HandleChangeInputs={setInputs} />
      <button id="btn" onClick={HandlePost}>
        <p id="btnText">Post</p>
        <div className="checked">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
          </svg>
        </div>
      </button>
    </div>
  );
}

export default CreatePost;
