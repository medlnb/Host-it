import { useState } from "react";

function InfoFilter({
  beds,
  bedrooms,
  bathrooms,
}: {
  beds: string;
  bedrooms: string;
  bathrooms: string;
}) {
  const [selectedinfo, setSelectedinfo] = useState({
    beds: beds,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
  });
  return (
    <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
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
  );
}

export default InfoFilter;
