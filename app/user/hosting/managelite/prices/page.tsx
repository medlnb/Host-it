"use client";
import { CurrentPostContext } from "@Context/CurrentPostContext";
import { useContext } from "react";
import CurrencyInput from "react-currency-input-field";

function Prices() {
  const {
    CurrentPost: { price },
    dispatch,
  } = useContext(CurrentPostContext);

  return (
    <div className="max-width45rem my-5">
      <h1 className="text-center font-medium text-2xl my-10">Prices</h1>
      <div className="mt-4 flex items-center md:flex-row flex-col gap-3 md:justify-between">
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={price.perday}
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
            value={price.permonth}
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
    </div>
  );
}

export default Prices;
