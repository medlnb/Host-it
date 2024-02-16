"use client";
import "@styles/Posts.css";
import { Suspense, useState } from "react";
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

const Filter = ({
  selectedFilters,
  setSelectedFilters,
}: {
  selectedFilters: string[];
  setSelectedFilters: any;
}) => {
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

  const toggleFilter = (title: string) => {
    if (selectedFilters.includes(title)) {
      setSelectedFilters((prev: string[]) =>
        prev.filter((filter: string) => filter !== title)
      );
    } else {
      setSelectedFilters((prev: string[]) => [...prev, title]);
    }
  };
  return (
    <div className="top--bar">
      <div className="filter-bar">
        {types.map((type) => (
          <div
            key={type.title}
            className={`filter-item ${
              selectedFilters.includes(type.title) ? "filter-active" : ""
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
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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
        <Filter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <Table query={query} currentPage={currentPage} />
      </div>
    </>
  );
}

export default Posts;
