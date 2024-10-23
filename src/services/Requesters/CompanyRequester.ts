import { Prisma } from "@prisma/client";
import { BaseRequester } from "./BaseRequester";

class CompanyRequester extends BaseRequester {
    private _route = '/company';

    async createCompany(data: Prisma.CompanyCreateInput) {
        const company =  await this._instace.post<Prisma.CompanyDefaultArgs | null>(this._route, {
            data
        });

        return company.data;
    }
}

export { CompanyRequester }