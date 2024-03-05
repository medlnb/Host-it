"use client";
import InfoEditer from "@components/InfoEditer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Page() {
  const { data: session } = useSession();
  const [UserInfo, setUserInfo] = useState<{
    legalname: string | undefined;
    email: string | undefined;
    phonenumber: string | undefined;
    governmentID: string | undefined;
    address: string | undefined;
  } | null>(null);
  const indexs: (
    | "legalname"
    | "email"
    | "phonenumber"
    | "governmentID"
    | "address"
  )[] = ["legalname", "email", "phonenumber", "governmentID", "address"];

  useEffect(() => {
    setUserInfo({
      legalname: session?.user.name,
      email: session?.user.email,
      phonenumber: session?.user.phonenumber,
      governmentID: session?.user.governmentID,
      address: session?.user.address,
    });
  }, [session]);

  const HandleSave = async () => {
    const response = await fetch("/api/auth/signup", {
      method: "PATCH",
      body: JSON.stringify({
        userId: session?.user.id,
        phonenumber: UserInfo?.phonenumber,
        governmentID: UserInfo?.governmentID,
        address: UserInfo?.address,
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
        <button
          onClick={HandleSave}
          className="bg-black text-white p-2 w-20 rounded-md mx-auto my-3"
        >
          save
        </button>
      </section>
    </div>
  );
}

export default Page;
