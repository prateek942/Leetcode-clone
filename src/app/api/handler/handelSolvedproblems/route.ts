import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/dbConfig";
import { getUserById, updateUserById } from '@/models/userModel';

connectDB();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { solved, index, user, code } = data;

    try {
        const updateObject: Record<string, any> = {};

        // Update solved status
        updateObject[`problemList.${index}.solved`] = solved;
        await updateUserById(user._id, updateObject);

        // Store the solved code if provided
        if (code) {
            const codeUpdate: Record<string, any> = {};
            codeUpdate[`problemList.${index}.solvedAnswer`] = code;
            await updateUserById(user._id, codeUpdate);
        }

        // Recalculate total solved count
        const updatedUser = await getUserById(user._id);
        const solvedProblems = updatedUser.problemList.filter((problem: any) => problem.solved === true);
        await updateUserById(user._id, { totalSolved: solvedProblems.length });

        const response = NextResponse.json({
            message: "Solved status updated successfully",
            success: true,
        });

        return response;

    } catch (error) {
        console.error("Error updating solved status:", error);
        return NextResponse.json({
            message: "Failed to update solved status",
            success: false,
        }, { status: 500 });
    }
}
