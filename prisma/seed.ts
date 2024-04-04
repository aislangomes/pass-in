import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "9360e2e6-46a1-497a-bdc2-0dcb6a92781b",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento ai",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database Seeded!");
  prisma.$disconnect();
});
