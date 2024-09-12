import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("id")) {
    return redirect("/login?redirect=/admin");
  } else if (session.get("role") !== "ADMIN") {
    return redirect("/");
  }
  return null;
};

export default () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl">Admin</h1>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/shows">Shows</Link>
      <Link to="/admin/genres">Genres</Link>
    </div>
  );
};
