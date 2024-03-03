import { FaWifi } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { MdLocalParking } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineElevator } from "react-icons/md";

interface props {
  amenities: string[];
  HandleChangeInputs: any;
}
export const amenitiesData = [
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
function Amenities({ amenities, HandleChangeInputs }: props) {
  return (
    <div className="my-10 w-full">
      <h1 className="text-center font-medium text-2xl my-10">
        Tell guests what your place has to offer
      </h1>
      <div className="my-8 mx-auto grid grid-cols-3 gap-2">
        {amenitiesData.map((amenitie) => {
          const isIncluded = amenities.includes(amenitie.title);
          return (
            <div
              key={amenitie.title}
              className={`flex gm:gap-3 gap-1 flex-col md:flex-row items-center md:p-8 p-4 rounded-lg border-2 hover:bg-gray-100 cursor-pointer ${
                isIncluded ? "border-black" : ""
              }`}
              onClick={() => {
                if (isIncluded)
                  HandleChangeInputs((prev: any) => ({
                    ...prev,
                    amenities: prev["amenities"].filter(
                      (type: string) => type !== amenitie.title
                    ),
                  }));
                else {
                  HandleChangeInputs((prev: any) => ({
                    ...prev,
                    amenities: [...prev["amenities"], amenitie.title],
                  }));
                }
              }}
            >
              <div className="md:text-4xl text-3xl">{amenitie.icon}</div>
              <div className="whitespace-nowrap">{amenitie.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
