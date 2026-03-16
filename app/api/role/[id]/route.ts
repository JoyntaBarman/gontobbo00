import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import Role from "@/lib/mongodb-collections/role";

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

        const role = await Role.findByIdAndUpdate(id, body);

        if (!role) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update role"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update role successfully.",
            data: role
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while updating role"
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

        const role = await Role.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!role) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete role"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Delete role successfully.",
            data: role
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while deleting role"
        })
    }
}