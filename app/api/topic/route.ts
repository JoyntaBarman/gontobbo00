import {NextRequest, NextResponse} from "next/server";
import {Session} from "next-auth";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import Topic from "@/lib/mongodb-collections/topic";

export async function GET(request: NextRequest) {
    try {

        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const topicName = searchParams.get("topic") ?? '';
        const subjectId = searchParams.get("subject") ?? "";

        // const session: Session | null = await auth();
        //
        // const isUserAllowed = checkUserRouteAccess(session, 'super_admin');
        //
        // if (!isUserAllowed) {
        //     return NextResponse.json({
        //         status: false,
        //         message: "Unauthorized"
        //     });
        // }

        let query : {name?: any, subject?: string, isDeleted?: boolean} = {
            isDeleted: false
        };

             if (topicName) {
            query.name = { $regex: topicName, $options: "i" };
        }

        if (subjectId) {
          query.subject = subjectId;
        }


          const status = await Topic.find(query)
            .populate("subject", "_id name")
            .skip(page * limit)
            .limit(limit);
    

        if (!status) {
            return NextResponse.json({
                status: false,
                message: "No topic data found"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Topic found successfully",
            data: status
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while fetching topic data"
        })
    }
}

export async function POST( request: NextRequest) {
    try {
        const body = await request.json();

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

        const topic = await Topic.create(body);

        if (!topic) {
            return NextResponse.json({
                status: false,
                message: "Failed to create topic"
            })
        }


        return NextResponse.json({
            status: true,
            message: "Created topic successfully.",
            data: topic
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while creating topic"
        })
    }
}