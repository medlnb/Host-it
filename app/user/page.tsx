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
      icon: <FaRegAddressCard />,
    },
    {
      title: "Favorites",
      description: "Manage and review the places you've favorited.",
      path: "/user/favorites",
      icon: <GrFavorite />,
    },
    {
      title: "Hosting",
      description: "Manage your hosting listings and reservations.",
      path: "/user/hosting",
      icon: <IoIosSwitch />,
    },
    {
      title: "Settings",
      description: "Manage your account settings and preferences.",
      path: "/user/settings",
      icon: <IoSettingsOutline />,
    },
    {
      title: "Billing",
      description: "Manage your billing and payment methods.",
      path: "/user/billing",
      icon: <FaRegMoneyBillAlt />,
    },
  ];
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Account</h1>
      <div className="UserPage--nav">
        {navElements.map((el, i) => (
          <Link href={el.path} key={i} className="UserPage--navElement">
            <div className="UserPage--navElementIcon">{el.icon}</div>
            <div className="UserPage--navElementTitle">
              <b>{el.title}</b>
            </div>
            <div className="UserPage--navElementDescription">
              {el.description}
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
