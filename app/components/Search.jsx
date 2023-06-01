import { Link, useLocation } from "@remix-run/react";

export default function Search() {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';

    return (
        <div className="flex gap-1 flex-col flex-wrap text-sm col-start-2 m-0">
            <form method="get" className="flex gap-1">
                <label htmlFor="searchInput">Search artists by name or genre:</label>
                <input
                    type="text"
                    name="q"
                    id="searchInput"
                    defaultValue={q}
                    className="border"
                />

                <button type="submit">Search</button>
            </form>
            {
                q.length > 1
                    ? (
                        <div className="items-baseline bg-hsl-300-60-94-90 border-0 rounded-sm flex gap-4 py-2 px-3">
                            <span>Artists with name or genre matching "{q}"</span>
                            <Link to={location.pathname} prefetch="intent">
                                &times; clear search
                            </Link>
                        </div>
                    )
                    : null
            }
        </div>
    );
}