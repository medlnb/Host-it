import { cookies } from "next/headers";
import Link from "next/link";
import { CiChat1 } from "react-icons/ci";

async function Messages() {
  const res = await fetch(`${process.env.Url}/api/messages`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok)
    return (
      <Link
        href="/user/messages"
        className="relative flex items-center mx-2 gap-1"
      >
        ! <CiChat1 size={25} />
      </Link>
    );
  const { count } = await res.json();
  return (
    <Link
      href="/user/messages"
      className="relative flex items-center mx-2 gap-1"
    >
      {count}
      <CiChat1 size={25} />
    </Link>
  );
}

export default Messages;
