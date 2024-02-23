import { connectToDatabase } from "@utils/database";
import User from "@models/user";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { email, password, image, username } = await req.json();
    const exist = await User.findOne({ name: username, email });
    if (exist)
      return new Response(
        JSON.stringify({ err: "username or email already used" }),
        {
          status: 400,
        }
      );

    const newUser = await User.create({
      email,
      password,
      image,
      name: username,
    });

    if (!newUser)
      return new Response(JSON.stringify({ err: "Error creating User" }), {
        status: 500,
      });

    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
