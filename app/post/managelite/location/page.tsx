"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import AlgerianCities from "@public/AlgerianCities.json";
import Select from "react-select";
import { BsFillHouseDownFill } from "react-icons/bs";

import "@reach/combobox/styles.css";
import { useContext } from "react";
import { NewPostContext } from "@Context/NewPostContext";

interface City {
  id: string;
  post_code: string;
  name: string;
  wilaya_id: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

function Page() {
  const {
    NewPost: { location, city, state },
    dispatch,
  } = useContext(NewPostContext);

  const wilayaoptions = AlgerianCities.map((city: City[]) => ({
    value: `${city[0].name}$${city[0].latitude}$${city[0].longitude}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));
  const Baladiyaoptions = AlgerianCities[state.id - 1].map(
    (city: City, index) => ({
      value: `${city.name}$${city.latitude}$${city.longitude}`,
      label: `${index}\\ ${city.name}`,
    })
  );

  const HandleWilayaChange = async (e: any) => {
    const loc = {
      name: e.value.split("$")[0],
      id: Number(e.label.split("\\")[0]),
    };

    dispatch({
      type: "CHANGE_CITYSTATE",
      payload: {
        state: loc,
        city: loc,
      },
    });
    dispatch({
      type: "CHANGE_LOCATION",
      payload: {
        lat: Number(e.value.split("$")[2]),
        lng: Number(e.value.split("$")[1]),
      },
    });
  };

  // CHANGE_LOCATION
  const HandleBaladiyaChange = async (e: any) => {
    const loc = {
      name: e.value.split("$")[0],
      id: Number(e.label.split("\\")[0]),
    };

    dispatch({
      type: "CHANGE_CITYSTATE",
      payload: {
        city: loc,
      },
    });
    dispatch({
      type: "CHANGE_LOCATION",
      payload: {
        lat: Number(e.value.split("$")[2]),
        lng: Number(e.value.split("$")[1]),
      },
    });
  };

  return (
    <div className="max-width45rem">
      <div className="w-full mt-5">
        <h3>Wilaya:</h3>
        <Select
          options={wilayaoptions}
          value={wilayaoptions[state.id - 1]}
          onChange={HandleWilayaChange}
        />
      </div>
      <div className="w-full">
        <h3>Baladia:</h3>
        <Select
          options={Baladiyaoptions}
          value={Baladiyaoptions[city.id]}
          onChange={HandleBaladiyaChange}
          className="w-full"
        />
      </div>
      <div>
        <APIProvider
          apiKey="AIzaSyBvdAJhlVyx2nd1imxk6m5BCza6N_l3T0Y"
          libraries={["places"]}
        >
          <div className="h-96 w-full my-5 rounded-md overflow-hidden relative">
            <Map
              defaultZoom={8}
              center={location}
              mapId="17c2e4987b812891"
              className="w-full h-full"
            >
              <AdvancedMarker
                position={location}
                draggable
                onDragEnd={(e: any) => {
                  dispatch({
                    type: "CHANGE_LOCATION",
                    payload: {
                      lat: Number(e.latLng.lat()),
                      lng: Number(e.latLng.lng()),
                    },
                  });
                }}
              >
                <Pin />
                <BsFillHouseDownFill size={20} fill="#ea4335" />
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
      </div>
    </div>
  );
}

export default Page;
