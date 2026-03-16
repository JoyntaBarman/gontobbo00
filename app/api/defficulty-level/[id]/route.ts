import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import DifficultyLevel from "@/lib/mongodb-collections/deficulty-lavel";

export async function PUT(    request: NextRequest,    { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const {id} = await params;

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

        const difficultyLevel = await DifficultyLevel.findByIdAndUpdate(id, body);

        if (!difficultyLevel) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update difficulty level"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update difficulty level successfully.",
            data: difficultyLevel
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while updating difficulty level"
        })
    }
}


export async function DELETE(    request: NextRequest,    { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

        const difficultyLevel = await DifficultyLevel.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!difficultyLevel) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete difficulty level"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Delete difficulty level successfully.",
            data: difficultyLevel
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while deleting difficulty level"
        })
    }
}