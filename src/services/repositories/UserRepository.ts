import { PrismaClient, Prisma } from "@prisma/client"
import { BaseRepository } from "./BaseRepository";
import { PasswordHelper } from "@/lib/password";
import { UserValidator } from "@/Validations/UserValidations";
import { CompanyRepository } from "./CompanyRepository";
import { decode } from 'next-auth/jwt';
import { ENV } from "@/lib/config";


export class UserRepository extends BaseRepository {
    private _companyRepository = new CompanyRepository();

    constructor() {
        super()
    }

    async Create(data: Prisma.UserCreateInput) {
        if(!UserValidator.validate(data)) {
            return 'invalid data';
        }

        const checkIfUserExists = await this._prisma.user.findFirst({
            where: {
                name: data.name
            }
        });
        
        if(!checkIfUserExists) {
            const company = await this._companyRepository.GetCompanyById(data.company.connect?.id ?? 0);
            const companyId = company?.id;

            if(company && companyId) {
                data.password = await PasswordHelper.hashPassword(data.password);
                data.company = {
                    connect: {
                        id: Number(companyId)
                    }
                }
                data.role = Number(data.role);
    
                const user = await this._prisma.user.create({ data });
                
                return user;
            }
    
            return 'user not found';
        }
        
        return 'User already exists';
    }

    async getUserByUsernameAndPassword(username: string, password: string) {
        const user = await this._prisma.user.findFirst({
            where: {
                name: username
            },
            include: {
                company: true
            }
        });

        if(user) {
            const passwordIsCorrect = await PasswordHelper.verifyPassword(password, user.password);

            if(passwordIsCorrect) {
                return user;
            }

            return null;
        }

        return null;
    }

    async decodeToken(token: string) {
        return await decode({
            token: token,
            secret: ENV.NEXTAUTH_SECRET,
            salt: 'authjs.session-token'
        });
    }
}