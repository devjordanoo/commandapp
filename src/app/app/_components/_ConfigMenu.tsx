'use client'

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getUserRoleName, Roles } from "@/utils/roles"

interface ConfigMenuProps {
  children: React.ReactNode
}

const ConfgiMenu = ({ children }: ConfigMenuProps) => {
    const { data } = useSession();
    const userIsAdmin = data?.user?.role === Roles.admin;

    const handleExitClick = async () => await signOut();

    return (
        <Sheet>
            <SheetTrigger asChild>
                { children }
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
                <SheetHeader>
                    <SheetTitle>Menu de Configuração</SheetTitle>
                    <SheetDescription>
                        Gerencie todo o conteudo do seu negocio
                    </SheetDescription>
                </SheetHeader>

                <div>
                    <Separator className="my-4"/>

                    <div>
                        <h3 className="mb-4 text-lg decoration-slate-700 font-bold w-full">Gerenciar Empresa</h3>
                        <ul className="flex flex-col gap-2 ml-4">
                            <li>Sua empresa</li>
                            {
                                userIsAdmin && (
                                    <>
                                        <li>Editar Empresa</li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                    <Separator className="my-4 w-[80%]"/>

                    <div>
                        <h3 className="mb-4 text-lg decoration-slate-700 font-bold w-full">Gerenciar Usuarios</h3>
                        <ul className="flex flex-col gap-2 ml-4">
                            <li>Seu Perfil</li>
                            {
                                userIsAdmin && (
                                    <>
                                        <li>Usuarios</li>
                                        <li>Criar Usuario</li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                    <Separator className="my-4 w-[80%]"/>

                    <div>
                        <h3 className="mb-4 text-lg decoration-slate-700 font-bold w-full">Suas Categorias</h3>
                        <ul className="flex flex-col gap-2 ml-4">
                            <li>Produtos</li>
                            <li>Clientes</li>
                            <li>Mesas</li>
                            <li>Pedidos</li>
                        </ul>
                    </div>

                    <Separator className="my-4"/>
                </div>

                <SheetFooter className="flex flex-col sm:flex-col items-center">
                    <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar do usuário" />
                        <AvatarFallback><User className="h-[50%] w-[50%]" /></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full items-center">
                        <p>{data?.user?.name}</p>
                        <p>{getUserRoleName(data?.user?.role ?? Roles.attendant)}</p>
                        <Separator className="my-4" />
                        <Button onClick={handleExitClick} variant="outline" className="mt-2 w-full">Sair</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export { ConfgiMenu }
