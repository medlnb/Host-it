"use client";
import { Suspense } from "react";
import Table from "@components/Table";
import SearchFilter from "@components/SearchFilter";
import SearchBar from "@components/SearchBar";

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
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <div className="Hline bg-gray-300  md:block hidden" />
      <div className="md:my-4 md:mx-8 p-1 md:text-base text-xs">
        {
          <div className="block sm:hidden mx-4 my-2">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        }
        <Suspense>
          <SearchFilter />
        </Suspense>
        <Table
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
        <Table
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
        <Table
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
        <Table
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
