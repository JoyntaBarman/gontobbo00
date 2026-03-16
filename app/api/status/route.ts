import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import {checkUserRouteAccess} from "@/lib/helper";
import {Session} from "next-auth";
import ContentStatus from "@/lib/mongodb-collections/content-status";

export async function GET(request: NextRequest) {
    try {

        const {searchParams} = new URL(request.url);

        // query params
        const page = parseInt(searchParams.get("page") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "0");
        const statusName = searchParams.get("status") ?? '';

        const session: Session | null = await auth();

        const isUserAllowed = checkUserRouteAccess(session, 'super_admin');

        if (!isUserAllowed) {
            return NextResponse.json({
                status: false,
                message: "Unauthorized"
            });
        }

                 let query : {name?: any, isDeleted?: boolean} = {
            isDeleted: false
        };

             if (statusName) {
            query.name = { $regex: statusName, $options: "i" };
        }

        const status = await ContentStatus.find(query)
        .skip(page * limit)
        .limit(limit);

        if (!status) {
            return NextResponse.json({
                status: false,
                message: "No status found"
            })
        }



        return NextResponse.json({
            status: true,
            message: "Status found successfully",
            data: status
        });
    } catch (e) {
        return NextResponse.json({
            status: false,
            message: "Error occurred while fetching status"
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

       const status = await ContentStatus.create(body);

       if (!status) {
           return NextResponse.json({
               status: false,
               message: "Failed to create status"
           })
       }


       return NextResponse.json({
           status: true,
           message: "Created status successfully.",
           data: status
       });
   } catch (e) {
       return NextResponse.json({
           status: false,
           message: "Error occurred while creating status"
       })
   }
}