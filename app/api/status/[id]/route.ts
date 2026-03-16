import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import ContentStatus from "@/lib/mongodb-collections/content-status";

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

        const status = await ContentStatus.findByIdAndUpdate(id, body);

        if (!status) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update status"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update status successfully.",
            data: status
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while updating status"
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

        const status = await ContentStatus.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!status) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete status"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Delete status successfully.",
            data: status
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while deleting status"
        })
    }
}