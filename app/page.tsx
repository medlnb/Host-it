"use client";
import Posts from "@components/Posts";
import { useSearchParams } from "next/navigation";


function App() {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <div className="homepage--container">
      <Posts
        searchParams={{
          type: params.get("type") ?? undefined,
          LowPrice: params.get("LowPrice") ?? undefined,
          HighPrice: params.get("HighPrice") ?? undefined,
          amenties: params.get("amenties") ?? undefined,
          wilaya: params.get("wilaya") ?? undefined,
          baladia: params.get("baladia") ?? undefined,
          bedrooms: params.get("bedrooms") ?? undefined,
          bathrooms: params.get("bathrooms") ?? undefined,
          beds: params.get("beds") ?? undefined,
          query: params.get("query") ?? undefined,
        }}
      />
    </div>
  );
}

export default App;
