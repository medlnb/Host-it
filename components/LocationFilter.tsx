import AlgerianCities from "@public/AlgerianCities.json";
import { useState } from "react";
import Select from "react-select";
function LocationFilter({
  wilaya,
  baladia,
}: {
  wilaya: string;
  baladia: string;
}) {
  const [address, setAddress] = useState({
    selectedWilaya: wilaya,
    selectedBaladiya: baladia,
  });
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
  return (
    <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
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
  );
}

export default LocationFilter;
