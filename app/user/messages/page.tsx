import { cookies } from "next/headers";
import Table from "./Table";

interface message {
  _id: string;
  from: {
    _id: string;
    phonenumber: string;
  };
  post: {
    _id: string;
    title: string;
  };
  content: string;
}

async function Page() {
  const res = await fetch(`${process.env.Url}/api/messages`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!res.ok) return <p>Error Getting Messages</p>;
  const { messages }: { messages: message[] } = await res.json();

  return (
    <div className="p-3 max-width45rem">
      <h2 className="text-center mb-3">Messages</h2>
      <Table messages={messages} />
    </div>
  );
}

export default Page;
