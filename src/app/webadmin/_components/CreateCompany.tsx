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
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { CompanyRequester } from "@/services/Requesters/CompanyRequester"

const _companyRequester = new CompanyRequester();

export const CreateCompany = () => {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data, e) => {
        e?.preventDefault();

        try {
            const company = await _companyRequester.createCompany(data as Prisma.CompanyCreateInput) as Prisma.CompanyCreateInput;

            if(company) {
                toast({
                    title: 'Success',
                    description: `Empresa ${company.name} criada com sucesso`,
                })
            }
        } catch(error) {
            toast({
                title: 'Error',
                description: `Não foi possivel criar a empresa`,
                variant: "destructive",
            })
        }
    })

    return (
        <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Create Comapny</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
            <CardContent>
                <div className="grid w-full items-center gap-4">

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input {...form.register("name")} id="name" placeholder="Name of new company" />
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
