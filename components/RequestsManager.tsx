"use client";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { parseDate } from "@internationalized/date";
import { notify } from "./Sonner";

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
  const HandleRequest = async (
    RequestId: string,
    type: "accept" | "reject"
  ) => {
    const response = await fetch(`/api/reserevation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ RequestId, type, postId: reseveRequests._id }),
    });
    if (response.ok) {
      location.reload();
      return;
    }
    notify({ type: "error", message: "Failed to accepte request" });
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-tl-lg rounded-bl-lg p-1 md:h-full border-2">
      <p className="mb-2 font-semibold text-center">Requests</p>
      <div className="flex py-2 md:w-56 md:flex-col gap-2 overflow-y-scroll hide-scroll-bar">
        {reseveRequests.dates.map((element, index) => (
          <div
            key={index}
            className={`min-w-32 p-1 rounded cursor-pointer flex justify-between flex-col md:flex-row ${
              selectedReservation?._id === element._id
                ? "border-b-2 md:border-l-2 md:border-b-0  border-red-500"
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
            <div className="flex flex-col items-center md:flex-row gap-2">
              <img
                className="h-10 w-10 cursor-pointer rounded-full "
                src={element.reservedBy.image}
              />
              <div className="md:text-start text-center">
                <p className="font-semibold">{element.reservedBy.name}</p>
                <p>
                  {element.firstDay} / {element.lastDay}
                </p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-around pt-2 md:p-0">
              <FaCheck
                size={15}
                className="underLine hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  HandleRequest(element._id, "accept");
                }}
              />
              <HiXMark
                size={15}
                className="underLine hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  HandleRequest(element._id, "reject");
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
