import { UserRepository } from "@/services/repositories/UserRepository";
import { NextResponse, NextRequest } from "next/server";


export async function POST( req: NextRequest ) {
    const _userRepository = new UserRepository();
    const body = await req.json();
    const user = await _userRepository.Create(body.data);

    return NextResponse.json({ user });
}