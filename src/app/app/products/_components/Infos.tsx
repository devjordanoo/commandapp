import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductProps {
    totalProducts: number
    max: {
        id: number
        name: string
        price: number
    }
}

const Infos = ({ totalProducts }: ProductProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{totalProducts}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mais Vendido</CardTitle>
                    <p className="text-2xl font-bold">Teste</p>
                    <p className="text-lg font-bold">R$ 100000</p>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Menos Vendido</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">10000</p>
                </CardContent>
            </Card>
        </div>
    )
}

export { Infos }