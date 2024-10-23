'use client'

import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
    const session = useSession()
    const handleClick = async () => await signOut()

    return (
        <div>
            <h1>Dashboard</h1>
            <Separator />
            <h1>AAAAAAAAA</h1>
            <p>{session.data?.user?.name}</p>
            <p>{session.data?.user?.role}</p>
            <button onClick={handleClick}>Sair</button>
        </div>
    )
}