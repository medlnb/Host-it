"use client";
import { usePathname, useRouter } from "next/navigation";
function NewPostNav() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const page = pathnameArray[pathnameArray.length - 1];

  const navs = [
    "type",
    "location",
    "placedetails",
    "amenties",
    "placeinfo",
    "prices",
    "images",
  ];
  const HandleNavigate = (isNext: boolean) => {
    const curretnIndex = navs.indexOf(page);
    if (isNext) router.push(`/post/managelite/${navs[curretnIndex + 1]}`);
    else router.push(`/post/managelite/${navs[curretnIndex - 1]}`);
  };

  return (
    <>
      <button
        className="block sm:hidden absolute top-0 m-1 px-2 py-1 border rounded text-sm"
        onClick={() => {
          router.push("/");
        }}
      >
        Cancel
      </button>
      {page === "managelite" ? (
        <button
          className="block md:hidden fixed bottom-1 w-full bg-rose-500 py-2 px-6 rounded text-white hover:bg-black"
          onClick={() => {
            router.push("/post/managelite/type");
          }}
        >
          Prev
        </button>
      ) : (
        <div className="flex md:hidden fixed bottom-1 justify-between w-full">
          {page !== "type" && page !== "images" ? (
            <button
              className="bg-gray-500 py-2 px-6 rounded-r text-white hover:bg-black"
              onClick={() => HandleNavigate(false)}
            >
              Prev
            </button>
          ) : (
            <div></div>
          )}
          {page !== "prices" && page !== "images" ? (
            <button
              className="bg-rose-500 py-2 px-6 rounded-l text-white hover:bg-black"
              onClick={() => HandleNavigate(true)}
            >
              Next
            </button>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <div className="hidden md:flex flex-row fixed left-1/2 transform -translate-x-1/2 bottom-1 w-11/12 h-8 ml-1 rounded-lg overflow-hidden">
        {navs.map((nav: string, index) => {
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
    </>
  );
}

export default NewPostNav;
