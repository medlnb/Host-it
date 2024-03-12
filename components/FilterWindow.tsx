"use client";
import AlgerianCities from "@public/AlgerianCities.json";
import Slider from "@mui/material/Slider";
import Select from "react-select";
import { useContext, useState } from "react";
import { floatingConext } from "@Context/FloatingWinContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HandleFilterChange } from "@components/Posts";

interface props {
  LowPrice: string;
  HighPrice: string;
  stateId: number;
  cityId: number;
  bedrooms: string;
  bathrooms: string;
  beds: string;
  amenties: string[] | null;
}
const FilterWindow = ({
  wilaya,
  baladia,
  LowPrice,
  HighPrice,
  beds,
  bedrooms,
  bathrooms,
  amenties,
}: any) => {
  const { setToggle } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  function valuetext(value: number) {
    return `${value}DZ`;
  }

  const [value, setValue] = useState<number[]>([
    Number(LowPrice),
    Number(HighPrice),
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const [address, setAddress] = useState({
    selectedWilaya: wilaya,
    selectedBaladiya: baladia,
  });
  console.log(address);
  const wilayaoptions = AlgerianCities.map((city) => ({
    value: `${city[0].wilaya_id}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));
  const Baladiyaoptions =
    address.selectedWilaya === "0"
      ? []
      : AlgerianCities[Number(address.selectedWilaya) - 1].map(
          (city, index) => ({
            value: `${index}`,
            label: `${index}\\ ${city.name}`,
          })
        );

  const amenitiesData = [
    "Wifi",
    "TV",
    "Kitchen",
    "Washer",
    "Parking",
    "Air conditioning",
    "Heater",
    "Pool",
    "Elevator",
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[] | null>(
    amenties ?? []
  );

  const [selectedinfo, setSelectedinfo] = useState({
    beds: beds,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
  });

  const HandleApply = () => {
    const qurries = {
      LowPrice: value[0].toString(),
      HighPrice: value[1].toString(),
      amenties: selectedAmenities?.join(","),
      wilaya: address.selectedWilaya === "0" ? null : address.selectedWilaya,
      baladia:
        address.selectedBaladiya === "0" ? null : address.selectedBaladiya,
      bedrooms: selectedinfo.bedrooms,
      bathrooms: selectedinfo.bathrooms,
      beds: selectedinfo.beds,
    };
    HandleFilterChange(qurries, params, setToggle, pathname, replace);
  };

  const HandleReset = () => {
    const qurries = {
      LowPrice: "100",
      HighPrice: "10000",
      amenties: "",
      wilaya: undefined,
      baladia: undefined,
      bedrooms: "0",
      bathrooms: "0",
      beds: "0",
    };
    HandleFilterChange(qurries, params, setToggle, pathname, replace);
  };
  return (
    <div
      className="md:p-8 p-2 overflow-y-scroll hide-scroll-bar"
      style={{ maxHeight: "85lvh", maxWidth: "95vw" }}
    >
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-white whitespace-nowrap">
          Price range
        </h1>
        <p>price per night</p>
        <Slider
          className="mt-12"
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          step={500}
          marks
          min={100}
          max={10000}
        />
        <div className="mt-4 flex md:flex-row flex-col justify-around items-center">
          <input
            className="p-2 rounded-md border border-black focus:outline-none"
            placeholder="min price..."
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                if (Number(e.target.value) < value[1])
                  setValue((prev) => [Number(e.target.value), prev[1]]);
                else setValue((prev) => [100, prev[1]]);
              }
            }}
          />
          -
          <input
            className="p-2 rounded-md border border-black focus:outline-none"
            placeholder="max price..."
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                if (Number(e.target.value) > value[0])
                  setValue((prev) => [prev[0], Number(e.target.value)]);
                else setValue((prev) => [prev[0], 10000]);
              }
            }}
          />
        </div>
      </div>
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-white whitespace-nowrap">
          Location
        </h1>
        <p>wilaya</p>
        <Select
          options={[{ label: "Wilaya", value: "0" }, ...wilayaoptions]}
          value={
            [{ label: "Wilaya", value: "0" }, ...wilayaoptions][
              Number(address.selectedWilaya)
            ]
          }
          onChange={(e) => {
            if (e)
              setAddress({
                selectedBaladiya: "0",
                selectedWilaya: e.value,
              });
          }}
        />
        {address.selectedWilaya !== "0" ? (
          <>
            <p>baladiya</p>
            <Select
              options={Baladiyaoptions}
              value={Baladiyaoptions[Number(address.selectedBaladiya)]}
              onChange={(e) => {
                if (e)
                  setAddress((prev) => ({
                    ...prev,
                    selectedBaladiya: e.value,
                  }));
              }}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-white whitespace-nowrap">
          Amenties
        </h1>
        <div className="flex md:gap-4 gap-2 flex-wrap">
          {amenitiesData.map((amenity) => (
            <div
              key={amenity}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                selectedAmenities?.includes(amenity)
                  ? "border-black"
                  : "border-gray-400"
              }`}
              onClick={() =>
                setSelectedAmenities((prev: any) =>
                  prev.includes(amenity)
                    ? prev.filter((item: any) => item !== amenity)
                    : [...prev, amenity]
                )
              }
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-white whitespace-nowrap">
          Info
        </h1>
        <div>
          <p>Bedrooms</p>
          <div className="flex justify-between flex-wrap gap-2 mt-2 mb-4">
            {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
              <div
                key={item}
                className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                  selectedinfo.bedrooms === item ? "bg-black text-white" : ""
                }`}
                onClick={() =>
                  setSelectedinfo((prev: any) => ({
                    ...prev,
                    bedrooms: item,
                  }))
                }
              >
                {item === "0" ? "any" : item === "7" ? "7+" : item}
              </div>
            ))}
          </div>
          <p>Bathrooms</p>
          <div className="flex justify-between flex-wrap gap-2 mt-2 mb-4">
            {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
              <div
                key={item}
                className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                  selectedinfo.bathrooms === item ? "bg-black text-white" : ""
                }`}
                onClick={() =>
                  setSelectedinfo((prev: any) => ({
                    ...prev,
                    bathrooms: item,
                  }))
                }
              >
                {item === "0" ? "any" : item === "7" ? "7+" : item}
              </div>
            ))}
          </div>
          <p>beds</p>
          <div className="flex justify-between flex-wrap gap-2 mt-2 mb-4">
            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
              (item) => (
                <div
                  key={item}
                  className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                    selectedinfo.beds === item ? "bg-black text-white" : ""
                  }`}
                  onClick={() =>
                    setSelectedinfo((prev: any) => ({
                      ...prev,
                      beds: item,
                    }))
                  }
                >
                  {item === "0" ? "any" : item === "11" ? "11+" : item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          className="border border-gray-500 bg-none py-2 px-4 rounded-md cursor-pointer hover:border-black"
          style={{ background: "#5676ff" }}
          onClick={HandleApply}
        >
          Apply
        </button>
        <button
          className="border border-gray-500 bg-none py-2 px-4 rounded-md cursor-pointer hover:border-black"
          onClick={HandleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;
