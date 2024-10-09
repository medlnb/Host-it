"use client";
import { useState } from "react";
import { DateRangePicker } from "@adobe/react-spectrum";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { Toaster, toast } from "sonner";

function Reserving({
  postId,
  resevedDates,
  price,
}: {
  postId: string;
  resevedDates: { firstDay: string; lastDay: string }[];
  price: { perday: number; permonth: number };
}) {
  const now = today(getLocalTimeZone());
  const [value, setValue] = useState({
    start: now,
    end: now,
  });

  const reservedDates = resevedDates.map((date) => {
    return [parseDate(date.firstDay), parseDate(date.lastDay)];
  });

  const CalculatePrice = () => {
    const duration =
      calculateDaysDifference(value.start.toString(), value.end.toString()) + 1;
    const months = Math.floor(duration / 30);
    const days = duration % 30;
    const total = months * price.permonth + days * price.perday;
    return { months, days, total };
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/post/reserevation?postId=${postId}`, {
      method: "POST",
      body: JSON.stringify({
        firstDay: value.start.toString(),
        lastDay: value.end.toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) toast.success("Reserved");
    else toast.error("Error reserving");
  };

  return (
    <form className="my-3 text-xs z-10" onSubmit={HandleSubmit}>
      <Toaster richColors />
      <h2 className="mb-1">Reservation</h2>
      <Provider theme={defaultTheme} colorScheme="light">
        <DateRangePicker
          value={value}
          onChange={setValue}
          width="100%"
          minValue={today(getLocalTimeZone())}
          // validate={(range) =>
          //   range?.end.compare(range.start) > 7
          //     ? "Maximum stay duration is 1 week."
          //     : null
          // }
          isDateUnavailable={(date) =>
            reservedDates.some(
              (interval) =>
                date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
            )
          }
        />
      </Provider>
      <div className="flex justify-between my-3 md:text-lg text-md">
        <p>Total price </p>
        <p>{`( ${
          CalculatePrice().months !== 0 ? CalculatePrice().months + "m" : ""
        } ${CalculatePrice().days !== 0 ? CalculatePrice().days + "d" : ""}  )
        ${CalculatePrice().total}DA`}</p>
      </div>
      <div className="Hline" />
      <button
        className="block my-3 mx-auto p-2 bg-none border border-gray-800 rounded-md cursor-pointer hover:bg-gray-800 hover:text-white"
        type="submit"
      >
        Reserve
      </button>
    </form>
  );
}

export default Reserving;

const calculateDaysDifference = (
  StartDate: string,
  EndDate: string
): number => {
  const StartDateObj: Date = new Date(StartDate);
  const EndDateObj: Date = new Date(EndDate);

  const differenceInTime: number =
    EndDateObj.getTime() - StartDateObj.getTime();
  const differenceInDays: number = Math.floor(
    differenceInTime / (1000 * 3600 * 24)
  );

  return differenceInDays;
};
