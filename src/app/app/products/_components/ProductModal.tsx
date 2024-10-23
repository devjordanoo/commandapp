'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ProductRequester } from "@/services/Requesters/ProductRequester"
import { Prisma } from "@prisma/client"
import { CirclePlus } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { useState } from "react"
import { InputErrorLabel } from "@/components/ui/input-error-label"
import { MoneyInput } from "@/components/customs/MoneyInput"
import { MoneyConverter } from "@/utils/money"

interface ProductProps {
    product?: Prisma.ProductGetPayload<{}> | null;
    children?: React.ReactNode;
}

const _productRequester = new ProductRequester();

const ProductModal = ({ product, children }: ProductProps) => {
    const form = useForm();
    const [price, setPrice] = useState<string>('R$ 0,00');

    const setErrors = (data: FieldValues) => {
        let hasError = false;
        if(!data.name) {
            form.setError("name", {
                type: "manual",
                message: "Por favor, insira um nome.",
            });
            hasError = true;
        }
        
        if(!data.price) {
            form.setError("price", {
                type: "manual",
                message: "Por favor, insira um valor.",
            });
            hasError = true;
        }

        return hasError;
    }

    const handleSubmit = form.handleSubmit(async (data, e) => {
        e?.preventDefault();
        const hasError = setErrors(data);
        if(hasError) {
            return;
        }
        
        try {
            let req = null;
            data.price = MoneyConverter.convertToDecimal(data.price);

            if(product) {
                req = await _productRequester.updateProduct(data as Prisma.ProductCreateInput);
            } else {
                req = await _productRequester.createProduct(data as Prisma.ProductCreateInput);
            }

            if(req.hasError) {
                toast({
                    title: 'Error',
                    description: req.message,
                    variant: "destructive",
                })
                return;
            }

            toast({
                title: 'Success',
                description: req.message,
            });

            setPrice('R$ 0,00')
            form.reset();
        } catch(error) {
            toast({
                title: 'Error',
                description: `Não foi possivel criar a empresa`,
                variant: "destructive",
            });
        }
    });
    //     priceRef(node);
    //     form.register('price').ref(node);
    //   }, [priceRef, form.register('price')]);

    return (
        <Dialog onOpenChange={() => form.reset()} >             
            <DialogTrigger asChild>
                {
                    children ?? (
                        <Button className="w-min">
                            <span className='mr-3'>Criar Produto</span>
                            <CirclePlus />
                        </Button>
                    )
                }
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Adicionar Novo Produto</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes do novo produto aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    {
                        product && (
                            <Input 
                                {...form.register('productId')} 
                                id="productId" 
                                name="productId"
                                type="hidden"
                                value={product?.id}
                            />
                        )
                    }

                    <div className="grid gap-4 py-4">
                        <div className="">
                            <Label htmlFor="name">Nome do produto</Label>
                            <Input 
                                {...form.register('name')} 
                                id="name" 
                                name="name" 
                                className="col-span-3" 
                                hasError={!!form.formState.errors?.name}
                                defaultValue={product?.name}
                            />
                            <InputErrorLabel hasError={!!form.formState.errors?.name} message={form.formState.errors.name?.message?.toString()} />
                        </div>

                        <div className="">
                            <Label htmlFor="price">Preço</Label>
                            <MoneyInput
                                {...form.register('price')} 
                                id="price" 
                                name="price" 
                                className="col-span-3" 
                                hasError={!!form.formState.errors?.price}
                                overrideOnChange={(value) => setPrice(value)}
                                value={price}
                            />
                            {/* <Input 
                                {...form.register('price')} 
                                ref={handlePriceRef} 
                                id="price" 
                                name="price" 
                                type="text" 
                                className="col-span-3" 
                                hasError={!!form.formState.errors?.price}
                                defaultValue={product?.price}
                            /> */}
                            <InputErrorLabel hasError={!!form.formState.errors?.price} message={form.formState.errors.price?.message?.toString()} />
                        </div>

                        <div className="">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea 
                                {...form.register('description')} 
                                id="description" 
                                name="description"
                                defaultValue={product?.description} 
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Salvar produto</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export { ProductModal }
