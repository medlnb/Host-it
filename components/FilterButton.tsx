import { useContext } from "react";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterWindow from "@components/FilterWindow";
import { useSearchParams } from "next/navigation";
import { floatingConext } from "@Context/FloatingWinContext";

function FilterButton() {
  const { HandleChangeChildren } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const queryParams = Array.from(params.keys()).filter(
    (key) => key !== "type" && key !== "query" && key !== "baladia"
  );
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
    <button
      className="bg-none border border-black px-3 py-2 cursor-pointer flex items-center gap-1 relative rounded-md hover:bg-gray-100 text-xs md:text-base"
      onClick={() =>
        HandleChangeChildren({ title: "Filter", content: filterwindow })
      }
    >
      <MdOutlineSettingsInputComposite />
      <label>Filter</label>
      {queryParams.length !== 0 && (
        <p className="bg-black absolute -right-1 -top-1 text-white text-xs w-4 h-4 rounded-full ">
          {queryParams.length}
        </p>
      )}
    </button>
  );
}

export default FilterButton;
