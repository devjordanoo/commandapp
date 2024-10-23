import { Prisma } from "@prisma/client";

export class CompanyValidator {
    static validate(data: Prisma.CompanyCreateInput): boolean {
        let res = true;

        if(!data.name) {
            res = false;
        }
        
        return res;
    }
}