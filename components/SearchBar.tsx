"use client";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import FilterButton from "./FilterButton";

function SearchBar() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div
      className="flex items-center max-w-full my-0 mx-auto gap-3 px-2 md:mb-4"
      style={{ width: "40rem" }}
    >
      <div className="flex-1 center-shadow rounded-3xl px-4 py-2 relative">
        <input
          className="bg-none border-none w-full focus:outline-none md:text-md text-xs"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Location..."
          defaultValue={searchParams.get("query")?.toString()}
        />
        <CiSearch
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer  hover:scale-120"
          size={20}
          // .search--icon:hover {
          //   transform: translateY(-50%) scale(1.2);
          // }
        />
      </div>
      <div className="md:hidden block ">
        <FilterButton />
      </div>
    </div>
  );
}

export default SearchBar;
