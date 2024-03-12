import { FaHouseCrack } from "react-icons/fa6";

function EmptyContent({ content }: { content: string }) {
  return (
    <div className="flex justify-center items-center h-80 text-md text-black whitecpace-nowrap">
      <div className="w-64 h-64 relative rounded-full bg-gray-100">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <FaHouseCrack className="text-6xl" />
          <h1>{content}</h1>
        </div>
      </div>
    </div>
  );
}

export default EmptyContent;
