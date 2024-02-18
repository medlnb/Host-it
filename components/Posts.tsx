"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import "@styles/Posts.css";
import { Suspense, useContext, useState } from "react";
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
import { floatingConext } from "@Context/FloatingWinContext";
import FilterWindow from "./FilterWindow";

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
  const { HandleChangeChildren } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get("filter")?.toString();
  interface props {
    type?: string;
    LowPrice?: string;
    HighPrice?: string;
    amenties?: string;
    wilaya?: string;
    baladia?: string;
    bedrooms?: string;
    bathrooms?: string;
    beds?: string;
  }
  const HandleFilterChange = (qurries: props) => {
    const inputs: (
      | "type"
      | "LowPrice"
      | "HighPrice"
      | "amenties"
      | "wilaya"
      | "baladia"
      | "bedrooms"
      | "bathrooms"
      | "beds"
    )[] = [
      "type",
      "LowPrice",
      "HighPrice",
      "amenties",
      "wilaya",
      "baladia",
      "bedrooms",
      "bathrooms",
      "beds",
    ];

    const params = new URLSearchParams(searchParams);
    for (var index = 0; index < inputs.length; index++) {
      // if (type) {
      //   params.set("type", type);
      // } else {
      //   params.delete("type");
      // }
      // replace(`${pathname}?${params.toString()}`);
      const type = qurries[inputs[index]];

      if (type) params.set(inputs[index], type);
      // } else {
      //   params.delete(inputs[index]);
      // }
      replace(`${pathname}?${params.toString()}`);
    }
  };
  const filterwindow = <FilterWindow HandleFilterChange={HandleFilterChange} />;
  return (
    <div className="top--bar">
      <div className="filter-bar">
        {types.map((type) => (
          <div
            key={type.title}
            className={`filter-item ${
              defaultValue === type.title ? "filter-active" : ""
            }`}
            onClick={() => HandleFilterChange({ type: type.title })}
          >
            {type.icon} {type.title}
          </div>
        ))}
      </div>
      <button
        className="filter-button"
        onClick={() => HandleChangeChildren(filterwindow)}
      >
        Filter
      </button>
    </div>
  );
};

function Posts({
  searchParams,
}: {
  searchParams?: {
    wilaya?: string;
    baladia?: string;
    bedrooms?: string;
    bathrooms?: string;
    beds?: string;
    amenties?: string;
    HighPrice?: string;
    LowPrice?: string;
    type?: string;
    query?: string;
    page?: string;
  };
}) {
  const wilaya = searchParams?.wilaya || "";
  const baladia = searchParams?.baladia || "";
  const bedrooms = searchParams?.bedrooms || "";
  const bathrooms = searchParams?.bathrooms || "";
  const beds = searchParams?.beds || "";
  const amenties = searchParams?.amenties || "";
  const HighPrice = searchParams?.HighPrice || "";
  const LowPrice = searchParams?.LowPrice || "";
  const type = searchParams?.type || "";
  const query = searchParams?.query || "";
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
        <Table
          query={query}
          type={type}
          wilaya={wilaya}
          baladia={baladia}
          bathrooms={bathrooms}
          bedrooms={bedrooms}
          beds={beds}
          amenties={amenties}
          LowPrice={LowPrice}
          HighPrice={HighPrice}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default Posts;
