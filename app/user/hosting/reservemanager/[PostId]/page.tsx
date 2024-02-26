"use client";
import Calendar from "@components/Calendar";
import "@styles/User.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";

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
  const [updatecontrol, setUpdatecontrol] = useState(false);
  const [profiles, setProfiles] = useState<any>(null);
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
  }, [updatecontrol]);

  useEffect(() => {
    const Ids = PostData?.reseveRequests.map((request) => request.reservedBy);
    // console.log(Ids);
    const getUsers = async () => {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "Application.json",
        },
        body: JSON.stringify({ Ids }),
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    };
    if (PostData) {
      getUsers();
    }
  }, [selectedMonth, PostData]);
  if (!PostData) return "loading";

  const HandleAccepte = async (RequestId: string) => {
    const response = await fetch(`/api/post/host/${PostData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application-json",
      },
      body: JSON.stringify({ RequestId }),
    });
    if (response.ok) {
      setUpdatecontrol((prev) => !prev);
    }
  };

  const thisMonthReserves = PostData.resevedDates.filter(
    (resevation) =>
      parseDate(resevation.dateEnd).month === selectedMonth + 1 ||
      parseDate(resevation.date).month === selectedMonth + 1
  );
  // PostData.reseveRequests
  return (
    <div className="flex flex-col-reverse gap-10 px-0 text-xs sm:flex-row sm:px-5 h-full">
      <div className="flex-1 ">
        <div className="flex flex-row justify-center items-center gap-20 w-full">
          <FaCaretLeft
            className="cursor-pointer"
            onClick={decrementMonth}
            size={15}
          />
          <p className="w-12 text-center text-sm">{months[selectedMonth]}</p>
          <FaCaretRight
            className="cursor-pointer"
            onClick={incrementMonth}
            size={15}
          />
        </div>
        <Calendar
          reservedDates={thisMonthReserves}
          requestedreserve={selectedReservation.requestedreserve}
          selectedMonth={selectedMonth}
        />
      </div>
      <div className="flex flex-col bg-gray-100 rounded-tl-lg rounded-bl-lg p-3 h-full">
        <p className="mb-6 text-center">Requests</p>
        <div className="grid grid-cols-2 py-2 sm:w-56 sm:flex sm:flex-col gap-2  overflow-y-scroll hide-scroll-bar">
          {PostData.reseveRequests.map((element, index) => {
            let profile = null;
            if (profiles)
              profile = profiles.find(
                (user: any) => user._id === element.reservedBy
              );
            return (
              <div
                key={index}
                className={`shadow-md py-2 rounded cursor-pointer ${
                  selectedReservation.requestedreserve === element
                    ? "border-2 border-red-500"
                    : ""
                }`}
                onClick={() => {
                  setSelectedMonth(parseDate(element.date).month - 1);
                  setSelectedReserve({
                    requestedreserve: element,
                  });
                }}
              >
                {profiles ? (
                  <div className="flex gap-2 mb-2  shadow-sm rounded p-2">
                    <img
                      className="h-12 cursor-pointer rounded-full "
                      src={profile.image}
                    />
                    <p>{profile.name}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 mb-2">
                    <div
                      className="h-12 cursor-pointer rounded-full bg-gray-700 animate-pulse"
                      style={{ aspectRatio: "1/1" }}
                    />
                    <p className="flex-1 w-full bg-gray-400 animate-pulse h-5 rounded-full"></p>
                  </div>
                )}
                <p className="text-center">
                  {element.date} ~ {element.dateEnd}
                </p>
                <p className="text-center">Duration: {element.Duration + 1}</p>
                <div className="flex justify-around mt-3">
                  <FaCheck
                    className="underLine"
                    onClick={(e) => {
                      e.stopPropagation();
                      HandleAccepte(element._id);
                    }}
                  />
                  <HiXMark
                    className="underLine"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
