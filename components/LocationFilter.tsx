import AlgerianCities from "@public/AlgerianCities.json";
import Select from "react-select";
function LocationFilter({
  wilaya,
  baladia,
  onChange,
}: {
  wilaya: string;
  baladia: string;
  onChange: (wilaya: string, baladia: string) => void;
}) {
  const wilayaoptions = AlgerianCities.map((city) => ({
    value: `${city[0].wilaya_id}`,
    label: `${city[0].wilaya_id}\\ ${city[0].name}`,
  }));

  return (
    <div className="mb-44 text-xs">
      <h1 className="text-center text-2xl font-medium mb-4">
        Where do u wanna go?
      </h1>

      <Select
        options={[{ label: "Wilaya", value: "0" }, ...wilayaoptions]}
        value={
          [{ label: "Wilaya", value: "0" }, ...wilayaoptions][Number(wilaya)]
        }
        onChange={(e) => {
          if (e) onChange(e.value, "0");
        }}
      />
      {wilaya !== "0" && (
        <Select
          className="mt-2"
          options={AlgerianCities[Number(wilaya) - 1].map((city, index) => ({
            value: `${index}`,
            label: `${index}\\ ${city.name}`,
          }))}
          value={
            AlgerianCities[Number(wilaya) - 1].map((city, index) => ({
              value: `${index}`,
              label: `${index}\\ ${city.name}`,
            }))[Number(baladia)]
          }
          onChange={(e) => {
            if (e) onChange(wilaya, e.value);
          }}
        />
      )}
    </div>
  );
}

export default LocationFilter;
