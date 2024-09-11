import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";

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

export default () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
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
