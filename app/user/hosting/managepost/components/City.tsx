import AlgerianCities from "@public/AlgerianCities.json";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { BsFillHouseDownFill } from "react-icons/bs";
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { useCallback } from "react";

interface City {
  id: string;
  post_code: string;
  name: string;
  wilaya_id: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

function City({
  MapsAPIKey,
  MapId,
  value: { state, city, location },
  onChange,
}: {
  MapsAPIKey?: string;
  MapId?: string;
  value: {
    state: number;
    city: number;
    location: { lat: number; lng: number };
  };
  onChange: (value: {
    state?: number;
    city?: number;
    lat: number;
    lng: number;
  }) => void;
}) {
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    onChange({ lat: ev.detail.center.lat, lng: ev.detail.center.lng });
  }, []);

  const wilayaoptions = AlgerianCities.map((city: City[]) => ({
    id: `${city[0].wilaya_id}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));

  const Baladiyaoptions = AlgerianCities[state - 1].map(
    (city: City, index) => ({
      id: `${index}`,
      label: `${city.name}`,
    })
  );

  return (
    <div>
      <Autocomplete
        value={wilayaoptions[state - 1]}
        options={wilayaoptions}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Wilaya" />}
        onChange={(event, newValue) => {
          onChange({
            state: Number(newValue.id),
            city: 0,
            lat: Number(AlgerianCities[Number(newValue.id) - 1][0].latitude),
            lng: Number(AlgerianCities[Number(newValue.id) - 1][0].longitude),
          });
        }}
        disableClearable
      />

      <Autocomplete
        value={Baladiyaoptions[city]}
        options={Baladiyaoptions}
        fullWidth
        className="mt-5"
        renderInput={(params) => <TextField {...params} label="Baladiya" />}
        onChange={(event, newValue) => {
          onChange({
            city: Number(newValue.id),
            lat: Number(
              AlgerianCities[state - 1][Number(newValue.id)].latitude
            ),
            lng: Number(
              AlgerianCities[state - 1][Number(newValue.id)].longitude
            ),
          });
        }}
        disableClearable
      />
      {MapsAPIKey && MapId && (
        <APIProvider apiKey={MapsAPIKey}>
          <div className="h-96 w-full my-5 rounded-md">
            <Map
              defaultZoom={8}
              center={{ lat: location.lat, lng: location.lng }}
              onCameraChanged={handleCameraChange}
              mapId={MapId}
              className="w-full h-full"
            >
              <AdvancedMarker
                position={{
                  lat: Number(location.lat),
                  lng: Number(location.lng),
                }}
                draggable={false}
              >
                <BsFillHouseDownFill size={40} fill="#ea4335" />
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
      )}
    </div>
  );
}

export default City;
