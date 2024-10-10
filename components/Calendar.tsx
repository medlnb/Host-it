import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

interface Reservation {
  firstDay: string;
  lastDay: string;
  reservedBy: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
  };
  _id: string;
}

const daysLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const todayDate = today(getLocalTimeZone());

function Calendar({
  reservedDates,
  requestedreserve,
  selectedMonth,
}: {
  reservedDates: Reservation[];
  requestedreserve?: { _id: string; firstDay: string; lastDay: string };
  selectedMonth: number;
}) {
  const lastDayInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: lastDayInMonth }, (_, i) => i + 1);
  const daysTillStart = new Date(2024, selectedMonth, 1).getDay();
  const emptyDays = Array.from({ length: daysTillStart }, () => 0);

  return (
    <div className="h-full border-red-800">
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
          const IsntPassed = todayDate.compare(thisDay) > 0;
          let isRequested = requestedreserve
            ? parseDate(requestedreserve.lastDay).compare(thisDay) *
                parseDate(requestedreserve.firstDay).compare(thisDay) <=
              0
            : false;

          let reservedby:
            | {
                _id: string;
                name: string;
                image: string;
              }
            | undefined;

          reservedDates.map((reservedDate) => {
            if (
              parseDate(reservedDate.lastDay).compare(thisDay) *
                parseDate(reservedDate.firstDay).compare(thisDay) <=
              0
            ) {
              reservedby = reservedDate.reservedBy;
            }
          });

          return (
            <Day
              key={day}
              day={day}
              reservedby={reservedby}
              requestReserve={isRequested}
              IsntPassed={IsntPassed}
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
  reservedby?: {
    _id: string;
    image: string;
    name: string;
  };

  requestReserve?: boolean;
  IsntPassed?: boolean;
}

const Day = ({ day = 0, reservedby, requestReserve, IsntPassed }: DayProps) => {
  return (
    <div className="h-14 border border-gray relative overflow-hidden sm:h-24">
      {day !== 0 && day}
      {reservedby && (
        <img
          className="absolute left-1/2 top-1/2 h-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full sm:h-2/3"
          src={reservedby.image}
          alt="Reserved By"
        />
      )}
      {requestReserve && (
        <div
          className="absolute  h-0.5 bottom-0 "
          style={{ background: "red", width: "110%" }}
        />
      )}
      {IsntPassed && (
        <div
          // style={{
          //   backgroundColor: "rgba(255, 255, 255, 0.7)",
          // }}
          className="absolute w-full h-full top-0 left-0 bg-black opacity-20"
        ></div>
      )}
    </div>
  );
};
