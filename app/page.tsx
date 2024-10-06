import SearchFilter from "@components/SearchFilter";
import Table from "@components/Table";
import { Suspense } from "react";

interface Fitlers {
  wilaya?: string;
  baladia?: string;
  bedrooms?: string;
  bathrooms?: string;
  beds?: string;
  amenties?: string;
  HighPrice?: string;
  LowPrice?: string;
  type?: string;
  p?: string;
}

function App({
  searchParams: {
    wilaya,
    baladia,
    bedrooms,
    bathrooms,
    beds,
    amenties,
    HighPrice,
    LowPrice,
    type,
    p,
  },
}: {
  searchParams: Fitlers;
}) {
  return (
    <div className="homepage--container pb-16">
      <div className="Hline bg-gray-300  md:block hidden" />
      <div className="md:my-4 md:mx-8 p-1 md:text-base text-xs">
        <Suspense>
          <SearchFilter />
        </Suspense>
        <Suspense
          fallback={
            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-52 rounded-md image-fit loading--background"
                />
              ))}
            </div>
          }
        >
          <Table
            type={type ?? ""}
            wilaya={wilaya ?? ""}
            baladia={baladia ?? ""}
            bathrooms={bathrooms ?? ""}
            bedrooms={bedrooms ?? ""}
            beds={beds ?? ""}
            amenties={amenties ?? ""}
            LowPrice={LowPrice ?? ""}
            HighPrice={HighPrice ?? ""}
            p={Number(p ?? 1)}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
