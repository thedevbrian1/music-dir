import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import artists from "~/data/artists.json";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.artist.deleteMany({});

  await Promise.all(artists.map(async (artist) => {
    await prisma.artist.create({
      data: {
        name: artist.name,
        url: artist.external_urls.spotify,
        genres: {
          create: artist.genres.map(genre => { return { name: genre } })
        },
        images: {
          create: artist.images.map(image => { return { url: image.url } })
        }
      },
      include: {
        genres: true,
        images: true
      }
    });
  }));

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
