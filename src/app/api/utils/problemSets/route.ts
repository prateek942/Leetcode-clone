import connectDB from '@/database/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import {getProblems} from '@/models/problemModel'

connectDB();

export const GET = async (req: NextRequest) =>{
    try {
        const data =  await getProblems();
        return NextResponse.json({data});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}