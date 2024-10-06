import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const { favorites } = await User.findById(id).select("favorites");
    return new Response(JSON.stringify(favorites), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
