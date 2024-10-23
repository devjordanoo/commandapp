import { Prisma } from "@prisma/client"
import { BaseRepository } from "./BaseRepository";
import { CompanyValidator } from "@/Validations/CompanyValidator";

class CompanyRepository extends BaseRepository {
    constructor() {
        super()
    }

    async Create(data: Prisma.CompanyCreateInput): Promise<Prisma.CompanyCreateInput | null> {
        if(!CompanyValidator.validate(data)) {
            return null;
        }
        
        const company = await this._prisma.company.create({ data });
        return company;
    }

    async GetCompanies() {
        const companies = await this._prisma.company.findMany();
        return companies
    }

    async GetCompanyById(idValue: number): Promise<Prisma.CompanyGetPayload<{}> | null> {
        const companies = await this._prisma.company.findUnique({ where: {
            id: Number(idValue)
         }});
        return companies
    }
}

export { CompanyRepository }