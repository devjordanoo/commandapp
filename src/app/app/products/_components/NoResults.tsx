import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

const NoResults = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] h-full bg-gray-100 px-4">
            <div className="text-center">
                <SearchX className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-2 text-lg font-medium text-gray-900">Nenhum resultado encontrado</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Não encontramos nenhum item correspondente à sua pesquisa.
                </p>
                <div className="mt-6">
                    <Button>Tentar nova busca</Button>
                </div>
            </div>
        </div>
    )
}

export { NoResults }