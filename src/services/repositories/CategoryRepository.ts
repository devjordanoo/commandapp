import { Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

class CategoryRepository extends BaseRepository {
    companyId: number;
    constructor(companyId: number) {
        super();
        this.companyId = companyId;
        this.bindMiddlewares(companyId);
    }

    async Create(data: Prisma.CategoryCreateInput) {
        
    }
}

export { CategoryRepository }