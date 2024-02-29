import "@styles/User.css";
import { FaRegAddressCard } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import Link from "next/link";

function page() {
  const navElements = [
    {
      title: "Profile",
      description: "Manage your profile and account settings.",
      path: "/user/profile",
      icon: <FaRegAddressCard className="UserPage--navElementIcon" />,
    },
    {
      title: "Favorites",
      description: "Manage and review the places you've favorited.",
      path: "/user/favorites",
      icon: <GrFavorite className="UserPage--navElementIcon" />,
    },
    {
      title: "Hosting",
      description: "Manage your hosting listings and reservations.",
      path: "/user/hosting",
      icon: <IoIosSwitch className="UserPage--navElementIcon" />,
    },
    {
      title: "Services",
      description: "Services our website offer for your place.",
      path: "/user/services",
      icon: <MdCleaningServices className="UserPage--navElementIcon" />,
    },
    {
      title: "Billing",
      description: "Manage your billing and payment methods.",
      path: "/user/billing",
      icon: <FaRegMoneyBillAlt className="UserPage--navElementIcon" />,
    },
    {
      title: "Settings",
      description: "Manage your account settings and preferences.",
      path: "/user/settings",
      icon: <IoSettingsOutline className="UserPage--navElementIcon" />,
    },
  ];
  return (
    <div style={{ width: "60rem" }} className="max-w-full mx-auto my-8">
      <h1 style={{ textAlign: "center" }}>Account</h1>
      <div className="UserPage--nav">
        {navElements.map((el, i) => {
          return (
            <div className="">
              {i === 0 && (
                <div className="Hline w-full h-0.5 my-5 relative">
                  <p className="absolute -top-3 bg-white px-5">User</p>
                </div>
              )}
              {i === 2 && (
                <div className="Hline w-full h-0.5 my-5 relative">
                  <p className="absolute -top-3 bg-white px-5">
                    Host Management
                  </p>
                </div>
              )}
              {i === 5 && (
                <div className="Hline w-full h-0.5 my-5 relative">
                  <p className="absolute -top-3 bg-white px-5">Others</p>
                </div>
              )}
              <Link href={el.path} key={i} className="UserPage--navElement">
                {el.icon}
                <div>
                  <p className="UserPage--navElementTitle">
                    <b>{el.title}</b>
                  </p>
                  <p className="UserPage--navElementDescription">
                    {el.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <p>
          <b>Logout</b>
        </p>
        <p>
          <b>Delete Account</b>
        </p>
      </div>
    </div>
  );
}

export default page;
