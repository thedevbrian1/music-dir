import { Link, useLoaderData } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import artists from "~/data/artists.json";
import Search from "../components/Search";
import GenrePicker from "../components/GenrePicker";
import ArtistList from "../components/ArtistList";
import { getArtists } from "../models/artist.server";
import { json } from "@remix-run/node";

export const meta = () => [{ title: "Dope music" }];

export async function loader() {
  const artists = await getArtists();
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
