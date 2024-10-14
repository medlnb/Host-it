"use client";
import { FaStar } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CiStar } from "react-icons/ci";
import { Button, DialogActions } from "@mui/material";
import { toast } from "sonner";

interface message {
  _id: string;
  from: {
    _id: string;
    phonenumber: string;
  };
  post: {
    _id: string;
    title: string;
  };
  content: string;
}

function Table({ messages }: { messages: message[] }) {
  const [dialog, setDialog] = useState<{
    _id: string;
    title: string;
    stars: number;
    content: string;
  }>();

  const HandleDelete = async (messageId: string) => {
    const res = await fetch(`/api/messages`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId }),
    });
    if (res.ok) {
      toast.success("Message Deleted");
    }
  };

  const HandleRate = async () => {
    const res = await fetch(`/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: dialog?.content,
        stars: dialog?.stars,
        post: dialog?._id,
      }),
    });
    if (res.ok) {
      setDialog(undefined);
      toast.success("Review Added");
      return;
    }
  };

  const emptyStarts = [1, 2, 3, 4, 5].map((num) => (
    <CiStar
      className="cursor-pointer"
      key={num + 10}
      size={30}
      onClick={() => setDialog((prev) => ({ ...prev!, stars: num }))}
    />
  ));

  const filledStarts: JSX.Element[] = [];
  for (let index = 0; index < (dialog?.stars ?? 5); index++) {
    filledStarts.push(
      <FaStar
        className="cursor-pointer m-0.5"
        key={index}
        onClick={() => setDialog((prev) => ({ ...prev!, stars: index + 1 }))}
        size={26}
      />
    );
    emptyStarts.shift();
  }

  return messages.map((message, index) => (
    <div
      key={index}
      className="mb-3 shadow-md rounded p-3 flex justify-between items-end bg-gray-100 relative"
    >
      <div>
        <h1>{message.post.title} :</h1>
        <p className="pl-3 text-gray-500">
          {message.content}
          <b
            className="border-l-2 px-2 text-gray-700 underline cursor-pointer"
            onClick={() =>
              (window.location.href = `tel:${message.from.phonenumber}`)
            }
          >
            Contact Hoster
          </b>
        </p>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <FaStar
          className="mb-0.5 cursor-pointer"
          onClick={() => {
            setDialog({
              _id: message.post._id,
              stars: 3,
              content: "",
              title: message.post.title,
            });
          }}
        />
        <IoMdTrash
          className="cursor-pointer"
          onClick={() => HandleDelete(message._id)}
        />
      </div>
      <Dialog
        open={!!dialog}
        onClose={() => setDialog(undefined)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Rating <b>{dialog?.title}</b>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center justify-center mb-2">
            {[...filledStarts, ...emptyStarts].map((star) => star)}
          </div>
          <textarea
            value={dialog?.content ?? ""}
            onChange={(e) =>
              setDialog((prev) => ({ ...prev!, content: e.target.value }))
            }
            className="border-2 w-full p-1"
            placeholder="what do u think of this place..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(undefined)}>Close</Button>
          <Button onClick={HandleRate}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  ));
}

export default Table;
