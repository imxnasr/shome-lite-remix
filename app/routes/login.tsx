import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = { email: "imx@imx.com", password: "imx" };

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email === user.email && password === user.password) {
    return redirect("/");
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
