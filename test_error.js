import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: 1 },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    console.log(reviews)
  } catch (e) {
    console.error("PRISMA ERROR:", e)
  }
}
main()
