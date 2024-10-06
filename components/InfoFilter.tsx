function InfoFilter({
  beds,
  bedrooms,
  bathrooms,
  onChange,
}: {
  beds: string;
  bedrooms: string;
  bathrooms: string;
  onChange: ({
    beds,
    bedrooms,
    bathrooms,
  }: {
    beds?: string;
    bedrooms?: string;
    bathrooms?: string;
  }) => void;
}) {
  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-3">
        How many people r planing to join us?
      </h1>
      <div className="border border-gray-400 my-4 py-2 px-4 relative rounded-md text-center">
        <p className="font-semibold">Bedrooms</p>
        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-4">
          {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
            <div
              key={item}
              className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                bedrooms === item ? "bg-black text-white" : ""
              }`}
              onClick={() => onChange({ bedrooms: item })}
            >
              {item === "0" ? "any" : item === "7" ? "7+" : item}
            </div>
          ))}
        </div>
        <p className="font-semibold">Bathrooms</p>
        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-4">
          {["0", "1", "2", "3", "4", "5", "6", "7"].map((item) => (
            <div
              key={item}
              className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                bathrooms === item ? "bg-black text-white" : ""
              }`}
              onClick={() => onChange({ bathrooms: item })}
            >
              {item === "0" ? "any" : item === "7" ? "7+" : item}
            </div>
          ))}
        </div>
        <p className="font-semibold">beds</p>
        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-4">
          {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map(
            (item) => (
              <div
                key={item}
                className={`py-2 px-4 border border-gray-500 rounded-3xl cursor-pointer hover:border-black ${
                  beds === item ? "bg-black text-white" : ""
                }`}
                onClick={() => onChange({ beds: item })}
              >
                {item === "0" ? "any" : item === "11" ? "11+" : item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoFilter;
