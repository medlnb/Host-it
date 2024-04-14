"use client";
import { IoMdSettings } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { useScroll } from "@hooks/useScroll";

function SmFooter() {
  const { scrollDirection } = useScroll();
  return (
    <div
      className={`${
        scrollDirection === "up" ? "hidden" : "flex"
      } w-full h-12 items-center justify-around rounded-b rounded-2xl bg-rose-500 fixed bottom-0`}
    >
      <div>
        <IoMdSettings size={25} fill="white" />
      </div>
      <div className="flex items-center justify-center relative">
        <div className="absolute -top-14 z-100 bg-rose-500 p-3 rounded-full border-4 border-white">
          <FaPlus size={25} fill="white" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <FaUserAlt size={25} fill="white" />
      </div>
    </div>
  );
}

export default SmFooter;
