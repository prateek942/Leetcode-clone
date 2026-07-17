import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/dbConfig";
import { updateUserById } from '@/models/userModel';


connectDB();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { favorite, index, user } = data;

    try {
        const updateObject: Record<string, any> = {};
        updateObject[`problemList.${index}.favorite`] = favorite;



        await updateUserById(user._id, updateObject);

        const response = NextResponse.json({
            message: "favorite Successfully",
            success: true,
        })

        return response

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to favorite", success: false }, { status: 500 });
    }
}


