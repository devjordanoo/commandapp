import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CategoriesFilter = () => {
    return (
        <div>
            <Label>Categorias</Label>
            {["Roupas", "Calçados", "Acessórios"].map((categoria) => (
                <div key={categoria} className="flex items-center space-x-2 mt-2">
                <Checkbox 
                    id={categoria} 
                />
                <label htmlFor={categoria}>{categoria}</label>
                </div>
            ))}
        </div>
    );
}

export { CategoriesFilter }