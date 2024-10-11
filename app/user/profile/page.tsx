import { cookies } from "next/headers";
import Actions from "./Actions";
import { Suspense } from "react";
import Table from "./Table";

function Page() {
  // const HandleSave = async () => {
  //   const response = await fetch(`/api/profile/${session!.user.id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       phonenumber: UserInfo!.phonenumber,
  //       governmentID: UserInfo!.governmentID,
  //       address: UserInfo!.address,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.ok) alert("Saved");
  // };

  return (
    <div>
      <section className="max-width45rem flex flex-col gap-5  border-black py-5 px-2 rounded-md relative">
        <h2 className="absolute bg-white px-3 -top-3.5 left-1/2 transform -translate-x-1/2 ">
          Personal info
        </h2>

        <Suspense>
          <User />
        </Suspense>

        <Actions />
      </section>
    </div>
  );
}

export default Page;

interface User {
  name: string;
  email: string;
  phonenumber?: string;
  governmentID?: string;
  address?: string;
}

async function User() {
  const res = await fetch(`${process.env.Url}/api/profile`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const profile: User = await res.json();

  return <Table profile={profile} />;
}
