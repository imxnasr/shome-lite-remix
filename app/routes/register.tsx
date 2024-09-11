import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions";
import prisma from "utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("id")) {
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  // Return error if fields are empty
  if (!username || !email || !password) {
    return json({ error: "All fields are required" });
  }

  // Check if username is already exists
  const checkUsername = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
  });
  if (checkUsername) {
    return json({ error: "Username is already exists" });
  }

  // Check if email is already exists
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });
  if (checkEmail) {
    return json({ error: "Email is already exists" });
  }

  const user = await prisma.user.create({
    data: {
      username: username as string,
      email: email as string,
      password: password as string,
    },
  });
  const session = await getSession(request.headers.get("Cookie"));
  session.set("id", user.id);
  session.set("role", user.role);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default () => {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post" className="flex flex-col">
      {actionData?.error && <p>{actionData.error}</p>}
      <h1 className="text-3xl">Register</h1>
      <input className="bg-gray-900" type="text" name="username" placeholder="Username" required />
      <input className="bg-gray-900" type="email" name="email" placeholder="Email" required />
      <input className="bg-gray-900" type="password" name="password" placeholder="Password" required />
      <button className="bg-gray-900" type="submit">
        Register
      </button>
    </Form>
  );
};
