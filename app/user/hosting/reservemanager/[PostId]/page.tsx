"use client";
import Calendar from "@components/Calendar";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import RequestsManager from "@components/RequestsManager";

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

function Page({ params: { PostId } }: { params: { PostId: string } }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedReservation, setSelectedReserve] = useState<{
    _id: string;
    firstDay: string;
    lastDay: string;
  }>();

  const [PostData, setPostData] = useState<{
    reseveRequests: Reservation[];
    resevedDates: Reservation[];
    title: string;
    _id: string;
  }>();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/reserevation?postId=${PostId}`);
      if (!res.ok) return;
      const data = await res.json();
      setPostData({
        _id: data._id,
        reseveRequests: data.reseveRequests,
        resevedDates: data.resevedDates,
        title: data.title,
      });
    };
    fetchPost();
  }, []);

  if (!PostData) return "loading";

  const thisMonthReserves = PostData.resevedDates.filter(
    (resevation) =>
      parseDate(resevation.lastDay).month === selectedMonth + 1 ||
      parseDate(resevation.firstDay).month === selectedMonth + 1
  );

  return (
    <div className="flex flex-col-reverse gap-10 px-0 text-xs sm:flex-row h-[40rem] mb-16">
      <div className="flex-1 h-full">
        <div className="flex flex-row justify-center items-center gap-20 w-full mb-3">
          <FaCaretLeft
            className="cursor-pointer"
            onClick={() =>
              setSelectedMonth((prev) => (prev === 0 ? prev : prev - 1))
            }
            size={15}
          />
          <p className="w-12 text-center text-sm">{months[selectedMonth]}</p>
          <FaCaretRight
            className="cursor-pointer"
            onClick={() =>
              setSelectedMonth((prev) => (prev === 11 ? prev : prev + 1))
            }
            size={15}
          />
        </div>
        <Calendar
          reservedDates={thisMonthReserves}
          requestedreserve={selectedReservation}
          selectedMonth={selectedMonth}
        />
      </div>

      <RequestsManager
        reseveRequests={{
          dates: PostData.reseveRequests,
          title: PostData.title,
          _id: PostData._id,
        }}
        selectedReservation={selectedReservation}
        onSelectReservation={({ item, month }) => {
          setSelectedMonth(month);
          setSelectedReserve(item);
        }}
      />
    </div>
  );
}

export default Page;
