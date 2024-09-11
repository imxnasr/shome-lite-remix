import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import "./tailwind.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="container bg-black text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <h1 className="text-3xl">404 | Not Found</h1>
    </div>
  );
};

export default function App() {
  return <Outlet />;
}
