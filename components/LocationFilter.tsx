import AlgerianCities from "@public/AlgerianCities.json";
import { useState } from "react";
import Select from "react-select";
function LocationFilter({
  wilaya,
  baladia,
  setQuerries,
}: {
  wilaya: string;
  baladia: string;
  setQuerries: React.Dispatch<
    React.SetStateAction<{
      LowPrice: number;
      HighPrice: number;
      amenties: any;
      wilaya: any;
      baladia: any;
      bedrooms: any;
      bathrooms: any;
      beds: any;
    }>
  >;
}) {
  const wilayaoptions = AlgerianCities.map((city) => ({
    value: `${city[0].wilaya_id}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));
  const Baladiyaoptions =
    wilaya === "0"
      ? []
      : AlgerianCities[Number(wilaya) - 1].map((city, index) => ({
          value: `${index}`,
          label: `${index}\\ ${city.name}`,
        }));
  return (
    <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
      <p>wilaya</p>
      <Select
        options={[{ label: "Wilaya", value: "0" }, ...wilayaoptions]}
        value={
          [{ label: "Wilaya", value: "0" }, ...wilayaoptions][Number(wilaya)]
        }
        onChange={(e) => {
          if (e)
            setQuerries((prev) => ({ ...prev, wilaya: e.value, baladia: "0" }));
        }}
      />
      {wilaya !== "0" ? (
        <>
          <p>baladiya</p>
          <Select
            options={Baladiyaoptions}
            value={Baladiyaoptions[Number(baladia)]}
            onChange={(e) => {
              if (e)
                setQuerries((prev) => ({
                  ...prev,
                  baladia: e.value,
                }));
            }}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default LocationFilter;
