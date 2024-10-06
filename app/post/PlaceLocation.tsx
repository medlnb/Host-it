"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { BsFillHouseDownFill } from "react-icons/bs";

function PlaceLocation({
  location,
  MapsAPIKey,
  MapId,
}: {
  location: { lat: number; lng: number };
  MapsAPIKey?: string;
  MapId?: string;
}) {
  if (!MapsAPIKey || !MapId) return null;
  return (
    <APIProvider apiKey={MapsAPIKey}>
      <div className="h-96 w-full my-5 rounded-md overflow-hidden relative">
        <Map
          defaultZoom={12}
          defaultCenter={{
            lat: Number(location.lat),
            lng: Number(location.lng),
          }}
          mapId={MapId}
          className="w-full h-full"
        >
          <AdvancedMarker
            position={{
              lat: Number(location.lat),
              lng: Number(location.lng),
            }}
          >
            <Pin />
            <BsFillHouseDownFill size={20} fill="#ea4335" />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

export default PlaceLocation;
