import { LinksFunction } from "@vercel/remix";
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import legacyStylesUrl from "~/app/legacy-styles.css";
import tailwindStylesUrl from "~/app/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: legacyStylesUrl },
  { rel: "stylesheet", href: tailwindStylesUrl },
];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Links />
        <title>Book Sale Pricer</title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
