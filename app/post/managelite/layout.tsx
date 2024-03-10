"use client";
import { NewPostContextProvider } from "@Context/NewPostContext";
import { usePathname, useRouter } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const page = pathnameArray[pathnameArray.length - 1];
  return (
    <div>
      <div className="flex flex-row absolute left-1/2 transform -translate-x-1/2 bottom-1 w-11/12 h-8 ml-1 rounded-lg overflow-hidden">
        {[
          "type",
          "location",
          "placedetails",
          "amenties",
          "placeinfo",
          "prices",
          "images",
        ].map((nav: string, index) => {
          return (
            <div
              key={index}
              className={`h-full w-full rounded-lg flex-1 relative show-up-triger cursor-pointer ${
                nav === "images" ? "opacity-50" : ""
              }`}
              onClick={() => {
                if (nav !== "images") router.push(`/post/managelite/${nav}`);
              }}
            >
              <p
                className={` ${
                  page === nav
                    ? "absolute left-1/2 transform -translate-x-1/2"
                    : "show-up"
                } `}
              >
                {nav}
              </p>
              <div
                className={`w-full h-2 absolute left-0 bottom-0 colored  ${
                  page === nav ? "bg-black rounded-lg" : "bg-gray-400"
                }`}
                style={{ width: "105%" }}
              ></div>
            </div>
          );
        })}
      </div>
      <NewPostContextProvider>{children}</NewPostContextProvider>
    </div>
  );
}

export default Layout;
