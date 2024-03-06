"use client";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { floatingConext } from "@Context/FloatingWinContext";

function FloatingWindow() {
  const { toggle, setToggle, childrens } = useContext(floatingConext);
  const HandleOutClick = () => {
    setToggle(false);
  };
  if (!toggle) return;
  return (
    <div
      className="fixed inset-0 grid place-items-center z-50 backdrop-filter backdrop-blur backdrop-contrast-50 bg-opacity-50"
      onClick={HandleOutClick}
    >
      <div
        className="bg-white overflow-hidden pb-3 rounded-md shadow-lg text-xs going-up-animation"
        style={{ maxWidth: "95%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-2 border-b border-gray-400">
          <h1 className="text-md font-medium ">{childrens.title}</h1>
          <IoClose
            onClick={() => setToggle(false)}
            className="floatingwindow--close"
            size={20}
          />
        </div>
        {childrens.content}
        <div className="Hline w-full" />
      </div>
    </div>
  );
}

export default FloatingWindow;
