import "@styles/Amenities.css";
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
  { title: "Wifi", icon: <FaWifi size={25} /> },
  { title: "TV", icon: <PiTelevisionSimpleBold size={25} /> },
  { title: "Kitchen", icon: <FaKitchenSet size={25} /> },
  { title: "Washer", icon: <BiSolidWasher size={25} /> },
  { title: "Parking", icon: <MdLocalParking size={25} /> },
  { title: "Air conditioning", icon: <TbAirConditioning size={25} /> },
  { title: "Heater", icon: <FaTemperatureArrowUp size={25} /> },
  { title: "Pool", icon: <MdOutlinePool size={25} /> },
  { title: "Elevator", icon: <MdOutlineElevator size={25} /> },
];
function Amenities({ amenities, HandleChangeInputs }: props) {
  return (
    <div style={{ margin: "5rem 0" }}>
      <h1 className="createpost--title">
        Tell guests what your place has to offer
      </h1>
      <div className="types--container">
        {amenitiesData.map((amenitie) => {
          const isIncluded = amenities.includes(amenitie.title);
          return (
            <div
              key={amenitie.title}
              className={`type--container ${isIncluded ? "selectedtype" : ""}`}
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
              <div className="type--icon">{amenitie.icon}</div>
              <div className="type--title">{amenitie.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
