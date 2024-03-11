"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

function Page() {
  const { PostId } = useParams();
  const [images, setimages] = useState<{ url: string; path: string }[]>([]);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    const baseUrl = "https://semsardatabase.onrender.com";
    const formData = new FormData();

    formData.append("file", file);

    // Append folder as a query parameter
    let url = "";
    if (typeof PostId === "string")
      url = baseUrl + "/file" + "?folder=" + encodeURIComponent(PostId);

    // fetch POST request to express server
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      const path = data.path.split("/").slice(-2).join("/");
      const imageURL = URL.createObjectURL(file);
      setimages((prev) => [
        ...prev,
        {
          url: imageURL,
          path,
        },
      ]);
      alert("done");
    }
  };

  const HandleSubmit = async () => {
    const image = images.map((img) => img.path);

    const post = { _id: PostId, image };
    const response = await fetch("/api/post/new", {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ post }),
    });
    if (response.ok) alert("Done");
  };
  return (
    <div className="max-width45rem">
      <h1 className="text-center text-3xl font-medium">Add the Images Here</h1>
      <div className="border border-black rounded-md overflow-hidden h-32 w-96 relative p-2 my-4 mx-auto">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full h-full"
        />
        <div
          className="bg-white w-full h-full absolute top-0 left-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          Click here to add Picture
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-2 p-2">
        {images.map((img, index) => (
          <img
            key={index}
            className="object-cover h-40 rounded-md"
            src={img.url}
          />
        ))}
      </div>
      <button onClick={HandleSubmit}>Submit</button>
    </div>
  );
}

export default Page;
