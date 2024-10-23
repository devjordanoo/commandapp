'use client'

import * as React from "react"
import { Prisma } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { UserRequester } from "@/services/Requesters/UserRequester"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Roles } from "@/utils/roles"

const _userRequester = new UserRequester();

export const CreateUser = () => {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data, e) => {
        e?.preventDefault();

        try {
            const userData: Prisma.UserCreateInput = {
              name: data.name as string,
              password: data.password as string,
              role: data.role,
              company: {
                connect: {
                  id: data.companyId as number
                }
              }
            }

            const user = await _userRequester.createUser(userData);

            if(user) {
              toast({
                  title: 'Success',
                  description: `Usuario ${user.name} criada com sucesso`,
              })
            }
        } catch(error) {
            toast({
                title: 'Error',
                description: `Não foi possivel criar o usuário`,
                variant: "destructive",
            })
        }
    })

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create User</CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input {...form.register("name")} id="name" placeholder="Name of new User" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">CompanyId</Label>
                            <Input {...form.register("companyId")} id="name" placeholder="CompanyId" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Password</Label>
                            <Input {...form.register("password")} id="password" placeholder="Senha" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Role</Label>
                            <Input {...form.register("role")} type="number" id="role" placeholder="Role" />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </form>

        </Card>
    )
}
