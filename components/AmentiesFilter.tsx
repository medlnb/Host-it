function AmentiesFilter({
  amenties,
  onChange,
}: {
  amenties: string[];
  onChange: (item: string) => void;
}) {
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

  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-3">
        {"I'ma need these in my place please"}
      </h1>
      <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
        <div className="flex gap-2 flex-wrap justify-center">
          {amenitiesData.map((amenity) => (
            <div
              key={amenity}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                amenties?.includes(amenity) ? "border-black" : "border-gray-400"
              }`}
              onClick={() => onChange(amenity)}
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AmentiesFilter;
