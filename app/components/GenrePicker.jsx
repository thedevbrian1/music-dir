import { Link, useLocation, useParams } from '@remix-run/react';
import { useState } from 'react';

export default function GenrePicker({ genres }) {
    const location = useLocation();

    const [expanded, setExpanded] = useState(false);

    const { genre } = useParams();
    const selectedGenre = genre;

    const visibleGenres =
        genres.length > 10 && !expanded ? genres.slice(0, 10) : genres;

    let expanderButton = null;

    if (genres.length > 10) {
        expanderButton = expanded ? (
            <button onClick={() => setExpanded(false)} className="control">
                show fewer genres
            </button>
        ) : (
            <button onClick={() => setExpanded(true)} className="control">
                show all genres
            </button>
        );
    }

    return (
        <nav className="genre-filters">
            {selectedGenre ? (
                <Link to={`/${location.search}`} className="control" prefetch="intent">
                    &times; clear filters
                </Link>
            ) : null}

            {/* TODO: Use Navlink instead */}
            {visibleGenres.map((genre) => {
                return (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.name}${location.search}`}
                        className={
                            genre.name === selectedGenre
                                ? 'genre-filter selected'
                                : 'genre-filter'
                        }
                        prefetch="intent"
                        preventScrollReset
                    >
                        <span className="genre-label" title={genre.name}>
                            {genre.name}
                        </span>{' '}
                        (1)
                    </Link>
                );
            })}

            {expanderButton}
        </nav>
    );
};