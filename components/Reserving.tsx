"use client";
import { useState } from "react";
import { DateRangePicker } from "@adobe/react-spectrum";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date";
import "@styles/PostPage.css";
import { useSession } from "next-auth/react";

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

interface props {
  postId: string;
  resevedDates: { date: string; Duration: number; reservedBy: string }[];
  price: { perday: number; permonth: number };
}

function Reserving({ postId, resevedDates, price }: props) {
  const { data: sesssion } = useSession();
  const now = today(getLocalTimeZone());
  const [value, setValue] = useState({
    start: now,
    end: now,
  });

  const reservedDates = resevedDates.map((date) => {
    const Tdate = parseDate(date.date);
    return [Tdate, Tdate.add({ days: date.Duration })];
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
    if (!sesssion) return alert("You need to be logged in to reserve");
    const response = await fetch(`/api/post`, {
      method: "PATCH",
      body: JSON.stringify({
        date: value.start.toString(),
        Duration: calculateDaysDifference(
          value.start.toString(),
          value.end.toString()
        ),
        reservedBy: sesssion?.user.id,
        postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) alert("Reserved");
    else alert("Failed to reserve");
  };
  return (
    <form className="reservation-info" onSubmit={HandleSubmit}>
      <h2>Reservation</h2>
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
      <div className="reservation--price">
        <p>Total price </p>
        <p>{`( ${
          CalculatePrice().months !== 0 ? CalculatePrice().months + "m" : ""
        } ${CalculatePrice().days !== 0 ? CalculatePrice().days + "d" : ""}  )
        ${CalculatePrice().total}DA`}</p>
      </div>
      <div className="Hline" />
      <button className="reservation--submit" type="submit">
        Reserve
      </button>
    </form>
  );
}

export default Reserving;
