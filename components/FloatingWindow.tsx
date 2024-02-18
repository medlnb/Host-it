"use client";
import "@styles/FloatingWindow.css";
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
    <div className="bluredbg" onClick={HandleOutClick}>
      <div
        className="floatingwindow--container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="floatingwindow--top">
          <IoClose
            onClick={() => setToggle(false)}
            className="floatingwindow--close"
            size={20}
          />
        </div>
        {childrens}
        <div className="Hline" style={{width:"100%"}}/>
      </div>
    </div>
  );
}

export default FloatingWindow;
