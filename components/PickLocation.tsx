"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import "@styles/CreatePost.css";
import { useLoadScript } from "@react-google-maps/api";
import AlgerianCities from "@public/AlgerianCities.json";
import Select from "react-select";
import { useState } from "react";

import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { BsFillHouseDownFill } from "react-icons/bs";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface City {
  id: string;
  post_code: string;
  name: string;
  wilaya_id: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

function PickLocation({ address, HandleChangeInputs }: any) {
  const wilayaoptions = AlgerianCities.map((city: City[]) => ({
    value: `${city[0].name}$${city[0].latitude}$${city[0].longitude}$${city[0].latitude}$${city[0].longitude}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));
  const Baladiyaoptions = AlgerianCities[
    Number(address.selectedWilaya.label.split("\\")[0]) - 1
  ].map((city: City) => ({
    value: `${city.name}$${city.latitude}$${city.longitude}$${city.latitude}$${city.longitude}`,
    label: `${city.wilaya_id}\\ ${city.name}`,
  }));

  const HandleWilayaChange = async (e: any) => {
    HandleChangeInputs((prev: any) => ({
      ...prev,
      location: {
        ...prev.location,
        selectedWilaya: { value: e.value, label: e.label },
        selectedbaladiya: { value: e.value, label: e.label },
        position: {
          lat: Number(e.value.split("$")[2]),
          lng: Number(e.value.split("$")[1]),
        },
      },
    }));
  };
  const HandleBaladiyaChange = async (e: any) => {
    HandleChangeInputs((prev: any) => ({
      ...prev,
      location: {
        ...prev.location,
        selectedbaladiya: { value: e.value, label: e.label },
        position: {
          lat: Number(e.value.split("$")[2]),
          lng: Number(e.value.split("$")[1]),
        },
      },
    }));
  };
  const HandlePositionChange = (dirrection: string) => {
    const zoomLvl =
      address.zoom < 7
        ? 1
        : address.zoom < 10
        ? 0.01
        : address.zoom < 15
        ? 0.005
        : address.zoom < 17
        ? 0.001
        : 0.0005;

    switch (dirrection) {
      case "top":
        HandleChangeInputs((prev: any) => ({
          ...prev,
          location: {
            ...prev.location,
            position: {
              lat: prev.location.position.lat + zoomLvl,
              lng: prev.location.position.lng,
            },
          },
        }));
        break;
      case "right":
        HandleChangeInputs((prev: any) => ({
          ...prev,
          location: {
            ...prev.location,
            position: {
              lat: prev.location.position.lat,
              lng: prev.location.position.lng + zoomLvl,
            },
          },
        }));
        break;
      case "bottom":
        HandleChangeInputs((prev: any) => ({
          ...prev,
          location: {
            ...prev.location,
            position: {
              lat: prev.location.position.lat - zoomLvl,
              lng: prev.location.position.lng,
            },
          },
        }));
        break;
      case "left":
        HandleChangeInputs((prev: any) => ({
          ...prev,
          location: {
            ...prev.location,
            position: {
              lat: prev.location.position.lat,
              lng: prev.location.position.lng - zoomLvl,
            },
          },
        }));
        break;
    }
  };
  return (
    <>
      {/* <PlaceAutocomplete /> */}
      <div className="select-wilaya">
        <h3>Wilaya:</h3>
        <Select
          options={wilayaoptions}
          value={address.selectedWilaya}
          onChange={HandleWilayaChange}
        />
      </div>
      <div className="select-wilaya">
        <h3>Baladia:</h3>
        <Select
          options={Baladiyaoptions}
          value={address.selectedbaladiya}
          onChange={HandleBaladiyaChange}
          className="select-wilaya"
        />
      </div>
      {/* {isLoaded ? ( */}
      <div className="createpost--maps--containter">
        <APIProvider
          apiKey="AIzaSyBvdAJhlVyx2nd1imxk6m5BCza6N_l3T0Y"
          libraries={["places"]}
        >
          <div className="createpost--maps">
            <Map
              defaultZoom={8}
              center={address.position}
              mapId="e3e3e3e3e3e3e3e3"
              onZoomChanged={(e) => {
                HandleChangeInputs((prev: any) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    zoom: e.detail.zoom,
                  },
                }));
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <AdvancedMarker
                position={address.position}
                draggable
                onDragEnd={(e: any) => {
                  HandleChangeInputs((prev: any) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      position: {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      },
                    },
                  }));
                }}
              >
                <Pin />
                <BsFillHouseDownFill size={20} fill="#ea4335" />
              </AdvancedMarker>
            </Map>
            <FaArrowAltCircleUp
              className="map-navig"
              onClick={() => HandlePositionChange("top")}
              id="top"
            ></FaArrowAltCircleUp>
            <FaArrowAltCircleRight
              className="map-navig"
              onClick={() => HandlePositionChange("right")}
              id="right"
            ></FaArrowAltCircleRight>
            <FaArrowAltCircleDown
              className="map-navig"
              onClick={() => HandlePositionChange("bottom")}
              id="bottom"
            ></FaArrowAltCircleDown>
            <FaArrowAltCircleLeft
              className="map-navig"
              onClick={() => HandlePositionChange("left")}
              id="left"
            ></FaArrowAltCircleLeft>
          </div>
        </APIProvider>
      </div>
    </>
  );
}
{
}
export default PickLocation;

// const PlaceAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete();
//   return (
//     <Combobox>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder="Enter an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => {
//               console.log(place_id, description);
//               return <ComboboxOption key={place_id} value={description} />;
//             })}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };
