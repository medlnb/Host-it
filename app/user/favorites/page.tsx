import ClipLoader from "react-spinners/ClipLoader";
import { FaHouseCrack } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import Link from "next/link";
import Favorite from "./Favorite";
import { cookies } from "next/headers";
import LoadImage from "@components/LoadImage";

interface Favorites {
  _id: string;
  title: string;
  city: string;
  state: string;
  images: string[];
}

async function Page() {
  const res = await fetch(`${process.env.Url}/api/post/favorites`, {
    cache: "no-cache",
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) return <div>Failed to load</div>;
  const favorites: Favorites[] = await res.json();

  if (!favorites.length)
    return (
      <div className="flex justify-center items-center h-80 text-md text-black whitecpace-nowrap">
        <div className="w-64 h-64 relative rounded-full bg-gray-100">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <FaHouseCrack className="text-6xl" />
            <h1>No Posts Found</h1>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="text-center font-semibold">Favorites</h1>
      <div className="max-w-[60rem] grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3 my-6 mx-auto">
        {favorites.map((post) => (
          <div
            key={post._id}
            className="flex md:flex-col flex-row md:items-center items-start text-xs md:gap-4 gap-2 p-2 center-shadow rounded-md relative hover:outline hover:outline-1 hover:outline-gray-300 overflow-hidden"
          >
            <Link href={`/post/${post._id}`}>
              <LoadImage
                Url={post.images[0]}
                Css="md:w-full w-28 md:h-40 h-20 rounded-md image-fit"
              />
            </Link>
            <div className="Hline w-full hidden md:block" />
            <div className="flex justify-between items-center w-full px-2">
              <h1 className="font-semibold">{post.title}</h1>
              <Favorite postId={post._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
