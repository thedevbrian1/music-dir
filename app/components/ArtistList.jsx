export default function ArtistList({ artists }) {
    if (artists.length < 1) {
        return (
            <div className="artist-list empty">
                <p>no artists match the current filters</p>
            </div>
        );
    }
    return (
        <div className="artist-list">
            {artists.map((artist) => {
                return (
                    <div className="artist" key={artist.id}>
                        <img src={artist.images[1].url} alt={artist.name} />
                        <div className="details">
                            <h2>{artist.name}</h2>
                            <p>
                                <a href={artist.url}>view on Spotify</a>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}