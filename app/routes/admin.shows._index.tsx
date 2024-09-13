import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import prisma from "utils/prisma";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const shows = await prisma.show.findMany({});
  return shows;
};

export default () => {
  const shows = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex flex-col">
        <Link to="/admin/shows/add" className="underline">
          New Show
        </Link>
      </div>
      {shows.length === 0 ? (
        <p>No shows found</p>
      ) : (
        <table className="w-full border-white *:border">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
            <tr>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.id}>
                <td>
                  <Link to={`/admin/shows/${show.id}`}>{show.name}</Link>
                </td>
                <td>{show.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
