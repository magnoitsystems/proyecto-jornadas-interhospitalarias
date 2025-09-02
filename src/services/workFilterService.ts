import { prisma } from "@/libs/prisma";
import { Work } from "@/types";
import { Gender, JobType } from "@/types/user";
import type { Prisma } from "@prisma/client";

export class GetWorkForFilter {

  // Defino un tipo para el payload que incluye author y user
  private mapWorkToInterface(work: Prisma.worksGetPayload<{
    include: { author: true; user: true }
  }>): Work {
    return {
      id: work.id_work,
      category: work.category,
      description: work.description,
      userId: work.user_id,
      workCode: work.work_code,
      title: work.title,
      file: work.file,
      additional_text: work.additional_text,
      prize: work.prize ?? false,
      authors: work.author.map(author => ({
        id: author.id_author,
        name: author.name,
        lastname: "",
        affiliation: author.affiliation,
        workId: author.id_work,
      })),
      user: {
        id_user: work.user.idUser,
        name: work.user.name,
        lastname: work.user.lastname,
        email: work.user.email,
        job: work.user.job as JobType,
        specialty: work.user.specialty,
        admin: work.user.admin ?? false,
        age: work.user.age ?? 0,
        gender: work.user.gender as Gender
      }
    };
  }

  async getWorkWithPrize(): Promise<Work[]> {
    const result = await prisma.works.findMany({
      where: {
        prize: true
      },
      include: {
        author: true,
        user: true
      }
    });

    // Prisma ya infiere el tipo de `result` así que lo pasamos directo:
    return result.map(work => this.mapWorkToInterface(work));
  }

  async getWorkWithoutPrize(): Promise<Work[]> {
    const result = await prisma.works.findMany({
      where: {
        prize: false
      },
      include: {
        author: true,
        user: true
      }
    });

    return result.map(work => this.mapWorkToInterface(work));
  }

  async getWorks(): Promise<Work[]> {
    const result = await prisma.works.findMany({
      include: {
        author: true,
        user: true,
      }
    });

    return result.map(work => this.mapWorkToInterface(work));
  }

  async getAllStatistics(): Promise<{ withPrize: Work[], withoutPrize: Work[], allWorks: Work[] }> {
    const [withPrize, withoutPrize, allWorks] = await Promise.all([
      this.getWorkWithPrize(),
      this.getWorkWithoutPrize(),
      this.getWorks()
    ]);

    return { withPrize, withoutPrize, allWorks };
  }
}
