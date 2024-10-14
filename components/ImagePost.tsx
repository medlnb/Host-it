import { useState } from "react";
import { toast } from "sonner";

function ImagePost({
  title,
  clickMe,
  image,
  HandleIsDone,
}: {
  title: string;
  clickMe: string;
  image: { image: string; id: string };
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
    const response = await fetch(
      `/api/image${image.id ? "/" + image.id : ""}`,
      {
        method: image.id ? "PATCH" : "POST",
        body: JSON.stringify({ image: UploadedImage }),
      }
    );
    setLoading(false);
    if (response.ok) {
      const data = await response.json();
      return HandleIsDone(UploadedImage, data._id);
    }
    return toast.error("Failed to upload image");
  };

  return (
    <div className="flex-1">
      <h3 className="text-xl text-center font-semibold mt-10 mb-4">{title}</h3>
      <div className="h-96 border border-gray-800 rounded-[1.5rem] overflow-hidden relative">
        <label
          htmlFor="file-upload"
          className="h-full w-full flex items-center justify-center absolute top-0 left-0 cursor-pointer"
        >
          {loading ? (
            "Loading..."
          ) : image.id ? (
            <img src={image.image} className="h-full w-full object-cover" />
          ) : (
            clickMe
          )}
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
    </div>
  );
}

export default ImagePost;
