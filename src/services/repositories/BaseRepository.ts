import { Prisma, PrismaClient } from "@prisma/client"
 
export class BaseRepository {
    _prisma = new PrismaClient();

    bindMiddlewares(companyId: number) {
        this.setAutoInsertCreatedAtAndUpdatedAt();
        this.checkIfDataIsActive(companyId);
    }
    
    private setAutoInsertCreatedAtAndUpdatedAt() {
        this._prisma.$use(async (params, next) => {
            if (params.action === 'create') {
                params.args.data = {
                    ...params.args.data,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            } else if (params.action === 'update') {
                params.args.data = {
                    ...params.args.data,
                    updatedAt: new Date()
                };
            }

            return next(params);
        });
    }

    private checkIfDataIsActive(companyId: number) {
        this._prisma.$use(async (params, next) => {
            const FUNCTIONS_TO_CHECK = [
                'findUnique',
                'findUniqueOrThrow',
                'findMany',
                'findFirst',
                'findFirstOrThrow',
                'count',
                'groupBy'
            ];

            if(params.args?.where) {
                if(FUNCTIONS_TO_CHECK.includes(params.action) && params.model !== 'Session') {
                    params.args.where = {
                        ...params.args.where,
                        active: true,
                        companyId: companyId
                    };
                }
            }

            return next(params);
        });
    }

    paginateData(take: number, skip: number) {
        this._prisma.$use(async (params, next) => {
            if (params.action === 'findMany') {
                params.args = {
                    ...params.args,
                    take,
                    skip
                };
            }
            return next(params);
        });
    }
    
    getPaginationData(page: number, pageSize: number) {
        return {
            take: pageSize,
            skip: (page - 1) * pageSize
        }
    }
}