// "use client";
import Posts from "@components/Posts";
import "@styles/App.css";
// import { useSearchParams } from "next/navigation";

function App() {
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  // searchParams={{ query: params.get("query") ?? undefined }}
  return <div className="homepage--container">{<Posts />}</div>;
}

export default App;
