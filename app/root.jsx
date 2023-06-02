import { cssBundleHref } from "@remix-run/css-bundle";

import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import appStyles from "~/styles/style.css"
import Search from "./components/Search";
import GenrePicker from "./components/GenrePicker";
import { getGenres } from "./models/genre.server";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: appStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }) {
  const user = await getUser(request);
  const genres = await getGenres();
  return json({ user, genres });
};

export default function App() {
  const genre = undefined;

  const title = genre ? `Genre: ${genre}` : 'Music Picker';
  const { genres } = useLoaderData();
  // console.log({ genres });

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <header>
          <Link to='/'>
            <span className="logo" role="img" aria-label="music notes">
              🎶
            </span>
          </Link>
          <div className="masthead">
            <h1>{title}</h1>
            <p>
              Take a look through this list and you might just find your new
              favorite artist.
            </p>
          </div>
        </header>

        <main>
          <Search />
          {/* TODO: Search as you type with JS on */}
          <GenrePicker genres={genres} />
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
