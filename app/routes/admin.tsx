import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  console.log(url.pathname);
  if (!session.has("id")) {
    return redirect(`/login?redirect=${url.pathname}`);
  } else if (session.get("role") !== "ADMIN") {
    return redirect("/");
  }
  return null;
};

export default () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl">Admin</h1>
      <Outlet />
    </div>
  );
};
