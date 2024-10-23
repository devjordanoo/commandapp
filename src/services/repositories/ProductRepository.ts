import { Prisma } from "@prisma/client"
import { BaseRepository } from "./BaseRepository";
import { ProductsValidator } from "@/Validations/ProductsValidator";

interface ProductsPageAdapter {
    counProduct: number,
    products: Prisma.ProductGetPayload<{}>[],
    max: {
        id: number
        name: string
        price: number
    }
}

class ProductRepository extends BaseRepository {
    private companyId = 0;
    constructor(companyId: number) {
        super()
        this.companyId = companyId;
        this.bindMiddlewares(companyId);
    }

    async Create(data: Prisma.ProductCreateInput) {
        if(!ProductsValidator.validate(data)) {
            return null;
        }

        try {
            const adapter: Prisma.ProductCreateInput = {
                name: data.name,
                price: data.price,
                description: data.description,
                company: {
                    connect: {
                        id: this.companyId,
                    }
                }
            }
            
            const product = await this._prisma.product.create({ data: adapter, include: { company: true } });
            return product;
        } catch(e) {
            console.error(e)
        }
    }

    async Update(id: number, data: Prisma.ProductCreateInput) {
        console.log('data: ', id, data)
        if(!ProductsValidator.validate(data)) {
            return null;
        }

        try {
            const adapter: Prisma.ProductCreateInput = {
                name: data.name,
                price: data.price,
                description: data.description,
                company: {
                    connect: {
                        id: this.companyId,
                    }
                }
            }
            
            const product = await this._prisma.product.update({ where: { id }, data: adapter, include: { company: true } });
            return product;
        } catch(e) {
            console.error(e)
        }
    }

    async GetProducts(page: number = 1, pageSize: number = 10): Promise<ProductsPageAdapter> {
        const { skip, take } = this.getPaginationData(page, pageSize);
        // this.paginateData(take, skip);

        const [ products, count, max ] = await this._prisma.$transaction([
            this._prisma.product.findMany({ take, skip }),
            this._prisma.product.count(),
            this._prisma.product.aggregate({
                _max: {
                    price: true,
                    name: true,
                    id: true
                }
            })
        ]);

        const res: ProductsPageAdapter = {
            max: {
                id: max._max.id ?? 0,
                name: max._max.name ?? '',
                price: max._max.price ?? 0
            },
            counProduct: count,
            products
        }

        return res
    }
}

export { ProductRepository }