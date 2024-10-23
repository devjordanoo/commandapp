import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'
import { NavBar } from "./_components"
import { Card } from "@/components/ui/card"

interface Layout {
    children: React.ReactNode
    session: Session
}

export default function Layout({ children, session }: Layout) {
    return (
        <SessionProvider session={session}>
            <NavBar />
            <div className="w-full max-w-7xl mx-auto py-5 md:px-8">
                {children}
            </div>
        </SessionProvider>
    )
}