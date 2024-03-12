"use client";
import { Suspense } from "react";
import SearchBar from "@components/SearchBar";
import Table from "@components/Table";
import SearchFilter from "@components/SearchFilter";

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

export const HandleFilterChange = (
  qurries: props,
  params: URLSearchParams,
  setToggle: (toggle: boolean) => void,
  pathname: string,
  replace: (url: string) => void
) => {
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
    if (inputs[index] === "amenties" && !type) params.delete("amenties");
    if (inputs[index] === "wilaya" && !type) params.delete("wilaya");

    if (inputs[index] === "type" && type === "none") params.delete("type");
    if (inputs[index] === "beds" && type === "0") params.delete("beds");

    if (inputs[index] === "bedrooms" && type === "0") params.delete("bedrooms");

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
      <div className="Hline bg-gray-300  md:block hidden" />
      <div className="md:my-4 md:mx-8 p-1 md:text-base text-xs">
        <Suspense>
          <SearchFilter />
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
