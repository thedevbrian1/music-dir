import { useLoaderData, useLocation, useParams } from "@remix-run/react";
import ArtistList from "../components/ArtistList";
import { getArtistsByGenre } from "../models/artist.server";
import { json } from "@remix-run/node";

export async function loader({ request, params }) {
    const genre = params.genre;

    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.trim().split(' ').join('') ?? '';

    const artists = await getArtistsByGenre(genre, query);

    return json({ artists });
}

export default function Genre() {
    const { artists } = useLoaderData();
    const location = useLocation();
    const { genre } = useParams();

    return (
        <div>
            Genre {genre}
            <ArtistList artists={artists} />
        </div>
    );
}