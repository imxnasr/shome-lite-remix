import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl">Shows Add</h1>
      <Form method="post" className="flex flex-col">
        <input className="bg-gray-900" type="text" name="name" placeholder="Name" />
        {/* <input className="bg-gray-900" type="text" name="type" placeholder="Type" />
        <input className="bg-gray-900" type="text" name="name" placeholder="Genres" /> */}
        <textarea className="bg-gray-900" name="description" placeholder="Description" />
        <input className="bg-gray-900" type="text" name="rating" placeholder="Rating" />
        <input className="bg-gray-900" type="text" name="trailerLink" placeholder="Trailer Link" />
        <div className="flex items-center-justify-between">
          <label htmlFor="featured">Featured</label>
          <input className="bg-gray-900" type="checkbox" name="featured" id="featured" />
        </div>
        <button type="submit">Add</button>
      </Form>
    </div>
  );
};
