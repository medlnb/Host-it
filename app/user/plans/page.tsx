"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { today } from "@internationalized/date";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import BeatLoader from "react-spinners/BeatLoader";

function Page() {
  const { data: session, update } = useSession();
  const [plan, setPlan] = useState<(undefined | "Pro" | "Premium") | null>(
    null
  );
  useEffect(() => {
    if (session) {
      if (session.user.plan === undefined) return setPlan(undefined);
      const thisday = today(getLocalTimeZone());
      if (
        parseDate(session.user.plan.lastDay.slice(0, 10)).compare(thisday) < 0
      )
        setPlan(undefined);
      else setPlan(session.user.plan.type);
    }
  }, [session]);

  const HandleSub = async (plan: String) => {
    const response = await fetch(`/api/auth/plan/${session?.user.id}`, {
      method: "POST",
      headers: {
        "Context-Type": "Application/Json",
      },
      body: JSON.stringify({ plan }),
    });
    if (response.ok) {
      alert("Subbed Done");
      update();
    }
  };
  return (
    <div
      className="max-width45rem grid md:grid-cols-3 grid-cols-1 gap-3"
      style={{ width: "60rem" }}
    >
      <div className="border-2 p-2 rounded-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mt-10 ">
            <FaUser className="text-7xl mb-4" />
            <p className="text-lg">Ordinal</p>
          </div>
          <p className="text-gray-500 mt-1 text-center">
            This is our ordinal plan, if u are here to just anounce your house,
            this plan is perfect for you, howover you dont want to be just a
            ordinal person no!
          </p>
        </div>
        <button className="block mx-auto border py-1 px-3 rounded-md mt-5 ">
          {}
          <>
            {plan !== null ? (
              plan === undefined ? (
                "Applied"
              ) : (
                "Free"
              )
            ) : (
              <BeatLoader color="black" size={15} />
            )}
          </>
        </button>
      </div>
      <div className="border-2 p-2 rounded-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mt-10 ">
            <FaStar className="text-7xl mb-4" />
            <p className="text-lg">Pro</p>
          </div>
          <p className="text-gray-500 mt-1 text-center">
            the Pro plan is for individuals that have more than one property.
          </p>
        </div>
        <button
          className="block mx-auto border py-1 px-3 rounded-md mt-5"
          onClick={() => HandleSub("Pro")}
        >
          <>
            {plan !== null ? (
              plan === "Pro" ? (
                "Applied"
              ) : (
                "2 000 DA/month"
              )
            ) : (
              <BeatLoader color="black" size={15} />
            )}
          </>
        </button>
      </div>
      <div className="border-2 p-2 rounded-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mt-10 ">
            <FaCrown className="text-7xl mb-4" />
            <p className="text-lg">Premium</p>
          </div>
          <p className="text-gray-500 mt-1 text-center">
            Are you runiing Hotel, Motel ... , this should be perfect for you.
          </p>
        </div>
        <button
          className="block mx-auto border py-1 px-3 rounded-md mt-5"
          onClick={() => HandleSub("Premium")}
        >
          <>
            {plan !== null ? (
              plan === "Premium" ? (
                "Applied"
              ) : (
                "5 000 DA/month"
              )
            ) : (
              <BeatLoader color="black" size={15} />
            )}
          </>
        </button>
      </div>
    </div>
  );
}

export default Page;
