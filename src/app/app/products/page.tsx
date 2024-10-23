import { Filters } from './_components/Filters'
import { Products } from './_components/Products'
import { Infos } from './_components/Infos'
import { ProductRepository } from "@/services/repositories/ProductRepository"
import { cookies } from "next/dist/client/components/headers";
import { COOKIES_NAME, ENV } from "@/lib/config"
import { UserRepository } from "@/services/repositories/UserRepository"

const _userRepository = new UserRepository();
const MAX_PAGE_SIZE = ENV.MAX_PAGE_SIZE;

interface SearchParamsProps {
  page: number
  searchParams?: {
    page: number
  }
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const cooks = cookies();
  const token = cooks.get(COOKIES_NAME.SESSION_TOKEN)?.value;
  const user = await _userRepository.decodeToken(token ?? '');
  const _productRepository = new ProductRepository(user?.company?.id as number);
  
  const data = await _productRepository.GetProducts(searchParams?.page ?? 1, MAX_PAGE_SIZE);

  return (
    <div className="flex h-[calc(100%-64px)] bg-gray-100">
        <Filters />
        <main className="flex-1 px-6">
            <Infos totalProducts={data.counProduct} max={data.max} />

            <Products products={data.products} count={data.counProduct} />
        </main>
    </div>
  )
}