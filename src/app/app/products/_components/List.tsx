import { Prisma } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProductModal } from "./ProductModal"
import { MoneyConverter } from "@/utils/money"

interface ProductsListViewModel {
    products: Array<Prisma.ProductGetPayload<{}>>
}

const List = ({ products }: ProductsListViewModel) => {
    return products.map((product: Prisma.ProductGetPayload<{}>) => (
        <>
            <TableRow key={product.id}>
                <TableCell className="text-ellipsis overflow-hidden max-w-[200px]">{product.name}</TableCell>
                <TableCell>
                    <Badge variant="secondary">AAAA</Badge>
                </TableCell>
                <TableCell>{MoneyConverter.convertToString(product.price)}</TableCell>
                <TableCell>
                    <ProductModal product={product}>
                        <Button variant="outline" size="sm">Editar</Button>
                    </ProductModal>
                </TableCell>
            </TableRow>
        </>
    ))
}

export { List }