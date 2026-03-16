import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import ContentType from "@/lib/mongodb-collections/content-type";

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

        const contentType = await ContentType.findByIdAndUpdate(id, body);

        if (!contentType) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update content type"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update content type successfully.",
            data: contentType
        });
    } catch (e : any) {
        return NextResponse.json({
            status: false,
            message: e?.message || "Error occurred while updating content type"
        },
            {
                status: 500
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

        const contentType = await ContentType.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!contentType) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete content type"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Delete content type successfully.",
            data: contentType
        });
    } catch (e : any) {
        return NextResponse.json({
            status: false,
            message: e?.message || "Error occurred while deleting content type"
        },
            {
                status: 500
            })
    }
}