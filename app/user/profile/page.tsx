"use client";
import InfoEditer from "@components/InfoEditer";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const indexs: (
  | "legalname"
  | "email"
  | "phonenumber"
  | "governmentID"
  | "address"
)[] = ["legalname", "email", "phonenumber", "governmentID", "address"];

function Page() {
  const { data: session } = useSession();

  const [UserInfo, setUserInfo] = useState<{
    legalname: string;
    email: string;
    phonenumber: string | undefined;
    governmentID: string | undefined;
    address: string | undefined;
  } | null>(null);

  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await fetch(`/api/profile/${session!.user.id}`);
      if (response.ok) {
        const profile = await response.json();
        setUserInfo({
          ...profile,
          legalname: session!.user.name,
          email: session!.user.email,
        });
      }
    };
    if (session) fetchuserdata();
  }, [session]);

  const HandleSave = async () => {
    const response = await fetch(`/api/profile/${session!.user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        phonenumber: UserInfo!.phonenumber,
        governmentID: UserInfo!.governmentID,
        address: UserInfo!.address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) alert("Saved");
  };

  return (
    <div>
      <section className="max-width45rem flex flex-col gap-5  border-black py-5 px-2 rounded-md relative">
        <h2 className="absolute bg-white px-3 -top-3.5 left-1/2 transform -translate-x-1/2 ">
          Personal info
        </h2>
        {UserInfo
          ? indexs.map((title) => (
              <div key={title}>
                <InfoEditer
                  title={title}
                  value={UserInfo[title] ?? ""}
                  HandleSave={(value) => {
                    setUserInfo((prev: any) => {
                      return { ...prev, [title]: value };
                    });
                  }}
                />
                <div className="Hline w-full" />
              </div>
            ))
          : "loading..."}
        <div className="flex items-center justify-center gap-4 my-3">
          <p
            onClick={() => signOut()}
            className="cursor-pointer py-2 px-4 hover:underline"
          >
            Log out
          </p>
          <button
            onClick={HandleSave}
            disabled={!session || !UserInfo}
            className={`text-white p-2 rounded-md w-20  ${
              !session || !UserInfo ? "bg-gray-600" : "bg-black"
            }`}
          >
            save
          </button>
        </div>
      </section>
    </div>
  );
}

export default Page;
