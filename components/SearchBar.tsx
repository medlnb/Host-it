"use client";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { useContext } from "react";
import { floatingConext } from "@Context/FloatingWinContext";
import FilterWindow from "@components/FilterWindow";

function SearchBar() {
  const searchParams = useSearchParams();
  const { HandleChangeChildren } = useContext(floatingConext);
  const params = new URLSearchParams(searchParams);

  const wilayadata = params.get("wilaya");
  const wilaya = wilayadata ? wilayadata : "0";
  const baladiadata = params.get("baladia");
  const baladia = baladiadata ? baladiadata : "0";

  const LowPrice = params.get("LowPrice") ?? 100;
  const HighPrice = params.get("HighPrice") ?? 10000;
  const amenties = params.get("amenties")
    ? params.get("amenties")?.split(",")
    : null;
  const beds = params.get("beds") ?? "0";
  const bedrooms = params.get("bedrooms") ?? "0";
  const bathrooms = params.get("bathrooms") ?? "0";
  const filterwindow = (
    <FilterWindow
      wilaya={wilaya}
      baladia={baladia}
      LowPrice={LowPrice}
      HighPrice={HighPrice}
      beds={beds}
      bedrooms={bedrooms}
      bathrooms={bathrooms}
      amenties={amenties}
    />
  );

  return (
    <div
      onClick={() =>
        HandleChangeChildren({
          title: "Filter Search",
          content: filterwindow,
        })
      }
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm px-6">
          {searchParams.get("query")?.toString()
            ? searchParams.get("query")?.toString()
            : "Anywhere"}
        </div>
        <div className="hidden sm:block text-losm px-6 border-x-[1px] flex-1 text-center">
          {"durationLabel"}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-center">{"guessLabel"}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
