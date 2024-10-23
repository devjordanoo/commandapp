import { DefaultSession, DefaultUser } from "next-auth";

import { Roles } from "@/utils/roles";
import { Prisma } from "@prisma/client";

interface IUser extends DefaultUser {
    role?: Roles;
    company?: Prisma.CompanyGetPayload<{}>;
}

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {}
}
  