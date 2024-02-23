"use client";
import Amenities from "@components/Amenities";
import PickLocation from "@components/PickLocation";
import PlaceDetails from "@components/PlaceDetails";
import PlaceInfo from "@components/PlaceInfo";
import PlaceType from "@components/PlaceType";
import Prices from "@components/Prices";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";

function Page() {
  const pathna = usePathname();
  const PostId = pathna.split("/")[pathna.split("/").length - 1];
  // const [loadingPosting, setloadingPosting] = useState(false);

  const [inputs, setInputs] = useState<any>(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`/api/post/${PostId}`);
      if (response.ok) {
        const data = await response.json();
        const location = {
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
        };
        setInputs({ ...data.post, location });
      }
    };
    getPost();
  }, []);
  const HandlePatch = async () => {
    const location = {
      lat: inputs.location.position.lat.toString(),
      lng: inputs.location.position.lng.toString(),
    };
    // setloadingPosting(true);
    const post = {
      ...inputs,
      city: inputs.location.selectedbaladiya.label.split("\\")[1],
      state: inputs.location.selectedWilaya.label.split("\\")[1],
      location,
    };
    const response = await fetch("/api/post/new", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post }),
    });
    if (response.ok) alert("Patched Successfully");
    // setloadingPosting(false);
  };

  // }, []);

  return (
    <div className="createpost--container">
      {inputs ? (
        <>
          <PlaceType type={inputs.type} HandleChangeInputs={setInputs} />
          <div className="Hline" />
          <PickLocation
            address={inputs.location}
            HandleChangeInputs={setInputs}
          />
          <div className="Hline" />
          <PlaceDetails
            Bedrooms={inputs.Bedrooms}
            Bathrooms={inputs.Bathrooms}
            Guests={inputs.Guests}
            Beds={inputs.Beds}
            HandleChangeInputs={setInputs}
          />
          <div className="Hline" />
          <Amenities
            amenities={inputs.amenities}
            HandleChangeInputs={setInputs}
          />
          <div className="Hline" />
          <PlaceInfo
            info={{ title: inputs.title, description: inputs.description }}
            HandleChangeInputs={setInputs}
          />
          <div className="Hline" />
          <Prices price={inputs.price} HandleChangeInputs={setInputs} />
          <button id="btn" onClick={HandlePatch}>
            <p id="btnText">Post</p>
            <div className="checked">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path
                  fill="transparent"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                ></path>
              </svg>
            </div>
          </button>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <BeatLoader size={40} style={{ width: "20rem" }} />
        </div>
      )}
    </div>
  );
}

export default Page;
