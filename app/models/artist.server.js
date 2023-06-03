import { prisma } from "~/db.server";

export async function getArtists(query) {
    return prisma.artist.findMany({
        where: {
            name: {
                contains: query
            }
        },
        include: {
            genres: true,
            images: true
        }
    });
}

export async function getArtistsByGenre(genre, query) {
    return prisma.artist.findMany({
        // where: {
        //     genres: {
        //         some: {
        //             name: genre
        //         }
        //     }
        // },
        where: {
            AND: [
                {
                    genres: {
                        some: {
                            name: genre
                        }
                    }
                },
                {
                    OR: [
                        {
                            genres: {
                                some: {
                                    name: { contains: query }
                                }
                            }
                        },
                        {
                            name: { contains: query }
                        }
                    ]
                }
            ]
        },
        include: {
            images: true
        }
    });
}

export async function getArtistsCount(genre) {
    return prisma.artist.count({
        where: {
            genres: {
                some: {
                    name: genre
                }
            }
        }
    });
}