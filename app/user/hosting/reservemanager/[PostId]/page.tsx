"use client";
import Calendar from "@components/Calendar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import RequestsManager from "@components/RequestsManager";

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
  const { PostId } = useParams();
  const [updatecontrol, setUpdatecontrol] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [profiles, setProfiles] = useState<any>(null);
  const [selectedReservation, setSelectedReserve] = useState<{
    requestedreserve: Reservation | undefined;
  }>({ requestedreserve: undefined });

  const [PostData, setPostData] = useState<{
    reseveRequests: Reservation[];
    resevedDates: Reservation[];
    title: string;
    _id: string;
  } | null>(null);

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
  }, [updatecontrol]);

  useEffect(() => {
    const getUsers = async () => {
      const Ids = [
        ...PostData!.reseveRequests.map((request) => request.reservedBy),
        ...PostData!.resevedDates.map((reseved) => reseved.reservedBy),
      ];

      //remove the duplicates
      const FiltredIds = Ids.filter((item, index) => {
        return Ids.indexOf(item) === index;
      });

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ Ids: FiltredIds }),
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    };
    if (PostData) getUsers();
  }, [selectedMonth, PostData]);

  const thisMonthReserves = PostData?.resevedDates.filter(
    (resevation) =>
      parseDate(resevation.dateEnd).month === selectedMonth + 1 ||
      parseDate(resevation.date).month === selectedMonth + 1
  );
  if (!PostData) return "loading";
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
          profiles={profiles}
          reservedDates={thisMonthReserves}
          requestedreserve={selectedReservation.requestedreserve}
          selectedMonth={selectedMonth}
        />
      </div>
      <RequestsManager
        PostData={PostData}
        profiles={profiles}
        setSelectedReserve={setSelectedReserve}
        selectedReservation={selectedReservation}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
}

export default Page;
