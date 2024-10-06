"use client";
import { useContext, useState } from "react";
import { floatingConext } from "@Context/FloatingWinContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PriceFilter from "./PriceFilter";
import LocationFilter from "./LocationFilter";
import AmentiesFilter from "./AmentiesFilter";
import InfoFilter from "./InfoFilter";

interface props {
  wilaya: string;
  baladia: string;
  LowPrice: string | 100;
  HighPrice: string | 10000;
  beds: string;
  bedrooms: string;
  bathrooms: string;
  amenties: string[];
}

const FilterWindow = ({
  wilaya,
  baladia,
  LowPrice,
  HighPrice,
  beds,
  bedrooms,
  bathrooms,
  amenties,
}: props) => {
  const [Step, setStep] = useState("Price");

  const { setToggle } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const [querries, setQuerries] = useState({
    LowPrice: Number(LowPrice),
    HighPrice: Number(HighPrice),
    amenties,
    wilaya,
    baladia,
    bedrooms,
    bathrooms,
    beds,
  });

  const HandleFilterChange = (
    params: URLSearchParams,
    setToggle: (toggle: boolean) => void,
    pathname: string,
    replace: (url: string) => void
  ) => {
    if (querries.baladia != "0") params.set("baladia", querries.baladia);
    else params.delete("baladia");

    if (querries.amenties.length !== 0)
      params.set("amenties", querries.amenties.join(","));
    else params.delete("amenties");

    if (querries.wilaya != "0") params.set("wilaya", querries.wilaya);
    else params.delete("wilaya");

    if (querries.beds != "0") params.set("beds", querries.beds);
    else params.delete("beds");

    if (querries.bedrooms != "0") params.set("bedrooms", querries.bedrooms);
    else params.delete("bedrooms");

    if (querries.bathrooms != "0") params.set("bathrooms", querries.bathrooms);
    else params.delete("bathrooms");

    if (querries.HighPrice != 10000)
      params.set("HighPrice", querries.HighPrice.toString());
    else params.delete("HighPrice");

    if (querries.LowPrice != 100)
      params.set("LowPrice", querries.LowPrice.toString());
    else params.delete("LowPrice");

    replace(`${pathname}?${params.toString()}`);

    setToggle(false);
  };
  const HandleApply = () => {
    HandleFilterChange(params, setToggle, pathname, replace);
  };

  const HandleReset = () => {
    replace(`${pathname}`);
    setToggle(false);
  };
  return (
    <div className="w-[50rem] max-h-[85lvh] max-w-[95vw] md:p-8 p-2 pt-0 md:pt-0 overflow-y-scroll hide-scroll-bar flex flex-col justify-between">
      <div className="flex items-center justify-around">
        <button
          className="bg-rose-500 text-white py-2 px-4 rounded-md cursor-pointer hover:border-black"
          onClick={HandleApply}
        >
          Apply
        </button>
        <button
          className="border border-gray-500 bg-none py-2 px-4 rounded-md cursor-pointer hover:border-black"
          onClick={HandleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;
