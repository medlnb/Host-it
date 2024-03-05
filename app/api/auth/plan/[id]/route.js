import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";

export const POST = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { plan } = await req.json();
    const user = await User.findById(params.id);
    const now = today(getLocalTimeZone());

    user.plan = {
      type: plan,
      lastDay: now.add({ days: 30 }).toString(),
    };
    await user.save();
    return new Response(JSON.stringify({ newUser: "Subbed" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
