import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import Topic from "@/lib/mongodb-collections/topic";

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

        const topic = await Topic.findByIdAndUpdate(id, body);

        if (!topic) {
            return NextResponse.json({
                status: false,
                message: "Failed to Update topic"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Update topic successfully.",
            data: topic
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while updating topic"
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

        const topic = await Topic.findByIdAndUpdate(id, {$set: {isDeleted: true}});

        if (!topic) {
            return NextResponse.json({
                status: false,
                message: "Failed to delete topic"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Topic subject successfully.",
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while deleting topic"
        })
    }
}