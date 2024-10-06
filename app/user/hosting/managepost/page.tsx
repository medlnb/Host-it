import All from "./All";

function page() {
  const keys = {
    MapsAPIKey: process.env.MapsAPIKey,
    MapId: process.env.MapId,
  };
  return (
    <div>
      <All {...keys} />
    </div>
  );
}

export default page;
