import "@styles/User.css";
import { FaRegAddressCard } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";

function page() {
  const navElements = [
    {
      title: "Profile",
      description: "Manage your profile and account settings.",
      path: "/user/profile",
      icon: <FaRegAddressCard className="UserPage--navElementIcon"/>,
    },
    {
      title: "Favorites",
      description: "Manage and review the places you've favorited.",
      path: "/user/favorites",
      icon: <GrFavorite className="UserPage--navElementIcon"/>,
    },
    {
      title: "Hosting",
      description: "Manage your hosting listings and reservations.",
      path: "/user/hosting",
      icon: <IoIosSwitch className="UserPage--navElementIcon"/>,
    },
    {
      title: "Settings",
      description: "Manage your account settings and preferences.",
      path: "/user/settings",
      icon: <IoSettingsOutline className="UserPage--navElementIcon"/>,
    },
    {
      title: "Billing",
      description: "Manage your billing and payment methods.",
      path: "/user/billing",
      icon: <FaRegMoneyBillAlt className="UserPage--navElementIcon"/>,
    },
  ];
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Account</h1>
      <div className="UserPage--nav">
        {navElements.map((el, i) => (
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
        ))}
      </div>
      <div>
        <p>
          <b>Logout</b>
        </p>
        <p>
          <b>Delete Account</b>
        </p>
      </div>
    </>
  );
}

export default page;
