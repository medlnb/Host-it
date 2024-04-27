import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

function Page() {
  const getsession = async () => {
    const session = await getServerSession(options); // database connection is too slow, so it takes time to get the user info
    console.log("session", session);
  };
  getsession();
  return <div>asd</div>;
}

export default Page;
