"use client";
import AlgerianCities from "@public/AlgerianCities.json";
import Slider from "@mui/material/Slider";
import Select from "react-select";
import { useState } from "react";

interface props {
  HandleFilterChange: any;
  LowPrice: string;
  HighPrice: string;
  wilaya: string;
  baladia: string;
  bedrooms: string;
  bathrooms: string;
  beds: string;
}
const FilterWindow = ({
  HandleFilterChange,
  wilaya,
  baladia,
  LowPrice,
  HighPrice,
  beds,
  bedrooms,
  bathrooms,
}: any) => {
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
  const wilayaoptions = AlgerianCities.map((city: any) => ({
    value: `${city[0].wilaya_id}\\ ${city[0].name}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));
  let Baladiyaoptions: { value: string; label: string }[] = [];
  if (address.selectedWilaya.value === "none") Baladiyaoptions = [];
  else
    Baladiyaoptions = AlgerianCities[
      Number(address.selectedWilaya.label.split("\\")[0]) - 1
    ].map((city: any) => ({
      value: `${city.wilaya_id}\\ ${city.name}`,
      label: `${city.wilaya_id}\\ ${city.name}`,
    }));

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
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [selectedinfo, setSelectedinfo] = useState({
    beds: beds,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
  });

  const HandleApply = () => {
    const qurries = {
      LowPrice: value[0].toString(),
      HighPrice: value[1].toString(),
      amenties: selectedAmenities.join(","),
      wilaya:
        address.selectedWilaya.value === "none"
          ? null
          : address.selectedWilaya.value,
      baladia:
        address.selectedBaladiya.value === "none"
          ? null
          : address.selectedBaladiya.value,
      bedrooms: selectedinfo.bedrooms,
      bathrooms: selectedinfo.bathrooms,
      beds: selectedinfo.beds,
    };
    HandleFilterChange(qurries);
  };
  return (
    <div className="Filter--container">
      <div className="filter--cati">
        <h1>Price range</h1>
        <p>price per night</p>
        <Slider
          style={{ marginTop: "3rem" }}
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
        <div className="price--filter--inputs">
          <input
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
      <div className="filter--cati">
        <h1>Location</h1>
        <p>wilaya</p>
        <Select
          options={[{ label: "Wilaya", value: "none" }, ...wilayaoptions]}
          value={address.selectedWilaya}
          onChange={(e) => {
            if (e) setAddress({ selectedBaladiya: e, selectedWilaya: e });
          }}
        />
        {address.selectedWilaya.value !== "none" ? (
          <>
            <p>baladiya</p>
            <Select
              options={Baladiyaoptions}
              value={address.selectedBaladiya}
              onChange={(e) => {
                if (e) setAddress((prev) => ({ ...prev, selectedBaladiya: e }));
              }}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="filter--cati">
        <h1>Amenties</h1>
        <div className="amenties--filter">
          {amenitiesData.map((amenity) => (
            <div
              key={amenity}
              className={`amenity--item ${
                selectedAmenities.includes(amenity) ? "amenity-active" : ""
              }`}
              onClick={() =>
                setSelectedAmenities((prev) =>
                  prev.includes(amenity)
                    ? prev.filter((item) => item !== amenity)
                    : [...prev, amenity]
                )
              }
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
      <div className="filter--cati">
        <h1>Info</h1>
        <div className="info--filters">
          <p>Bedrooms</p>
          <div className="info--filter">
            {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
              <div
                key={item}
                className={`info--item ${
                  selectedinfo.bedrooms === item ? "info-active" : ""
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
          <div className="info--filter">
            {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
              <div
                key={item}
                className={`info--item ${
                  selectedinfo.bathrooms === item ? "info-active" : ""
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
          <div className="info--filter">
            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
              (item) => (
                <div
                  key={item}
                  className={`info--item ${
                    selectedinfo.beds === item ? "info-active" : ""
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
      <div className="filter--submits">
        <button
          className="filter--button"
          style={{ background: "#5676ff" }}
          onClick={HandleApply}
        >
          Apply
        </button>
        <button className="filter--button">Reset</button>
      </div>
    </div>
  );
};

export default FilterWindow;
