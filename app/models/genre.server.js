import { prisma } from "~/db.server";

export async function getGenres() {
    return prisma.genre.findMany({
        select: {
            id: true,
            name: true
        },
        distinct: ['name'],
        // take: 1
    });
}
