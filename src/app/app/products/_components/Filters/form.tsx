'use client'

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategoriesFilter } from "./Categories"
import { Prisma } from "@prisma/client"

interface ProductsFiltersProps {
    categories: Prisma.CategoryGetPayload<{}>[]
}

const ProductsFilters = () => {
    return (
        <form className="rounded-xl border bg-card w-64 p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input 
                        id="nome" 
                        placeholder="Buscar produto" 
                    />
                </div>
                <div>
                    <Label>Preço Máximo: R$ 10000</Label>
                    <Slider 
                        max={200} 
                        step={10} 
                    />
                </div>
                
                <CategoriesFilter />
                
                <Button>Aplicar Filtros</Button>
            </div>
        </form>
    )
}

export { ProductsFilters }