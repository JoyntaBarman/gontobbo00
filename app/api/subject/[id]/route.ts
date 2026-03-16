import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import Subject from "@/lib/mongodb-collections/subject";

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

        const status = await Subject.findByIdAndUpdate(id, body);

        if (!status) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update subject"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update subject successfully.",
            data: status
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while updating subject"
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

        const subject = await Subject.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!subject) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete subject"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Delete subject successfully.",
            data: subject
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while deleting subject"
        })
    }
}