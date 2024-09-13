import { Link, Outlet } from "@remix-run/react";

export default () => {
  return (
    <div className="flex">
      <h1 className="text-3xl">Shows</h1>
      <Outlet />
    </div>
  );
};
