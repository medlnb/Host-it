"use client";
import { useState } from "react";

function Page() {
  const [info, setInfo] = useState<{
    autoRequestManagement: boolean;
    cleaning: boolean;
    gifts: number;
  } | null>({
    autoRequestManagement: false,
    cleaning: false,
    gifts: 2,
  });

  return (
    <div className="max-width45rem">
      <div className="border-2 p-2 rounded-xl">
        <div className="flex justify-between items-center ">
          <p className="text-lg">Cleaning</p>
          <div
            className={`w-10 h-5 border-2 rounded-full p-1 relative ${
              info?.cleaning ? "border-black" : "border-gray-300"
            }`}
            onClick={() => {
              setInfo((prev: any) => ({ ...prev, cleaning: !prev.cleaning }));
            }}
          >
            <div
              className={`h-2/3  w-3 rounded-full absolute top-1/2  transition -translate-y-1/2 ${
                info?.cleaning
                  ? "right-1 bg-black transition-delay-300ms"
                  : "left-1 bg-gray-300 transition-delay-300ms"
              }`}
            ></div>
          </div>
        </div>
        <p className="text-gray-500 mt-1">
          By activating this option, you can rest assured that the cleanliness
          of your place will be taken care of after every reserve, courtesy of.
          our dedicated cleaning team
        </p>
      </div>
      <div className="border-2 p-2 rounded-xl my-4">
        <div className="flex justify-between items-center">
          <p className="text-lg">Auto Request Management</p>
          <div
            className={`w-10 h-5 border-2  rounded-full p-1 relative ${
              info?.autoRequestManagement ? "border-black" : "border-gray-300"
            }`}
            onClick={() => {
              setInfo((prev: any) => ({
                ...prev,
                autoRequestManagement: !prev.autoRequestManagement,
              }));
            }}
          >
            <div
              className={`h-2/3  w-3 rounded-full absolute top-1/2  transition -translate-y-1/2 ${
                info?.autoRequestManagement
                  ? "right-1 bg-black transition-delay-300ms"
                  : "left-1 bg-gray-300 transition-delay-300ms"
              }`}
            ></div>
          </div>
        </div>
        <p className="text-gray-500 mt-1">
          This one will take care of accepting request depending on the options
          you select below, howeven it will decline any request within the
          accepted reservation request date.
        </p>
      </div>
    </div>
  );
}

export default Page;
