import { Prisma } from "@prisma/client";

export class ProductsValidator {
    static validate(data: Prisma.ProductCreateInput): boolean {
        let res = true;

        if(!data.name) {
            res = false;
        }

        if(!data.price) {
            res = false;
        }
        
        return res;
    }
}