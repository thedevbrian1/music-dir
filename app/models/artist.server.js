import { prisma } from "~/db.server";

export async function getArtists() {
    return prisma.artist.findMany({
        include: {
            genres: true,
            images: true
        }
    });
}

export async function getArtistsByGenre(genre) {
    return prisma.artist.findMany({
        where: {
            genres: {
                some: {
                    name: genre
                }
            }
        },
        include: {
            images: true
        }
    });
}