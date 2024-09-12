import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import { getSession, destroySession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) {
    return redirect("/login");
  }
  return session.data;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const formType = formData.get("formType");
  if (formType === "logout") {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return null;
};

export default () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Form method="post">
        <input type="hidden" name="formType" value="logout" />
        <button type="submit">Logout</button>
        {data.role === "ADMIN" && <Link to="/admin">Admin</Link>}
      </Form>
      <hr />
      <hr />
      <hr />
      <p>id: {data.id}</p>
      <p>Username: {data.username}</p>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Role: {data.role}</p>
    </div>
  );
};
