"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import "@styles/Posts.css";
import { Suspense } from "react";
import SearchBar from "./SearchBar";
import Table from "./Table";
import { BsFillBriefcaseFill } from "react-icons/bs";
import {
  FaBed,
  FaCaravan,
  FaHotel,
  FaHouseChimney,
  FaShop,
  FaWarehouse,
} from "react-icons/fa6";
import {
  MdApartment,
  MdBedroomChild,
  MdTerrain,
  MdVilla,
} from "react-icons/md";
import { PiGarageFill } from "react-icons/pi";

const Filter = () => {
  const types = [
    { title: "Villa", icon: <MdVilla size={20} /> },
    { title: "Apartment", icon: <MdApartment size={20} /> },
    { title: "House", icon: <FaHouseChimney size={20} /> },
    { title: "Campervan", icon: <FaCaravan size={20} /> },
    { title: "Land", icon: <MdTerrain size={20} /> },
    { title: "Office", icon: <BsFillBriefcaseFill size={20} /> },
    { title: "Shop", icon: <FaShop size={20} /> },
    { title: "Garage", icon: <PiGarageFill size={20} /> },
    { title: "Warehouse", icon: <FaWarehouse size={20} /> },
    { title: "Studio", icon: <MdBedroomChild size={20} /> },
    { title: "Hotel", icon: <FaHotel size={20} /> },
    { title: "Motel", icon: <FaBed size={20} /> },
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get("filter")?.toString();

  const toggleFilter = (title: string) => {
    // setSelectedFilters(title);
    const params = new URLSearchParams(searchParams);
    if (title) {
      params.set("filter", title);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="top--bar">
      <div className="filter-bar">
        {types.map((type) => (
          <div
            key={type.title}
            className={`filter-item ${
              defaultValue === type.title ? "filter-active" : ""
            }`}
            onClick={() => toggleFilter(type.title)}
          >
            {type.icon} {type.title}
          </div>
        ))}
      </div>
      <button className="filter-button">Filter</button>
    </div>
  );
};

function Posts({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    query?: string;
    page?: string;
  };
}) {
  const filter = searchParams?.filter || "";
  const query = searchParams?.query || "";
  // const query = selectedFilters.join("&") || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <Suspense>
        <SearchBar />
      </Suspense>
      <div
        className="Hline"
        style={{ marginTop: "1rem", background: "#e0e0e0" }}
      />
      <div className="hp--container">
        <Suspense>
          <Filter />
        </Suspense>
        <Table query={query} filter={filter} currentPage={currentPage} />
      </div>
    </>
  );
}

export default Posts;
