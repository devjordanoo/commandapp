'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldValues, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons"

export function AuthForm() {
  const form = useForm()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  
  const setFormErrors = (data: FieldValues) => {
    let hasError = false;
    if(!data.username) {
      form.setError("username", {
        type: "manual",
        message: "Por favor, insira um usuário.",
      });

      hasError = true;
    }

    if(!data.password) {
      form.setError("password", {
        type: "manual",
        message: "Por favor, insira uma senha.",
      });

      hasError = true;
    }

    return hasError;
  }

  const setToast = (error: boolean) => {
    if(error) {
      toast({
        title: 'Erro',
        description: 'Usuario não encontrado',
        variant: "destructive",
      })

      return
    }
    
    toast({
      title: 'Sucesso',
      description: 'Usuario logado com sucesso',
    })
  }

  const handleSubmit = form.handleSubmit( async (data) => {
    const invalid = setFormErrors(data);
    if(invalid) {
      return;
    }

    setLoading(v => !v);
    try {
      const u = await signIn('credentials', { ...data, redirect: false } );

      setToast(u?.error ? true : false);
      router.push('/app');
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Erro',
        description: 'Usuario não encontrado',
      })
    }
    setLoading(v => !v);
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">CommandApp</CardTitle>
          <CardDescription>Digite seu nome de usuário e senha para fazer login.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input className={form.formState.errors.username ? "border-destructive" : ""} {...form.register("username")} id="username" name="username" placeholder="Enter your username" />
              {form.formState.errors.username && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    {form.formState.errors.username.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input className={form.formState.errors.password ? "border-destructive" : ""} {...form.register("password")}  id="password" name="password" type="password" placeholder="Enter your password" />
              {form.formState.errors.password && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>
                    {form.formState.errors.password.message?.toString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {
                loading
                  ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  : "Entrar"
              }
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}