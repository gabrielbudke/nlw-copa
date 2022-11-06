import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: "https://github.com/gabrielbudke.png"
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: "Bolão Demo",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: "2022-11-24T16:00:00.000Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "RS"
        }
    });

    await prisma.game.create({
        data: {
            date: "2022-11-24T13:00:00.000Z",
            firstTeamCountryCode: "PT",
            secondTeamCountryCode: "GH",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });

}

main();