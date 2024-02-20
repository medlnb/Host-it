"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
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
    { title: "Villa", icon: <MdVilla  /> },
    { title: "Apartment", icon: <MdApartment  /> },
    { title: "House", icon: <FaHouseChimney  /> },
    { title: "Campervan", icon: <FaCaravan  /> },
    { title: "Land", icon: <MdTerrain  /> },
    { title: "Office", icon: <BsFillBriefcaseFill  /> },
    { title: "Shop", icon: <FaShop  /> },
    { title: "Garage", icon: <PiGarageFill  /> },
    { title: "Warehouse", icon: <FaWarehouse  /> },
    { title: "Studio", icon: <MdBedroomChild  /> },
    { title: "Hotel", icon: <FaHotel  /> },
    { title: "Motel", icon: <FaBed  /> },
  ];
  const { HandleChangeChildren, setToggle } = useContext(floatingConext);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const queryParams = Array.from(params.keys()).filter(
    (key) => key !== "type" && key !== "query" && key !== "baladia"
  );

  const defaultValue = searchParams.get("type")?.toString();
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
    for (var index = 0; index < inputs.length; index++) {
      const type = qurries[inputs[index]];

      if (type) params.set(inputs[index], type);
      // else params.delete(inputs[index]);
      if (inputs[index] === "baladia" && !type) params.delete("baladia");
      if (inputs[index] === "wilaya" && !type) params.delete("wilaya");

      if (inputs[index] === "type" && type === "none") params.delete("type");
      if (inputs[index] === "beds" && type === "0") params.delete("beds");

      if (inputs[index] === "bedrooms" && type === "0")
        params.delete("bedrooms");

      if (inputs[index] === "bathrooms" && type === "0")
        params.delete("bathrooms");

      if (inputs[index] === "HighPrice" && type === "10000")
        params.delete("HighPrice");

      if (inputs[index] === "LowPrice" && type === "100")
        params.delete("LowPrice");

      replace(`${pathname}?${params.toString()}`);
    }

    setToggle(false);
  };

  // --------------------------
  const wilayadata = params.get("wilaya");
  const wilaya = wilayadata
    ? { label: wilayadata, value: wilayadata }
    : { label: "Wilaya", value: "none" };
  const baladiadata = params.get("baladia");
  const baladia = baladiadata
    ? { label: baladiadata, value: baladiadata }
    : { label: "Baladia", value: "none" };

  const LowPrice = params.get("LowPrice") ?? 100;
  const HighPrice = params.get("HighPrice") ?? 10000;
  // const amenties = params.get("amenties") ?? "";
  const beds = params.get("beds") ?? "0";
  const bedrooms = params.get("bedrooms") ?? "0";
  const bathrooms = params.get("bathrooms") ?? "0";
  const filterwindow = (
    <FilterWindow
      HandleFilterChange={HandleFilterChange}
      wilaya={wilaya}
      baladia={baladia}
      LowPrice={LowPrice}
      HighPrice={HighPrice}
      beds={beds}
      bedrooms={bedrooms}
      bathrooms={bathrooms}
    />
  );
  return (
    <div className="top--bar">
      <div className="filter-bar">
        {types.map((type) => (
          <div
            key={type.title}
            className={`filter-item ${
              defaultValue === type.title ? "filter-active" : ""
            }`}
            onClick={() => {
              if (searchParams.get("type")?.toString() === type.title)
                HandleFilterChange({ type: "none" });
              else HandleFilterChange({ type: type.title });
            }}
          >
            <div className="ff">{type.icon}</div> {type.title}
          </div>
        ))}
      </div>
      <button
        className="filter-button"
        onClick={() => HandleChangeChildren(filterwindow)}
      >
        <MdOutlineSettingsInputComposite />
        Filter
        {queryParams.length !== 0 && (
          <p className="querries--index">{queryParams.length}</p>
        )}
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
