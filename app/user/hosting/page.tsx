"use client";
import "@styles/User.css";
import "@styles/Posts.css";
import { useEffect, useState } from "react";
import { FaHouseCrack } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  const [HostData, setHostData] = useState<any>(null);

  useEffect(() => {
    const getHostData = async () => {
      const response = await fetch(`/api/post/host/${session?.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setHostData(data);
      }
    };
    if (session) getHostData();
  }, [session]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Hosting</h1>
      {HostData ? (
        HostData.length === 0 ? (
          <div className="empty--Feed--container">
            <div className="empty--Feed--circle">
              <div className="empty--Feed">
                <FaHouseCrack className="empty--Feed--icon" />
                <h1>No Posts Found</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="favorites--feed">
            {HostData.map((post: any) => (
              <Host key={post._id} post={post} />
            ))}
          </div>
        )
      ) : (
        "loading"
      )}
    </>
  );
}

export default Page;

const Host = ({ post }: any) => {
  const router = useRouter();

  return (
    <div
      className="fav--container"
      onClick={() => {
        router.push(`/post/${post._id}`);
      }}
    >
      <img src={post.image[0]} />
      <div className="Hline bigscreen" style={{ width: "100%" }} />
      <div className="fav--body">
        <div className="fav--info">
          <h1>{post.title}</h1>
          {post.state === post.city ? (
            <h2 style={{ color: "gray" }}>{`${post.state}`}</h2>
          ) : (
            <h2 style={{ color: "gray" }}>{`${post.state} ~ ${post.city}`}</h2>
          )}
        </div>

        <FaRegEdit
          className="favpage--icon"
          fill="black"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/editpost/${post._id}`);
          }}
        />
      </div>
    </div>
  );
};
