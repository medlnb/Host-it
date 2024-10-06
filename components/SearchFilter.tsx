"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get("type")?.toString();
  return (
    <div className="flex items-center justify-center md:my-2 mb-2 gap-4 px-2 ">
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
              if (searchParams.get("type")?.toString() === type.title) {
                params.delete("type");
                replace(`${pathname}?${params.toString()}`);
              } else {
                params.set("type", type.title);
                replace(`${pathname}?${params.toString()}`);
              }
            }}
          >
            <div>{type.icon}</div> {type.title}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchFilter;
