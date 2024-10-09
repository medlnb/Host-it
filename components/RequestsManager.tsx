"use client";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { parseDate } from "@internationalized/date";

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

function RequestsManager({
  reseveRequests,
  selectedReservation,
  onSelectReservation,
}: {
  reseveRequests: {
    dates: Reservation[];
    title: string;
    _id: string;
  };
  selectedReservation?: { _id: string; firstDay: string; lastDay: string };
  onSelectReservation: ({
    item,
    month,
  }: {
    item: { _id: string; firstDay: string; lastDay: string };
    month: number;
  }) => void;
}) {
  const HandleAccepte = async (RequestId: string) => {
    const response = await fetch(`/api/post/reserevation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ RequestId, postId: reseveRequests._id }),
    });
    if (response.ok) {
      // setUpdatecontrol((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col bg-gray-100 rounded-tl-lg rounded-bl-lg p-3 h-full border-2">
      <p className="mb-6 text-center">Requests</p>
      <div className="grid grid-cols-2 py-2 sm:w-56 sm:flex sm:flex-col gap-2 overflow-y-scroll hide-scroll-bar">
        {reseveRequests.dates.map((element, index) => (
          <div
            key={index}
            className={`center-shadow py-2 rounded cursor-pointer ${
              selectedReservation?._id === element._id
                ? "border-2 border-red-500"
                : ""
            }`}
            onClick={() =>
              onSelectReservation({
                item: {
                  _id: element._id,
                  firstDay: element.firstDay,
                  lastDay: element.lastDay,
                },
                month: parseDate(element.firstDay).month - 1,
              })
            }
          >
            <div className="flex gap-2 mb-2 shadow-md rounded p-2">
              <img
                className="h-12 cursor-pointer rounded-full "
                src={element.reservedBy.image}
              />
              <p>{element.reservedBy.name}</p>
            </div>

            <p className="text-center">
              {element.firstDay} ~ {element.lastDay}
            </p>
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
        ))}
      </div>
    </div>
  );
}

export default RequestsManager;
