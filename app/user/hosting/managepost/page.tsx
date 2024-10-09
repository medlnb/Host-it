import All from "./All";

function page({
  searchParams: { postId },
}: {
  searchParams: { postId?: string };
}) {
  const keys = {
    MapsAPIKey: process.env.MapsAPIKey,
    MapId: process.env.MapId,
  };
  return <All {...keys} postId={postId} />;
}

export default page;
