import { Prisma } from "@prisma/client";

export class UserValidator {
    static validate(data: Prisma.UserCreateInput): boolean {
        let res = true;

        if(!data.name) {
            res = false;
        }

        if(!data.password) {
            res = false;
        }

        if(!data.company) {
            res = false;
        }
        
        return res;
    }
}