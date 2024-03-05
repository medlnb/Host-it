import { FaRegAddressCard } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import Link from "next/link";

function page() {
  const navElements = [
    {
      title: "Profile",
      description: "Manage your profile and account settings.",
      path: "/user/profile",
      icon: <FaRegAddressCard className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Favorites",
      description: "Manage and review the places you've favorited.",
      path: "/user/favorites",
      icon: <GrFavorite className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Profile plan",
      description: "here we take ur money.",
      path: "/user/plans",
      icon: <GiGearStickPattern className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Hosting",
      description: "Manage your hosting listings and reservations.",
      path: "/user/hosting",
      icon: <IoIosSwitch className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Services",
      description: "Services our website offer for your place.",
      path: "/user/services",
      icon: <MdCleaningServices className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Billing",
      description: "Manage your billing and payment methods.",
      path: "/user/billing",
      icon: <FaRegMoneyBillAlt className="text-2xl  md:mt-2 md:ml-1" />,
    },
    {
      title: "Settings",
      description: "Manage your account settings and preferences.",
      path: "/user/settings",
      icon: <IoSettingsOutline className="text-2xl  md:mt-2 md:ml-1" />,
    },
  ];
  return (
    <div style={{ width: "60rem" }} className="max-w-full mx-auto my-8">
      <h1 className="text-center">Account</h1>
      <div className="md:grid md:grid-cols-3 gap-3 w-full my-10 ">
        {navElements.map((el, i) => {
          return (
            <div className="h-full" key={i}>
              <div
                className={`${
                  i === 0 || i === 3 || i === 5 ? "my-7" : "my-0"
                } md:hidden`}
              >
                {i === 0 && (
                  <div className="Hline w-full h-0.5  relative  md:hidden">
                    <p className="absolute -top-3 bg-white px-5">User</p>
                  </div>
                )}
                {i === 3 && (
                  <div className="Hline w-full h-0.5 relative  md:hidden">
                    <p className="absolute -top-3 bg-white px-5">
                      Host Management
                    </p>
                  </div>
                )}
                {i === 5 && (
                  <div className="Hline w-full h-0.5 relative  md:hidden">
                    <p className="absolute -top-3 bg-white px-5">Others</p>
                  </div>
                )}
              </div>
              <Link
                href={el.path}
                className="flex flex-row md:flex-col md:items-start items-center gap-6 h-full p-4 rounded-lg shadow-lg "
              >
                {el.icon}
                <div>
                  <p className="UserPage--navElementTitle">
                    <b>{el.title}</b>
                  </p>
                  <p className="text-md text-gray-600 font-medium">
                    {el.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
