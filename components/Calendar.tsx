import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useEffect, useState } from "react";

interface Reservation {
  date: string;
  dateEnd: string;
  Duration: number;
  reservedBy: string;
  _id: string;
}

interface CalendarProps {
  reservedDates?: Reservation[];
  requestedreserve?: Reservation;
  selectedMonth: number;
}

function Calendar({
  reservedDates,
  requestedreserve,
  selectedMonth,
}: CalendarProps) {
  const [profiles, setProfiles] = useState<
    | {
        _id: string;
        name: string;
        image: string;
      }[]
    | null
  >(null);
  const groupedByReservedBy: string[] = [];
  if (reservedDates)
    reservedDates.map((reserveData) => {
      if (!groupedByReservedBy.includes(reserveData.reservedBy))
        groupedByReservedBy.push(reserveData.reservedBy);
    });
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "Application.json",
        },
        body: JSON.stringify({ Ids: groupedByReservedBy }),
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    };
    if (reservedDates) {
      getUsers();
    }
  }, []);
  // console.log(profiles);

  const daysLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayDate = today(getLocalTimeZone());

  const lastDayInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: lastDayInMonth }, (_, i) => i + 1);
  const daysTillStart = new Date(2024, selectedMonth, 1).getDay();
  const emptyDays = Array.from({ length: daysTillStart }, () => 0);

  return (
    <div>
      <div className="grid grid-cols-7 text-center">
        {daysLabels.map((label) => (
          <p key={label}>{label}</p>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {emptyDays.map((_, index) => (
          <Day key={index} />
        ))}
        {days.map((day) => {
          const thisDay = parseDate(
            `2024-${(selectedMonth + 1).toString().padStart(2, "0")}-${day
              .toString()
              .padStart(2, "0")}`
          );
          const isToday = todayDate.compare(thisDay) > 0;
          let isRequested = false;
          if (requestedreserve)
            isRequested =
              parseDate(requestedreserve.dateEnd).compare(thisDay) *
                parseDate(requestedreserve.date).compare(thisDay) <=
              0;

          let reserved:
            | {
                _id: string;
                name: string;
                image: string;
              }
            | string
            | false = false;

          if (reservedDates)
            reservedDates.map((reservedDate) => {
              if (
                parseDate(reservedDate.dateEnd).compare(thisDay) *
                  parseDate(reservedDate.date).compare(thisDay) <=
                0
              ) {
                if (!profiles) reserved = "loading";
                else
                  reserved =
                    profiles.find(
                      (item) => item._id === reservedDate.reservedBy
                    ) ?? "khra";
              }
            });

          return (
            <Day
              key={day}
              day={day}
              reserved={reserved}
              requestReserve={isRequested}
              isToday={isToday}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;

interface DayProps {
  day?: number;
  reserved?:
    | {
        _id: string;
        name: string;
        image: string;
      }
    | string
    | false;
  requestReserve?: boolean;
  isToday?: boolean;
}

const Day = ({ day = 0, reserved, requestReserve, isToday }: DayProps) => {
  return (
    <div className="h-14 border border-gray relative overflow-hidden sm:h-24">
      {day !== 0 && day}
      {reserved === "loading" && (
        <div
          className="absolute left-1/2 top-1/2 h-2/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-700 animate-pulse"
          style={{ aspectRatio: "1/1" }}
          // src={reseverInfo.image}
          // onClick={() => console.log(reseverInfo.name)}
        />
      )}
      {reserved && typeof reserved !== "string" && (
        <img
          className="absolute left-1/2 top-1/2 h-2/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
          src={reserved.image}
          alt="Reserved By"
          onClick={() => console.log(reserved.name)}
        />
      )}
      {requestReserve && (
        <div
          className="absolute  h-0.5 bottom-0 "
          style={{ background: "red", width: "110%" }}
        />
      )}
      {isToday && (
        <div
          style={{
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          className="absolute w-full h-full top-0 left-0"
        ></div>
      )}
    </div>
  );
};
