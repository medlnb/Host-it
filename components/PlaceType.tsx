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

interface props {
  type: string;
  HandleChangeInputs: any;
}

function PlaceType({ type, HandleChangeInputs }: props) {
  const types = [
    { title: "Villa", icon: <MdVilla size={30} /> },
    { title: "Apartment", icon: <MdApartment size={30} /> },
    { title: "House", icon: <FaHouseChimney size={30} /> },
    { title: "Campervan", icon: <FaCaravan size={30} /> },
    { title: "Land", icon: <MdTerrain size={30} /> },
    { title: "Office", icon: <BsFillBriefcaseFill size={30} /> },
    { title: "Shop", icon: <FaShop size={30} /> },
    { title: "Garage", icon: <PiGarageFill size={30} /> },
    { title: "Warehouse", icon: <FaWarehouse size={30} /> },
    { title: "Studio", icon: <MdBedroomChild size={30} /> },
    { title: "Hotel", icon: <FaHotel size={30} /> },
    { title: "Motel", icon: <FaBed size={30} /> },
  ];
  return (
    <div>
      <h1 className="text-center font-medium text-2xl my-10">
        Which of these best describes your place?
      </h1>
      <div className="my-8 mx-auto grid grid-cols-3 gap-2">
        {types.map((typeData) => (
          <div
            key={typeData.title}
            onClick={() =>
              HandleChangeInputs((prev: any) => ({
                ...prev,
                type: typeData.title,
              }))
            }
            className={`flex gm:gap-3 gap-1 flex-col md:flex-row items-center md:p-8 p-4 rounded-lg border-2 hover:bg-gray-100 cursor-pointer ${
              type === typeData.title ? "border-black" : ""
            }`}
          >
            <div className="md:text-4xl text-3xl">{typeData.icon}</div>
            <div className="whitespace-nowrap">{typeData.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceType;
