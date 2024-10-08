import { FaWifi } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { MdLocalParking } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineElevator } from "react-icons/md";

const amenitiesData = [
  { title: "Wifi", icon: <FaWifi /> },
  { title: "TV", icon: <PiTelevisionSimpleBold /> },
  { title: "Kitchen", icon: <FaKitchenSet /> },
  { title: "Washer", icon: <BiSolidWasher /> },
  { title: "Parking", icon: <MdLocalParking /> },
  { title: "Air conditioning", icon: <TbAirConditioning /> },
  { title: "Heater", icon: <FaTemperatureArrowUp /> },
  { title: "Pool", icon: <MdOutlinePool /> },
  { title: "Elevator", icon: <MdOutlineElevator /> },
];

function Amenities({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string, type: "Add" | "Remove") => void;
}) {
  return (
    <div className="my-10">
      <h1 className="text-center font-medium text-2xl my-10">
        Tell guests what your place has to offer
      </h1>
      <div className="my-8 mx-auto grid grid-cols-3 gap-2">
        {amenitiesData.map((amenitie) => {
          const isIncluded = value.includes(amenitie.title);
          return (
            <div
              key={amenitie.title}
              className={`flex gm:gap-3 gap-1 flex-col md:flex-row items-center md:p-8 p-4 rounded-lg border-2 hover:bg-gray-100 cursor-pointer ${
                isIncluded ? "border-black" : ""
              }`}
              onClick={() => {
                onChange(amenitie.title, isIncluded ? "Remove" : "Add");
              }}
            >
              <div className="md:text-4xl text-2xl">{amenitie.icon}</div>
              <div className="whitespace-nowrap">{amenitie.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
