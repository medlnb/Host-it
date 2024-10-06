import { MdApartment } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { PiGarageFill } from "react-icons/pi";
import { FaShop } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { MdTerrain } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { FaCaravan } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";

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

function Type({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h1 className="text-center font-medium text-2xl my-10">
        Which of these best describes your place?
      </h1>
      <div className="my-8 mx-auto grid grid-cols-3 gap-2">
        {types.map((type) => (
          <div
            key={type.title}
            onClick={() => onChange(type.title)}
            className={`flex gm:gap-3 gap-1 flex-col md:flex-row items-center md:p-8 p-4 rounded-lg border-2 hover:bg-gray-100 cursor-pointer ${
              value === type.title ? "border-black" : ""
            }`}
          >
            <div className="md:text-4xl text-2xl">{type.icon}</div>
            <div className="whitespace-nowrap">{type.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Type;
