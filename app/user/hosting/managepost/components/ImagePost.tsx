import { useState } from "react";
import { toast } from "sonner";

function ImagePost({
  clickMe,
  HandleIsDone,
}: {
  clickMe: string;
  HandleIsDone: (image: string, id: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    if (!file) return Promise.reject("No file provided");
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const HandleAddPicture = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      setLoading(false);
      return toast.error("No file selected");
    }

    const UploadedImage = (await convertToBase64(file)) as string;

    const res = await fetch(`/api/image`, {
      method: "POST",
      body: JSON.stringify({ image: UploadedImage }),
    });
    setLoading(false);
    if (!res.ok) return toast.error("Failed to upload image");

    const data = await res.json();
    HandleIsDone(UploadedImage, data._id);
  };

  return (
    <div className="h-40 md:h-60 border border-gray-800 rounded-[1.5rem] overflow-hidden relative">
      <label
        htmlFor="file-upload"
        className="h-full w-full flex items-center justify-center absolute top-0 left-0 cursor-pointer text-sm md:base"
      >
        {loading ? "Loading..." : clickMe}
      </label>
      <input
        className="h-full w-full hidden"
        type="file"
        name="file"
        id="file-upload"
        accept=".jpeg, .png, .jpg"
        onChange={HandleAddPicture}
      />
    </div>
  );
}

export default ImagePost;
