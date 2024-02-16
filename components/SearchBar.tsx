"use client";
import "@styles/SearchBar.css";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="searchbar--container">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Location..."
        defaultValue={searchParams.get("query")?.toString()}
      />
      <CiSearch className="search--icon" size={20} />
    </div>
  );
}

export default SearchBar;
