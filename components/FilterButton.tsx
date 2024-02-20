import React, { useContext } from "react";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterWindow from "./FilterWindow";
import { HandleFilterChange } from "./Posts";
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
  const wilaya = wilayadata
    ? { label: wilayadata, value: wilayadata }
    : { label: "Wilaya", value: "none" };
  const baladiadata = params.get("baladia");
  const baladia = baladiadata
    ? { label: baladiadata, value: baladiadata }
    : { label: "Baladia", value: "none" };

  const LowPrice = params.get("LowPrice") ?? 100;
  const HighPrice = params.get("HighPrice") ?? 10000;
  // const amenties = params.get("amenties") ?? "";
  const beds = params.get("beds") ?? "0";
  const bedrooms = params.get("bedrooms") ?? "0";
  const bathrooms = params.get("bathrooms") ?? "0";
  const filterwindow = (
    <FilterWindow
      HandleFilterChange={HandleFilterChange}
      wilaya={wilaya}
      baladia={baladia}
      LowPrice={LowPrice}
      HighPrice={HighPrice}
      beds={beds}
      bedrooms={bedrooms}
      bathrooms={bathrooms}
    />
  );
  return (
    <button
      className="filter-button"
      onClick={() => HandleChangeChildren(filterwindow)}
    >
      <MdOutlineSettingsInputComposite />
      Filter
      {queryParams.length !== 0 && (
        <p className="querries--index">{queryParams.length}</p>
      )}
    </button>
  );
}

export default FilterButton;
