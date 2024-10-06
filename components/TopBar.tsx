import { Suspense } from "react";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import SearchBar from "@components/SearchBar";
import Nav from "./Nav";

function TopBar() {
  return (
    <div className="w-full bg-white flex flex-row items-center justify-between md:py-6 md:px-16 md:text-base text-xs">
      <Link href="/" className="hidden md:block">
        El-Semsar
      </Link>

      <Suspense>
        <SearchBar />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex items-center flex-row p-2 rounded-xl gap-2 border border-black cursor-pointer">
            <ClipLoader size={20} />
          </div>
        }
      >
        <Nav />
      </Suspense>
    </div>
  );
}

export default TopBar;
