"use client";
import { Toaster, toast } from "sonner";

export const notify = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "info" | "warning" | "error" | "message";
}) => {
  toast[type](message);
};

function Sonner() {
  return <Toaster richColors />;
}

export default Sonner;
