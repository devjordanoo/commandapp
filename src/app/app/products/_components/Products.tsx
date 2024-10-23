'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { List } from './List'
import { Prisma } from '@prisma/client'
import { NoResults } from "./NoResults"
import { PaginationWithLinks } from "@/components/customs/PaginationWithLinks"
import { useSearchParams } from 'next/navigation'
import { ENV } from "@/lib/config"
import { ProductModal } from "./ProductModal"

interface ProductProps {
    products: Prisma.ProductGetPayload<{}>[],
    count: number
}

const Products = ({ products, count }: ProductProps) => {
    const params = useSearchParams(); 
    const page = parseInt(params.get("page") || "1");
    const pageSize = parseInt(params.get("pageSize") || ENV.MAX_PAGE_SIZE.toString());

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Lista de Produtos</CardTitle>
                    <ProductModal product={null} />
                </div>
            </CardHeader>
            <CardContent>

                {
                    products.length
                        ? (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Categoria</TableHead>
                                            <TableHead>Preço</TableHead>
                                            <TableHead>Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <List products={products} />
                                    </TableBody>
                                </Table>
                                {
                                    products.length && <PaginationWithLinks 
                                        page={page}
                                        pageSize={pageSize}
                                        totalCount={count}
                                    />
                                }
                            </>
                        )
                        : <NoResults />
                }

            </CardContent>
        </Card>
    )
}

export { Products }