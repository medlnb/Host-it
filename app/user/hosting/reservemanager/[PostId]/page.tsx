"use client";
import Calendar from "@components/Calendar";
import "@styles/User.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";

interface Reservation {
  date: string;
  Duration: number;
  reservedBy: string;
  dateEnd: string;
  _id: string;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Page() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const decrementMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? prev : prev - 1));
  };

  const incrementMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? prev : prev + 1));
  };

  const { PostId } = useParams();
  const [PostData, setPostData] = useState<{
    reseveRequests: Reservation[];
    resevedDates: Reservation[];
    title: string;
    _id: string;
  } | null>(null);

  const [selectedReservation, setSelectedReserve] = useState<{
    requestedreserve: Reservation | undefined;
  }>({ requestedreserve: undefined });
  useEffect(() => {
    fetch(`/api/post/${PostId}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData({
          _id: data.post._id,
          reseveRequests: data.post.reseveRequests,
          resevedDates: data.post.resevedDates,
          title: data.post.title,
        });
      });
  }, [PostId]);

  if (!PostData) return "loading";
  // console.log(selectedReservation.reservedDate);
  const HandleAccepte = async (RequestId: string) => {
    const response = await fetch(`/api/post/host/${PostData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application-json",
      },
      body: JSON.stringify({ RequestId }),
    });
    if (response.ok) alert("done");
  };

  const thisMonthReserves = PostData.resevedDates.filter(
    (resevation) =>
      parseDate(resevation.dateEnd).month === selectedMonth + 1 ||
      parseDate(resevation.date).month === selectedMonth + 1
  );
  return (
    <div className="flex flex-col-reverse gap-10 px-5 sm:flex-row">
      <div className="flex-1 ">
        <div className="flex flex-row justify-center gap-20 w-full">
          <button onClick={decrementMonth}>-</button>
          <p>{months[selectedMonth]}</p>
          <button onClick={incrementMonth}>+</button>
        </div>
        <Calendar
          reservedDates={thisMonthReserves}
          requestedreserve={selectedReservation.requestedreserve}
          selectedMonth={selectedMonth}
        />
      </div>
      <div className="bg-gray-100 rounded-tl-lg rounded-bl-lg p-3">
        <p className="mb-6 text-center">Requests</p>
        <div className="flex flex-col gap-2">
          {PostData.reseveRequests.map((element, index) => (
            <div
              key={index}
              className="border-2 p-3 rounded"
              onClick={() => {
                setSelectedMonth(parseDate(element.date).month - 1);
                setSelectedReserve((prev) => ({
                  ...prev,
                  requestedreserve: element,
                }));
              }}
            >
              <p>{element.reservedBy}</p>
              <p>Duration: {element.Duration + 1}</p>
              <div className="flex justify-around mt-3">
                <button onClick={() => HandleAccepte(element._id)}>
                  Accepte
                </button>
                <button>Repuse</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
