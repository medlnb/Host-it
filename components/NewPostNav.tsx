"use client";
import { usePathname, useRouter } from "next/navigation";

const navs = [
  "type",
  "location",
  "placedetails",
  "amenties",
  "placeinfo",
  "prices",
  "images",
];

function NewPostNav() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const page = pathnameArray[pathnameArray.length - 1];
  const curretnIndex = navs.indexOf(page);

  const HandleNavigate = (isNext: boolean) => {
    if (isNext)
      router.push(`/user/hosting/managelite/${navs[curretnIndex + 1]}`);
    else router.push(`/user/hosting/managelite/${navs[curretnIndex - 1]}`);
  };

  return (
    <>
      <p
        className="block sm:hidden fixed top-0 m-1.5 text-sm z-10 underline"
        onClick={() => {
          router.push("/");
        }}
      >
        Cancel
      </p>

      {page !== "managelite" && (
        <div className="fixed bottom-0 w-full bg-white">
          <div className="h-1 md:h-2 w-full bg-rose-200 flex">
            {Array.from({ length: curretnIndex + 1 }, (_, index) => (
              <div key={index} className="h-full bg-rose-500 w-[15%]"></div>
            ))}
          </div>
          <div className="flex justify-between my-2">
            {page !== "type" ? (
              <button
                className="underline"
                onClick={() => HandleNavigate(false)}
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {page !== "images" ? (
              <p
                className="bg-rose-500 py-2 md:text-base text-sm px-6 rounded-l text-white hover:bg-black"
                onClick={() => HandleNavigate(true)}
              >
                Next
              </p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NewPostNav;
