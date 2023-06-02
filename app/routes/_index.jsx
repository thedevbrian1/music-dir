import { Link, useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import artists from "~/data/artists.json";
import Search from "../components/Search";
import GenrePicker from "../components/GenrePicker";
import ArtistList from "../components/ArtistList";
import { getArtists, getArtistsByGenre, searchArtists } from "../models/artist.server";
import { json } from "@remix-run/node";

export const meta = () => [{ title: "Dope music" }];

export async function loader({ request }) {

  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';
  const artists = await getArtists(query);

  // const searchResults = await searchArtists(query);

  // console.log({ searchResults });

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
