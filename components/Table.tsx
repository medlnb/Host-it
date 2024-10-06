import { PostType } from "@types";
import AlgerianCities from "@public/AlgerianCities.json";
import Post from "@components/Post";
import EmptyContent from "./EmptyContent";
import Pagin from "@components/Pagin";

export default async function Table({
  p,
  type,
  wilaya,
  baladia,
  bedrooms,
  bathrooms,
  beds,
  amenties,
  HighPrice,
  LowPrice,
}: {
  wilaya: string;
  baladia: string;
  bedrooms: string;
  bathrooms: string;
  beds: string;
  amenties: string;
  HighPrice: string;
  LowPrice: string;
  type: string;
  p: number;
}) {
  const res = await fetch(
    `${process.env.Url}/api/post?type=${type}&wilaya=${wilaya}&baladia=${baladia}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&beds=${beds}&amenties=${amenties}&HighPrice=${HighPrice}&LowPrice=${LowPrice}&p=${p}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) return <div>Error Fetching Posts</div>;

  const { Posts, count } = await res.json();
  if (!Posts.length) return <EmptyContent content="No Posts Found" />;
  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
        {Posts.map((apost: PostType) => (
          <Post
            key={apost._id}
            data={apost}
            state={AlgerianCities[apost.state - 1][0].name}
            city={AlgerianCities[apost.state - 1][apost.city].name}
          />
        ))}
      </div>
      <Pagin count={count} p={p ?? 1} />
    </div>
  );
}
