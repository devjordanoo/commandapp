import { Prisma } from "@prisma/client";
import { BaseRequester } from "./BaseRequester";
import { IRequest } from "../interfaces/Request";
import { AxiosResponse } from "axios";

class ProductRequester extends BaseRequester {
    private _route = '/product';

    async createProduct(data: Prisma.ProductCreateInput): Promise<IRequest<Prisma.ProductGetPayload<{}>>> {
        const req =  await this._instace.post<Prisma.ProductGetPayload<{}> | null>(this._route, {
            data
        });

        const adapter = this.getAdapter<Prisma.ProductGetPayload<{}>>(req);

        return adapter;
    }

    async updateProduct(data: Prisma.ProductCreateInput): Promise<IRequest<Prisma.ProductGetPayload<{}>>> {
        const req = await this._instace.put<Prisma.ProductGetPayload<{}> | null>(this._route, {
            data
        });

        const adapter = this.getAdapter<Prisma.ProductGetPayload<{}>>(req);

        return adapter;
    }

    private getAdapter<T>(req: AxiosResponse): IRequest<T> {
        let data = {
            data: null,
            status: 400,
            message: '',
            hasError: false
        };

        if(req.status === 200 || req.status === 201) {
            data = {
                data: req.data,
                status: req.status,
                message: 'Produto criado com sucesso',
                hasError: false
            };

            return data;
        }

        if(req.status >= 400) {
            data = {
                data: null,
                status: req.status,
                message: req.data.message,
                hasError: true
            };

            return data
        }

        return data;
    }
}

export { ProductRequester }