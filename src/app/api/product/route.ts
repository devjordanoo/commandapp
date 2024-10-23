import { COOKIES_NAME } from "@/lib/config";
import { ProductRepository } from "@/services/repositories/ProductRepository";
import { NextResponse, NextRequest } from "next/server";
import { decode } from 'next-auth/jwt';
import { HTTPS } from "@/utils/https";

export async function POST( req: NextRequest, res: NextResponse ) {
    const token = req.cookies.get(COOKIES_NAME.SESSION_TOKEN);
    const body = await req.json();

    if(token) {
        const decoded = await decode({
            token: token.value ?? '',
            secret: process.env.NEXTAUTH_SECRET ?? '',
            salt: 'authjs.session-token'
        });

        const _productRepository = new ProductRepository(decoded?.company?.id as number);
        const product = await _productRepository.Create(body.data);
        if(!product) {
            return NextResponse.json({ message: 'Não foi possivel criar o produto' }, { status: HTTPS.BAD_REQUEST });
        }

        return NextResponse.json({ product }, { status: HTTPS.OK });
    }

    return NextResponse.json({ error: 'invalid token' }, { status: HTTPS.UNAUTHORIZED });
}

export async function PUT(req: NextRequest) {
    const token = req.cookies.get(COOKIES_NAME.SESSION_TOKEN);
    const body = await req.json();

    if(token) {
        const decoded = await decode({
            token: token.value ?? '',
            secret: process.env.NEXTAUTH_SECRET ?? '',
            salt: 'authjs.session-token'
        });

        const _productRepository = new ProductRepository(decoded?.company?.id as number);
        const product = await _productRepository.Update(Number(body.data.productId), body.data);
        if(!product) {
            return NextResponse.json({ message: 'Não foi possivel criar o produto' }, { status: HTTPS.BAD_REQUEST });
        }

        return NextResponse.json({ product }, { status: HTTPS.OK });
    }

    return NextResponse.json({ error: 'invalid token' }, { status: HTTPS.UNAUTHORIZED });
}