"use client";
import { NewPostContext } from "@Context/NewPostContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import CurrencyInput from "react-currency-input-field";

function Prices() {
  const router = useRouter();
  const { NewPost, dispatch } = useContext(NewPostContext);
  const { data: session } = useSession();

  const HandlePost = async () => {
    const response = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    
    body: JSON.stringify({ ...NewPost,poster: session?.user.id}),
    });
    if (response.ok) {
      const data = await response.json();
      router.push(`/post/managelite/images/${data.PostId}`);
      return;
    }
  };
  return (
    <div className="max-width45rem my-5">
      <h1 className="text-center font-medium text-2xl my-10">Prices</h1>
      <div className="mt-4 flex items-center md:flex-row flex-col gap-3 md:justify-between">
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={NewPost.price.perday}
            className="w-full border-none focus:outline-none"
            allowDecimals={false}
            onValueChange={(value) =>
              dispatch({
                type: "SET_PERDAY_PRICE",
                payload: value,
              })
            }
          />
          <p className="whitespace-nowrap">DZD/per day</p>
        </div>
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={NewPost.price.permonth}
            allowDecimals={false}
            className="w-full border-none focus:outline-none"
            onValueChange={(value) =>
              dispatch({
                type: "SET_PERMONTH_PRICE",
                payload: value,
              })
            }
          />
          <p className="whitespace-nowrap">DZD/per month</p>
        </div>
      </div>
      <button onClick={HandlePost}>POST</button>
    </div>
  );
}

export default Prices;
