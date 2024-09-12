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
  const url = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectUrl = url.searchParams.get("redirect");

  // Return error if fields are empty
  if (!email || !password) {
    return json({ error: "All fields are required" });
  }

  // Check if email is already exists
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });
  if (!checkEmail) {
    return json({ error: "Email is not exists" });
  }

  // Check if password is correct
  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
      password: password as string,
    },
  });
  if (!user) {
    return json({ error: "Password is not correct" });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("id", user.id);
  session.set("role", user.role);
  if (redirectUrl) {
    return redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default () => {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post" className="flex flex-col">
      {actionData?.error && <p>{actionData.error}</p>}
      <h1 className="text-3xl">Login</h1>
      <input className="bg-gray-900" type="email" name="email" placeholder="Email" />
      <input className="bg-gray-900" type="password" name="password" placeholder="Password" />
      <button className="bg-gray-900" type="submit">
        Login
      </button>
    </Form>
  );
};
