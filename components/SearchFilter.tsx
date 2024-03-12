"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
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
import FilterButton from "@components/FilterButton";
import { HandleFilterChange } from "@components/Posts";

const SearchFilter = () => {
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
export default SearchFilter;
