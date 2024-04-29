"use client";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { parseDate } from "@internationalized/date";
import { useSession } from "next-auth/react";

interface Reservation {
  date: string;
  Duration: number;
  reservedBy: string;
  dateEnd: string;
  _id: string;
}

function RequestsManager({
  PostData,
  profiles,
  setSelectedReserve,
  selectedReservation,
  setSelectedMonth,
}: {
  PostData: {
    reseveRequests: Reservation[];
    resevedDates: Reservation[];
    title: string;
    _id: string;
  };
  profiles: {
    _id: string;
    image: string;
    name: string;
    email: string;
    phonenumber?: string;
    governmentID?: string;
    address?: string;
  }[];
  selectedReservation: any;
  setSelectedReserve: any;
  setSelectedMonth: any;
}) {
  const { data: session } = useSession();
  const HandleAccepte = async (RequestId: string) => {
    const response = await fetch(`/api/post/host/${PostData._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "User-Id": session!.user.id,
      },
      body: JSON.stringify({ RequestId }),
    });
    if (response.ok) {
      // setUpdatecontrol((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col bg-gray-100 rounded-tl-lg rounded-bl-lg p-3 h-full border-2">
      <p className="mb-6 text-center">Requests</p>
      <div className="grid grid-cols-2 py-2 sm:w-56 sm:flex sm:flex-col gap-2 overflow-y-scroll hide-scroll-bar">
        {PostData.reseveRequests.map((element, index) => {
          let profile = profiles?.find(
            (user) => user._id === element.reservedBy
          );
          return (
            <div
              key={index}
              className={`center-shadow py-2 rounded cursor-pointer ${
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
              {profile ? (
                <div className="flex gap-2 mb-2 shadow-md rounded p-2">
                  <img
                    className="h-12 cursor-pointer rounded-full "
                    src={profile.image}
                  />
                  <p>{profile!.name}</p>
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
  );
}

export default RequestsManager;
