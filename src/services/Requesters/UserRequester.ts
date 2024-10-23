import { Prisma } from "@prisma/client";
import { BaseRequester } from "./BaseRequester";

class UserRequester extends BaseRequester {
    private _route = '/user';

    async createUser(data: Prisma.UserCreateInput) {
        const user =  await this._instace.post<Prisma.UserCreateInput | null>(this._route, {
            data
        });

        return user.data;
    }
}

export { UserRequester }