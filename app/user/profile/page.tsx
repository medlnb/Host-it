import { cookies } from "next/headers";
import { Suspense } from "react";
import Table from "./Table";

function Page() {
  return (
    <div>
      <section className="max-width45rem flex flex-col gap-5  border-black py-5 px-2 rounded-md relative">
        <h2 className="text-center text-lg font-bold">Personal info</h2>
        <Suspense>
          <User />
        </Suspense>
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
