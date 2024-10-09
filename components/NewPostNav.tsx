import { useRouter } from "next/navigation";

function NewPostNav({
  type,
  nav,
  HandleRoute,
  HandleSubmit,
}: {
  type: "UPDATE" | "POST";
  nav: number;
  HandleRoute: (value: number) => void;
  HandleSubmit: () => void;
}) {
  const router = useRouter();

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

      <div className="fixed bottom-0 w-full bg-white">
        <div className="h-1 md:h-2 w-full bg-rose-200 flex">
          {Array.from({ length: nav + 1 }, (_, index) => (
            <div key={index} className="h-full bg-rose-500 w-[15%]"></div>
          ))}
        </div>
        <div className="flex justify-between my-2">
          {nav !== 0 ? (
            <button className="underline" onClick={() => HandleRoute(nav - 1)}>
              Back
            </button>
          ) : (
            <div></div>
          )}

          {nav !== 6 ? (
            <p
              className="bg-rose-500 py-2 md:text-base text-sm px-6 rounded-l text-white hover:bg-black"
              onClick={() => HandleRoute(nav + 1)}
            >
              Next
            </p>
          ) : (
            <p
              className="bg-rose-500 py-2 md:text-base text-sm px-6 rounded-l text-white hover:bg-black"
              onClick={() => HandleSubmit()}
            >
              {type === "POST" ? "Submit" : "Update"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default NewPostNav;
