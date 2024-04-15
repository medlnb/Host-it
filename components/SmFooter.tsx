"use client";
import { IoMdSettings } from "react-icons/io";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { useScroll } from "@hooks/useScroll";
import { RiMessage3Fill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
function SmFooter() {
  const pathname = usePathname();
  const { scrollDirection } = useScroll();
  return (
    <div
      className={`${scrollDirection === "up" ? "hidden" : "flex"}
      ${pathname.split("/")[2] === "managelite" && "hidden"} 
      w-full h-12 items-center justify-around rounded-b rounded-2xl bg-rose-500 fixed bottom-0`}
    >
      <Link href={"/"}>
        <FaHome size={25} fill="white" />
      </Link>
      <Link href={"/user/messages"}>
        <RiMessage3Fill size={25} fill="white" />
      </Link>

      <div className="flex items-center justify-center relative">
        <Link
          href={"/post/managelite"}
          className="absolute -top-12 z-100 bg-rose-500 p-2 rounded-full border-2 border-white"
        >
          <BsFillHouseAddFill size={25} fill="white" />
        </Link>
      </div>
      <Link href={"/"}>
        <IoMdSettings size={25} fill="white" />
      </Link>
      <Link href={"/user"} className="flex items-center justify-center">
        <FaUserAlt size={23} fill="white" />
      </Link>
    </div>
  );
}

export default SmFooter;
