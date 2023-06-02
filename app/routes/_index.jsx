import { useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

import ArtistList from "../components/ArtistList";
import { getArtists } from "../models/artist.server";
import { json } from "@remix-run/node";

export const meta = () => [{ title: "Dope music" }];

export async function loader({ request }) {

  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim().split(' ').join('') || '';

  const artists = await getArtists(query);

  return json({ artists });
}

export default function Index() {
  const user = useOptionalUser();
  const { artists } = useLoaderData();

  // console.log({ artists });

  return (
    <div>
      <ArtistList artists={artists} />
    </div>
  );
}
