const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Obtener todos los usuarios
    const users = await prisma.user.findMany({
        include: {
            works: {
                include: {
                    authors: true
                }
            }
        }
    })

    console.log('Usuarios encontrados:', users.length)
    console.log(JSON.stringify(users[0], null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())