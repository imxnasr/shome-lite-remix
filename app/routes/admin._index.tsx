import { Link } from "@remix-run/react";

export default () => {
  return (
    <div className="flex flex-col">
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/shows">Shows</Link>
      <Link to="/admin/genres">Genres</Link>
    </div>
  );
};
