"use client";
import { useContext, useState } from "react";
import { floatingConext } from "@Context/FloatingWinContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HandleFilterChange } from "@components/Posts";
import PriceFilter from "./PriceFilter";
import LocationFilter from "./LocationFilter";
import AmentiesFilter from "./AmentiesFilter";
import InfoEditer from "./InfoEditer";
import InfoFilter from "./InfoFilter";

interface props {
  LowPrice: string;
  HighPrice: string;
  stateId: number;
  cityId: number;
  bedrooms: string;
  bathrooms: string;
  beds: string;
  amenties: string[] | null;
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
}: any) => {
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
  // const HandleApply = () => {
  //   const qurries = {
  //     LowPrice: value[0].toString(),
  //     HighPrice: value[1].toString(),
  //     amenties: selectedAmenities?.join(","),
  //     wilaya: address.selectedWilaya === "0" ? null : address.selectedWilaya,
  //     baladia:
  //       address.selectedBaladiya === "0" ? null : address.selectedBaladiya,
  //     bedrooms: selectedinfo.bedrooms,
  //     bathrooms: selectedinfo.bathrooms,
  //     beds: selectedinfo.beds,
  //   };
  //   HandleFilterChange(qurries, params, setToggle, pathname, replace);
  // };

  const HandleReset = () => {
    const qurries = {
      LowPrice: "100",
      HighPrice: "10000",
      amenties: "",
      wilaya: undefined,
      baladia: undefined,
      bedrooms: "0",
      bathrooms: "0",
      beds: "0",
    };
    HandleFilterChange(qurries, params, setToggle, pathname, replace);
  };
  return (
    <div
      className="md:p-8 p-2 pt-0 md:pt-0 overflow-y-scroll hide-scroll-bar flex flex-col justify-between"
      style={{
        width: "50rem",
        maxHeight: "85lvh",
        maxWidth: "95vw",
      }}
    >
      <FilterNav Step={Step} setStep={setStep} />
      <div>
        {Step === "Price" && (
          <PriceFilter
            HighPrice={querries.HighPrice}
            LowPrice={querries.LowPrice}
            setQuerries={setQuerries}
          />
        )}
        {Step === "Location" && (
          <LocationFilter wilaya={querries.wilaya} baladia={querries.baladia} />
        )}
        {Step === "Amenties" && <AmentiesFilter amenties={querries.amenties} />}
        {Step === "Guests" && (
          <InfoFilter
            beds={querries.beds}
            bedrooms={querries.bedrooms}
            bathrooms={querries.bathrooms}
          />
        )}
      </div>
      <div className="flex items-center justify-around">
        <button
          className="bg-rose-500 text-white py-2 px-4 rounded-md cursor-pointer hover:border-black"
          // onClick={HandleApply}
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

const FilterNav = ({ Step, setStep }: { Step: string; setStep: any }) => {
  const Navs = ["Price", "Location", "Amenties", "Guests"];
  return (
    <nav className="flex justify-around mb-2">
      {Navs.map((element) => (
        <div
          onClick={() => setStep(element)}
          key={element}
          className={`p-2 flex-1 text-center font-medium hover:bg-gray-100 hover:cursor-pointer ${
            Step === element && "border-b border-black"
          }`}
        >
          {element}
        </div>
      ))}
    </nav>
  );
};
