"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Bolt, Moon, Sun, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { signOut, useSession } from "next-auth/react"
import { getUserRoleName, Roles } from "@/utils/roles"
import { Separator } from "@/components/ui/separator";

const NavBar = () => {
    const { data } = useSession()
    const { theme, setTheme } = useTheme()

    const handleExitClick = async () => await signOut();

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            Logo
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/pedidos" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Pedidos
                                </Link>
                                <Link href="/clientes" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Mesas
                                </Link>
                                <Link href="/clientes" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Clientes
                                </Link>
                                <Link href="/app/products" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Produtos
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Alternar Tema"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <Bolt className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <span className="sr-only">Configurações</span>
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar do usuário" />
                                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex flex-col space-y-2">
                                    <h3 className="font-medium text-lg">Dados do Usuário</h3>
                                    <p><strong>Nome:</strong> {data?.user?.name}</p>
                                    {
                                        data?.user?.email && (
                                            <p><strong>Email:</strong> joao.silva@exemplo.com</p>
                                        )
                                    }

                                    <p><strong>Cargo:</strong> {getUserRoleName(data?.user?.role ?? Roles.attendant)}</p>
                                    <Button variant="outline" className="mt-2">Editar Usuario</Button>
                                    <Separator className="my-4" />
                                    <h3 className="font-medium text-lg">Dados da Empresa</h3>
                                    <p><strong>Nome da empresa:</strong> {data?.user?.company?.name}</p>
                                    <Separator className="my-4" />
                                    <Button onClick={handleExitClick} variant="outline" className="mt-2">Sair</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export { NavBar }