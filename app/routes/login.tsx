import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("id")) {
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = { email: "imx@imx.com", password: "imx" };
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === user.email && password === user.password) {
    session.set("id", "1");
    session.set("name", email);
    session.set("username", email);
    session.set("email", email);
    session.set("role", "USER");
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return json({ error: "Invalid email or password" });
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
