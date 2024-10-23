import { CompanyRepository } from "@/services/repositories/CompanyRepository";
import { NextResponse, NextRequest } from "next/server";


export async function POST( req: NextRequest ) {
    const _companyRepository = new CompanyRepository();
    const body = await req.json();
    const company = await _companyRepository.Create(body.data);

    return NextResponse.json({ company });
}