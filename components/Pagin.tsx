"use client";
import Pagination from "@mui/material/Pagination";

function Pagin({ count, p }: { count: number; p: number }) {
  return (
    <div className="flex justify-center mt-4">
      <Pagination count={count} page={p} />
    </div>
  );
}

export default Pagin;
