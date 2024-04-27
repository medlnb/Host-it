import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(options); // database connection is too slow, so it takes time to get the user info
  console.log("session", session);

  return <div>settings</div>;
}

export default Page;
