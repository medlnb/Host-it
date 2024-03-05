"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useContext } from "react";
import SearchBar from "@components/SearchBar";
import Table from "@components/Table";
import { BsFillBriefcaseFill } from "react-icons/bs";
import {
  FaBed,
  FaCaravan,
  FaHotel,
  FaHouseChimney,
  FaShop,
  FaWarehouse,
} from "react-icons/fa6";
import {
  MdApartment,
  MdBedroomChild,
  MdTerrain,
  MdVilla,
} from "react-icons/md";
import { PiGarageFill } from "react-icons/pi";
import { floatingConext } from "@Context/FloatingWinContext";
import FilterButton from "./FilterButton";

interface props {
  type?: string;
  LowPrice?: string;
  HighPrice?: string;
  amenties?: string;
  wilaya?: string;
  baladia?: string;
  bedrooms?: string;
  bathrooms?: string;
  beds?: string;
}

export const HandleFilterChange = (
  qurries: props,
  params: URLSearchParams,
  setToggle: (toggle: boolean) => void,
  pathname: string,
  replace: (url: string) => void
) => {
  const inputs: (
    | "type"
    | "LowPrice"
    | "HighPrice"
    | "amenties"
    | "wilaya"
    | "baladia"
    | "bedrooms"
    | "bathrooms"
    | "beds"
  )[] = [
    "type",
    "LowPrice",
    "HighPrice",
    "amenties",
    "wilaya",
    "baladia",
    "bedrooms",
    "bathrooms",
    "beds",
  ];
  for (var index = 0; index < inputs.length; index++) {
    const type = qurries[inputs[index]];

    if (type) params.set(inputs[index], type);
    // else params.delete(inputs[index]);
    if (inputs[index] === "baladia" && !type) params.delete("baladia");
    if (inputs[index] === "amenties" && !type) params.delete("amenties");
    if (inputs[index] === "wilaya" && !type) params.delete("wilaya");

    if (inputs[index] === "type" && type === "none") params.delete("type");
    if (inputs[index] === "beds" && type === "0") params.delete("beds");

    if (inputs[index] === "bedrooms" && type === "0") params.delete("bedrooms");

    if (inputs[index] === "bathrooms" && type === "0")
      params.delete("bathrooms");

    if (inputs[index] === "HighPrice" && type === "10000")
      params.delete("HighPrice");

    if (inputs[index] === "LowPrice" && type === "100")
      params.delete("LowPrice");

    replace(`${pathname}?${params.toString()}`);
  }

  setToggle(false);
};

const Filter = () => {
  const types = [
    { title: "Villa", icon: <MdVilla /> },
    { title: "Apartment", icon: <MdApartment /> },
    { title: "House", icon: <FaHouseChimney /> },
    { title: "Campervan", icon: <FaCaravan /> },
    { title: "Land", icon: <MdTerrain /> },
    { title: "Office", icon: <BsFillBriefcaseFill /> },
    { title: "Shop", icon: <FaShop /> },
    { title: "Garage", icon: <PiGarageFill /> },
    { title: "Warehouse", icon: <FaWarehouse /> },
    { title: "Studio", icon: <MdBedroomChild /> },
    { title: "Hotel", icon: <FaHotel /> },
    { title: "Motel", icon: <FaBed /> },
  ];
  const { setToggle } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get("type")?.toString();
  return (
    <div className="flex items-center justify-center md:my-6 mb-2 gap-4 px-2 ">
      <div className="flex overflow-x-auto items-center md:gap-3 gap-1 py-2 rounded-md filter-bar">
        {types.map((type) => (
          <div
            key={type.title}
            className={`flex flex-col items-center gap-1  text-md cursor-pointer relative hover:text-black filter-item  ${
              defaultValue === type.title
                ? "text-black filter-active"
                : "text-gray-500"
            }`}
            onClick={() => {
              if (searchParams.get("type")?.toString() === type.title)
                HandleFilterChange(
                  { type: "none" },
                  params,
                  setToggle,
                  pathname,
                  replace
                );
              else
                HandleFilterChange(
                  { type: type.title },
                  params,
                  setToggle,
                  pathname,
                  replace
                );
            }}
          >
            <div className="">{type.icon}</div> {type.title}
          </div>
        ))}
      </div>
      <div className="md:block hidden">
        <FilterButton />
      </div>
    </div>
  );
};

function Posts({
  searchParams,
}: {
  searchParams?: {
    wilaya?: string;
    baladia?: string;
    bedrooms?: string;
    bathrooms?: string;
    beds?: string;
    amenties?: string;
    HighPrice?: string;
    LowPrice?: string;
    type?: string;
    query?: string;
    page?: string;
  };
}) {
  const wilaya = searchParams?.wilaya || "";
  const baladia = searchParams?.baladia || "";
  const bedrooms = searchParams?.bedrooms || "";
  const bathrooms = searchParams?.bathrooms || "";
  const beds = searchParams?.beds || "";
  const amenties = searchParams?.amenties || "";
  const HighPrice = searchParams?.HighPrice || "";
  const LowPrice = searchParams?.LowPrice || "";
  const type = searchParams?.type || "";
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <Suspense>
        <SearchBar />
      </Suspense>
      <div className="Hline bg-gray-300  md:block hidden" />
      <div className="md:my-4 md:mx-8 p-1 md:text-base text-xs">
        <Suspense>
          <Filter />
        </Suspense>
        <Table
          query={query}
          type={type}
          wilaya={wilaya}
          baladia={baladia}
          bathrooms={bathrooms}
          bedrooms={bedrooms}
          beds={beds}
          amenties={amenties}
          LowPrice={LowPrice}
          HighPrice={HighPrice}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default Posts;
